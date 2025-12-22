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
}

export function useSequencerTransport({
  grid,
  instruments,
  playSound,
  isPlaying,
  bpm,
  onStepChange,
}: UseSequencerTransportProps) {
  // Refs to keep track of current values in the interval
  const gridRef = useRef(grid);
  const playSoundRef = useRef(playSound);
  const instrumentsRef = useRef(instruments);
  const currentStepRef = useRef(0);

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

  // Set up Transport scheduling
  useEffect(() => {
    const eventId = Tone.Transport.scheduleRepeat(() => {
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
      Tone.Transport.clear(eventId);
    };
  }, [onStepChange]);

  // Handle play/stop
  useEffect(() => {
    if (isPlaying) {
      Tone.Transport.start();
    } else {
      Tone.Transport.stop();
      currentStepRef.current = 0;
      onStepChange(0); // Reset step to 0 when stopped
    }
  }, [isPlaying]);

  // Update tempo
  useEffect(() => {
    Tone.Transport.bpm.value = bpm;
  }, [bpm]);
}
