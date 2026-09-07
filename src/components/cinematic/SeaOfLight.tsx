"use client";
import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const VERT = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  attribute float aRandom;
  varying float vElevation;
  void main() {
    vec3 pos = position;
    float t = uTime;
    float w = sin(pos.x * 0.45 + t * 0.7) * 0.32
            + cos(pos.z * 0.6 + t * 0.5) * 0.28
            + sin((pos.x + pos.z) * 0.25 + t * 0.35) * 0.2;
    float d = distance(pos.xz, uMouse * vec2(9.0, 5.0));
    w += sin(d * 2.6 - t * 1.8) * 0.34 * exp(-d * 0.42);
    pos.y += w;
    vElevation = w;
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = (2.2 + aRandom * 3.4) * (14.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAG = /* glsl */ `
  varying float vElevation;
  void main() {
    float a = smoothstep(0.5, 0.12, length(gl_PointCoord - 0.5));
    vec3 deep = vec3(0.10, 0.20, 0.23);
    vec3 gold = vec3(0.995, 0.87, 0.62);
    vec3 col = mix(deep, gold, smoothstep(-0.25, 0.75, vElevation));
    gl_FragColor = vec4(col, a * 0.9);
  }
`;

function Sea() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  const mouse = useMemo(() => new THREE.Vector2(99, 99), []);

  const { positions, randoms } = useMemo(() => {
    const cols = 110;
    const rows = 60;
    const positions = new Float32Array(cols * rows * 3);
    const randoms = new Float32Array(cols * rows);
    let k = 0;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        positions[k * 3] = (i / (cols - 1) - 0.5) * 18;
        positions[k * 3 + 1] = 0;
        positions[k * 3 + 2] = (j / (rows - 1) - 0.5) * 10;
        randoms[k] = Math.random();
        k++;
      }
    }
    return { positions, randoms };
  }, []);

  useFrame((state) => {
    if (!mat.current) return;
    mat.current.uniforms.uTime.value = state.clock.elapsedTime;
    mouse.x += (pointer.x - mouse.x) * 0.04;
    mouse.y += (pointer.y - mouse.y) * 0.04;
    mat.current.uniforms.uMouse.value.copy(mouse);
    if (group.current) {
      group.current.rotation.y += ((mouse.x * 0.12) - group.current.rotation.y) * 0.03;
      group.current.rotation.x += ((-mouse.y * 0.06) - group.current.rotation.x) * 0.03;
    }
  });

  return (
    <group ref={group} rotation={[-0.35, 0, 0]} position={[0, -0.6, 0]}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-aRandom" args={[randoms, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={mat}
          vertexShader={VERT}
          fragmentShader={FRAG}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          uniforms={{
            uTime: { value: 0 },
            uMouse: { value: new THREE.Vector2(99, 99) },
          }}
        />
      </points>
    </group>
  );
}

/**
 * SEA OF LIGHT — biển hạt ánh sáng 3D phản ứng với con trỏ.
 * Nền gradient tĩnh luôn nằm dưới nếu WebGL không khả dụng.
 */
export default function SeaOfLight() {
  const [reduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  return (
    <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1c3238_0%,#101010_65%)]">
      {!reduced && (
        <Canvas
          dpr={[1, 1.75]}
          camera={{ position: [0, 1.4, 6.2], fov: 58 }}
          gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        >
          <Sea />
        </Canvas>
      )}
    </div>
  );
}
