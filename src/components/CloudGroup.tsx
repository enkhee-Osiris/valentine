import { useThree, ThreeElements } from "@react-three/fiber";
import { Cloud } from "./Cloud";

export type CloudGroupProps = ThreeElements["group"];

export function CloudGroup(props: CloudGroupProps) {
  const { viewport } = useThree();

  return (
    <group {...props}>
      <Cloud scale={[0.1, 0.1, 0.1]} position={[-0.65, -0.55, 2]} />
      <Cloud scale={[0.4, 0.4, 0.4]} position={[-1, 1, 0]} />
      <Cloud scale={[0.3, 0.3, 0.4]} rotation-y={Math.PI / 9} position={[2, -0.2, 0]} />
      <Cloud scale={[0.2, 0.1, 0.1]} position={[1.5, -0.8, 0]} />
      <Cloud
        scale={[viewport.width * 0.15, viewport.width * 0.15, viewport.width * 0.15]}
        position={[1.2, 1.1, -3]}
      />
    </group>
  );
}
