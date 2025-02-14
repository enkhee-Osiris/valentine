/* eslint-disable react/no-unknown-property */
import "./App.css";
import { Suspense, useCallback, useRef } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Environment, Float, Loader, PerspectiveCamera } from "@react-three/drei";

import { Floppy } from "./components/Floppy";
import { Background } from "./components/Background";
import { CloudGroup } from "./components/CloudGroup";
import { BackgroundPlayer } from "./components/BackgroundPlayer";

function App() {
  const audioRef = useRef<THREE.PositionalAudio>(null);

  const handleFloppyClick = useCallback(() => {
    if (audioRef.current) {
      const playing = audioRef.current.isPlaying;
      if (!playing) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, []);

  return (
    <>
      <Canvas>
        <color attach="background" args={["#ececec"]} />

        <Environment
          background={false}
          backgroundBlurriness={0}
          backgroundIntensity={1}
          backgroundRotation={[0, Math.PI / 2, 0]}
          environmentIntensity={0.6}
          environmentRotation={[0, Math.PI * 2, 0]}
          preset="dawn"
          scene={undefined}
        />

        <PerspectiveCamera position={[0, 0, 5]} fov={30} makeDefault />

        <Background />

        <Suspense fallback={null}>
          <group>
            <Float floatIntensity={2} speed={1}>
              <Floppy
                onClick={handleFloppyClick}
                rotation-y={-Math.PI / 5}
                scale={[0.4, 0.4, 0.4]}
                position={[0, 0, -1]}
              />
            </Float>
          </group>

          <CloudGroup />

          <BackgroundPlayer ref={audioRef} />
        </Suspense>
      </Canvas>

      <Loader />
    </>
  );
}

export default App;
