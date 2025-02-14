import { PositionalAudio, useProgress } from "@react-three/drei";

export function BackgroundPlayer() {
  const { loaded } = useProgress();

  if (loaded) {
    return <PositionalAudio autoplay loop url="./4uliral.mp3" distance={40} />;
  }

  return null;
}
