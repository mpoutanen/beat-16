/**
 * Custom hook to manage sequencer transport controls
 * @play Starts the transport
 * @stop Stops the transport
 */

import { useEffect, useRef } from "react";
import * as Tone from "tone";

interface UseSequencerTransportProps {
  grid: boolean[][];
  instruments: readonly string[];
  bpm: number;
  isPlaying: boolean;
  playSound: (instrument: string) => void;
  onStepChange: (step: number) => void;
  swing: number;
  startStep?: number;
}

export function useSequencerTransport({
  grid,
  instruments,
  playSound,
  isPlaying,
  bpm,
  onStepChange,
  swing,
  startStep,
}: UseSequencerTransportProps) {
  // Refs to keep track of current values in the interval
  const gridRef = useRef(grid);
  const playSoundRef = useRef(playSound);
  const instrumentsRef = useRef(instruments);
  const currentStepRef = useRef(0);
  const isPlayingRef = useRef(isPlaying);

  // Update refs when dependencies change
  useEffect(() => {
    gridRef.current = grid;
  }, [grid]);

  useEffect(() => {
    playSoundRef.current = playSound;
  }, [playSound]);

  useEffect(() => {
    instrumentsRef.current = instruments;
  }, [instruments]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) {
      currentStepRef.current = startStep ?? 0;
    }
  });

  // Set up Transport scheduling
  useEffect(() => {
    const eventId = Tone.getTransport().scheduleRepeat(() => {
      if (!isPlayingRef.current) return;
      const step = currentStepRef.current;
      // Check each instrument row for the current step
      gridRef.current.forEach((row, rowIndex) => {
        if (row[step]) {
          // Schedule the sample to be played at the correct time
          const instrument = instrumentsRef.current[rowIndex];
          playSoundRef.current(instrument);
        }
      });

      // Update step
      onStepChange(step);
      // Advance to next step
      currentStepRef.current = (step + 1) % 16;
    }, "16n");

    return () => {
      Tone.getTransport().clear(eventId);
    };
  }, [onStepChange]);

  // Handle play/stop
  useEffect(() => {
    if (isPlaying) {
      Tone.getTransport().start();
    } else {
      Tone.getTransport().stop();
      // currentStepRef.current = 0;
      onStepChange(currentStepRef.current); // Reset step to 0 when stopped
    }
  }, [isPlaying]);

  // Update swing (to make beat feel more "human")
  useEffect(() => {
    Tone.getTransport().swing = swing / 100; // Convert percentage to decimal
    console.log(swing / 100);
  }, [swing]);

  // Update tempo
  useEffect(() => {
    Tone.getTransport().bpm.value = bpm;
  }, [bpm]);
}
