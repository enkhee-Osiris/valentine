import { forwardRef } from "react";
import * as THREE from "three";
import { PositionalAudio, useProgress } from "@react-three/drei";

const BackgroundPlayer = forwardRef<THREE.PositionalAudio, {}>((_, ref) => {
  const { loaded } = useProgress();

  if (loaded) {
    return <PositionalAudio ref={ref} loop url="./4uliral.mp3" distance={40} />;
  }

  return null;
});

BackgroundPlayer.displayName = "BackgroundPlayer";

export { BackgroundPlayer };
