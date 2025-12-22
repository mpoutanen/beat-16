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
    let currentStep = 0;

    const eventId = Tone.Transport.scheduleRepeat(() => {
      // Check each instrument row for the current step
      gridRef.current.forEach((row, rowIndex) => {
        if (row[currentStep]) {
          // Schedule the sample to be played at the correct time
          const instrument = instrumentsRef.current[rowIndex];
          playSoundRef.current(instrument);
        }
      });

      // Update step
      onStepChange(currentStep);
      // Advance to next step
      currentStep = (currentStep + 1) % 16;
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
    }
  }, [isPlaying]);

  // Update tempo
  useEffect(() => {
    Tone.Transport.bpm.value = bpm;
  }, [bpm]);
}
