import { useCallback } from "react";
import YouTube, { YouTubeEvent } from "react-youtube";

export interface YouTubePlayerProps {
  videoId: string;
}

const PLAYER_OPTIONS = {
  height: "0",
  width: "0", // Hide the player
  playerVars: {
    autoplay: 1, // Auto-play the video
    loop: 1, // Loop the video
    controls: 0, // Hide controls
    modestbranding: 1,
    showinfo: 0,
    rel: 0, // Prevent related videos
  },
};

export function YouTubePlayer({ videoId }: YouTubePlayerProps) {
  const onReady = useCallback((event: YouTubeEvent) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    event.target.playVideo(); // Ensure the video plays automatically
  }, []);

  return <YouTube videoId={videoId} opts={PLAYER_OPTIONS} onReady={onReady} />;
}
