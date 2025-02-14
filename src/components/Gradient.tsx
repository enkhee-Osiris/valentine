/* eslint-disable react/no-unknown-property */
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

export function Gradient() {
  const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

  const fragmentShader = `
  uniform vec3 colorA;
  uniform vec3 colorB;
  uniform float uTime;
  varying vec2 vUv;
  uniform vec3 resolution;

  void main() {
    vec4 startColor = vec4(colorA.r, colorA.g, colorA.b, 1.0);
    vec4 endColor = vec4(colorB.r, colorB.g, colorB.b, 1.0);
    float currentAngle = (0.0);

    vec2 uv = vUv.xy;//gl_FragCoord.xy / resolution.xy;

    vec2 origin = vec2(0.5, 0.25);
    uv -= origin;
    uv.y += 0.1;

    float angle = radians(90.0) - radians(currentAngle) + atan(uv.y, uv.x);

    float len = length(uv);
    uv = vec2(cos(angle) * len, sin(angle) * len) + origin;

    gl_FragColor = mix(startColor, endColor, smoothstep(0.0, 1.0, uv.x));
  }
`;

  const { viewport } = useThree();

  return (
    <shaderMaterial
      uniforms={{
        uTime: { value: 0 },
        colorA: { value: new THREE.Color("rgb(255, 234, 234)") },
        colorB: { value: new THREE.Color("rgb(255, 255, 255)") },
        resolution: { value: [viewport.width, viewport.height, 0] },
      }}
      toneMapped={false}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
    />
  );
}
