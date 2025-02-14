/* eslint-disable react/no-unknown-property */
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { ThreeElements, useFrame } from "@react-three/fiber";

export type CloudProps = ThreeElements["group"] & {
  opacity?: number;
};

export function Cloud({ opacity: _, ...props }: CloudProps) {
  const { nodes, materials } = useGLTF("./models/cloud.glb");

  const [firstPosition, setFirstPosition] = useState<null | number>(null);

  const [direction, setDirection] = useState(1); // 1 = right, -1 = left
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      setFirstPosition(groupRef.current.position.x);
    }
  }, []);

  const randomDelta = useState(() => (~~(Math.random() * 3) + 1) * 0.0002)[0];
  const randomRange = useState(() => ~~(Math.random() * 100) + 50)[0];

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.x += randomDelta * direction;

      if (firstPosition !== null) {
        if (groupRef.current.position.x - firstPosition > randomDelta * randomRange) {
          setDirection(-1); // Move left
        } else if (firstPosition - groupRef.current.position.x > randomDelta * randomRange) {
          setDirection(1); // Move right
        }
      }
    }
  });

  return (
    <group {...props} ref={groupRef} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        // @ts-expect-error
        geometry={nodes.Node.geometry}
        material={materials["lambert2SG.001"]}
      />
    </group>
  );
}

useGLTF.preload("./models/cloud.glb");
