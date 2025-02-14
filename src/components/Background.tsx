/* eslint-disable react/no-unknown-property */
import { useThree } from "@react-three/fiber";
import { Gradient } from "./Gradient";
import { PerspectiveCamera } from "@react-three/drei";

export function Background() {
  const { viewport } = useThree();

  const isMobile = viewport.width < 2;

  const width = isMobile ? viewport.width * 5 : viewport.width * 2;
  const height = isMobile ? viewport.height * 5 : viewport.height * 2;

  return (
    <>
      <PerspectiveCamera position={[0, 0, isMobile ? 8 : 5]} fov={isMobile ? 50 : 30} makeDefault />

      <mesh position={[0, 0, -4]}>
        <planeGeometry args={[width, height]} />
        <Gradient />
      </mesh>
    </>
  );
}
