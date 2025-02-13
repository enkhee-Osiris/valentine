/* eslint-disable react/no-unknown-property */
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Floppy } from "./components/Floppy";
import { Environment, Float, OrbitControls, PerspectiveCamera, Stats } from "@react-three/drei";
import { Background } from "./components/Background";
import { CloudGroup } from "./components/CloudGroup";

function App() {
  return (
    <Canvas>
      <color attach="background" args={["#ececec"]} />

      <OrbitControls />

      <Environment preset="sunset" />

      <PerspectiveCamera position={[0, 0, 5]} fov={30} makeDefault />

      <Stats />

      <Background />

      <group>
        <Float floatIntensity={2} speed={1}>
          <Floppy rotation-y={-Math.PI / 5} scale={[0.4, 0.4, 0.4]} position={[0, 0, -1]} />
        </Float>
      </group>

      <CloudGroup />
    </Canvas>
  );
}

export default App;
