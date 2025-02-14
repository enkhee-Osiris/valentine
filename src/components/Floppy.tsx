/* eslint-disable react/no-unknown-property */
import { useRef } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { ThreeElements, useFrame } from "@react-three/fiber";

export type FloppyProps = ThreeElements["group"];

export function Floppy(props: FloppyProps) {
  const groupRef = useRef<THREE.Group>(null);

  const { nodes, materials } = useGLTF("./public/models/floppy.glb");

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group {...props} dispose={null}>
      <group ref={groupRef} rotation={[-2.7, 0, 2.5]} scale={0.01}>
        <mesh
          castShadow
          receiveShadow
          // @ts-expect-error
          geometry={nodes.Box_LP.geometry}
          material={materials["floppy.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          // @ts-expect-error
          geometry={nodes.Circle_LP.geometry}
          material={materials["floppy.002"]}
        />
        <mesh
          castShadow
          receiveShadow
          // @ts-expect-error
          geometry={nodes.Main_LP.geometry}
          material={materials.floppy}
        />
        <mesh
          castShadow
          receiveShadow
          // @ts-expect-error
          geometry={nodes.Metal_LP.geometry}
          material={materials["floppy.003"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("./public/models/floppy.glb");
