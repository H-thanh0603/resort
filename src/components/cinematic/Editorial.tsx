"use client";
import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SceneHeadProps = {
  no: string;
  label: string;
  title: ReactNode;
  lede?: string;
  meta?: string[];
  light?: boolean;
  className?: string;
};

/**
 * Đầu cảnh editorial thống nhất: số mono + label + rule,
 * title serif clamp lớn, lede nhẹ, hàng meta mono.
 * Mọi section sáng/tối trong hành trình đều dùng chung.
 */
export function SceneHead({ no, label, title, lede, meta, light = false, className = "" }: SceneHeadProps) {
  return (
    <div className={className}>
      <Reveal>
        <div className="flex items-center gap-4">
          <span className="text-[11px] uppercase tracking-[0.4em] text-champagne">{no}</span>
          <span className={`h-px w-16 ${light ? "bg-alabaster/25" : "bg-obsidian/25"}`} />
          <span
            className={`label-uppercase text-[11px] ${light ? "text-alabaster/60" : "text-bronze"}`}
          >
            {label}
          </span>
        </div>
      </Reveal>
      <Reveal delay={90}>
        <h2 className={`font-display display-lg mt-6 max-w-4xl ${light ? "text-alabaster" : "text-obsidian"}`}>
          {title}
        </h2>
      </Reveal>
      {lede && (
        <Reveal delay={160}>
          <p className={`mt-6 max-w-xl text-lg font-light leading-relaxed ${light ? "text-alabaster/65" : "text-inksoft"}`}>
            {lede}
          </p>
        </Reveal>
      )}
      {meta && meta.length > 0 && (
        <Reveal delay={220}>
          <div className={`mt-8 flex flex-wrap gap-x-10 gap-y-2 border-t pt-5 text-[11px] uppercase tracking-[0.24em] ${light ? "border-alabaster/15 text-alabaster/45" : "hairline text-obsidian/45"}`}>
            {meta.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </Reveal>
      )}
    </div>
  );
}
