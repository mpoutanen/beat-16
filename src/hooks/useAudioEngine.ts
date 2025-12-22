import * as Tone from "tone";
import { useRef, useCallback } from "react";

export default function useAudioEngine() {
  const isStarted = useRef(false);

  const playSound = useCallback(async (instrument: string) => {
    if (!isStarted.current) {
      await Tone.start();
      isStarted.current = true;
      console.log("Audio engine started");
    }

    let url = "";

    switch (instrument) {
      case "kick":
        url = "/samples/kick.wav";
        break;
      case "snare":
        url = "/samples/snare.wav";
        break;
      case "hihat":
        url = "/samples/hihat.wav";
        break;
      case "cowbell":
        url = "/samples/cowbell.wav";
        break;
      default:
        console.warn(`Unknown instrument: ${instrument}`);
    }

    const player = new Tone.Player(url).toDestination();
    player.autostart = true;

    player.onstop = () => {
      player.dispose();
    };
  }, []);

  return { playSound };
}
