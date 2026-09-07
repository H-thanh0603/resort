"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Tiếng sóng biển thật — tổng hợp bằng WebAudio (brown noise
 * qua lowpass + LFO vỗ sóng), không cần file audio.
 * Bật/tắt mượt bằng gain ramp. Nút tròn góc phải.
 */
export default function AmbientSound() {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    return () => {
      ctxRef.current?.close().catch(() => {});
      ctxRef.current = null;
    };
  }, []);

  async function toggle() {
    if (!ctxRef.current) {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctx();
      // Brown noise — trầm, ấm như sóng xa
      const len = ctx.sampleRate * 4;
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const data = buf.getChannelData(0);
      let last = 0;
      for (let i = 0; i < len; i++) {
        const white = Math.random() * 2 - 1;
        last = (last + 0.02 * white) / 1.02;
        data[i] = last * 3.2;
      }
      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.loop = true;
      const low = ctx.createBiquadFilter();
      low.type = "lowpass";
      low.frequency.value = 420;
      const wave = ctx.createGain();
      wave.gain.value = 0;
      // LFO vỗ sóng ~ mỗi 12 giây
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.08;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.09;
      lfo.connect(lfoGain).connect(wave.gain);
      const master = ctx.createGain();
      master.gain.value = 0.9;
      src.connect(low).connect(wave).connect(master).connect(ctx.destination);
      src.start();
      lfo.start();
      ctxRef.current = ctx;
      gainRef.current = wave;
      // Base level sóng
      wave.gain.setValueAtTime(0.14, ctx.currentTime);
    } else {
      await ctxRef.current.resume();
    }
    const ctx = ctxRef.current!;
    const wave = gainRef.current!;
    if (!on) {
      wave.gain.cancelScheduledValues(ctx.currentTime);
      wave.gain.setTargetAtTime(0.14, ctx.currentTime, 1.2);
    } else {
      wave.gain.cancelScheduledValues(ctx.currentTime);
      wave.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.6);
    }
    setOn(!on);
  }

  return (
    <button
      onClick={toggle}
     
      aria-label="Tiếng sóng biển"
      className="fixed bottom-6 right-6 z-10 flex items-center gap-3 bg-night/70 py-3 pl-4 pr-5 text-alabaster backdrop-blur-xl transition hover:bg-night/90"
    >
      <span className="flex h-4 items-end gap-[3px]">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-[3px] bg-champagne"
            style={{
              height: on ? undefined : "4px",
              animation: on ? `eq ${0.9 + i * 0.25}s ease-in-out ${i * 0.15}s infinite alternate` : "none",
            }}
          />
        ))}
      </span>
      <span className="text-[10px] font-semibold uppercase tracking-[0.28em]">
        {on ? "Đang nghe sóng" : "Nghe sóng biển"}
      </span>
      <style jsx>{`
        @keyframes eq {
          from {
            height: 4px;
          }
          to {
            height: 16px;
          }
        }
      `}</style>
    </button>
  );
}
