import { useThree } from "@react-three/fiber";
import { Gradient } from "./Gradient";

export function Background() {
  const { viewport } = useThree();

  return (
    <>
      <mesh position={[0, 0, -4]}>
        <planeGeometry args={[viewport.width * 2, viewport.height * 2]} />
        <Gradient />
      </mesh>
    </>
  );
}
