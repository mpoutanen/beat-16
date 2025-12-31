import { useState, useCallback, useEffect } from "react";
import useAudioEngine from "../../hooks/useAudioEngine";
import { useSequencerGrid, INSTRUMENTS } from "../../hooks/usePlayerReducer";
import { useSequencerTransport } from "../../hooks/useSequencerTransport";
import "./Player.css";
import Playhead from "../Playhead/Playhead";
import Grid from "../Grid/Grid";
import PlayerControls from "../PlayerControls/PlayerControls";

function handleSpacebarPress(
  event: KeyboardEvent,
  isPlaying: boolean,
  setIsPlaying: (playing: boolean) => void
) {
  if (event.code === "Space") {
    event.preventDefault();
    setIsPlaying(!isPlaying);
  }
}

function Player() {
  const { playSound } = useAudioEngine();

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentBpm, setCurrentBpm] = useState(80);
  const [currentSwing, setCurrentSwing] = useState(0);
  const { grid, toggleStep, clearGrid } = useSequencerGrid();

  const handleStepChange = useCallback((step: number) => {
    setCurrentStep(step);
  }, []);

  useSequencerTransport({
    grid,
    instruments: INSTRUMENTS,
    bpm: currentBpm,
    isPlaying,
    playSound,
    onStepChange: handleStepChange,
    swing: currentSwing,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      handleSpacebarPress(e, isPlaying, setIsPlaying);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPlaying, setIsPlaying]);

  return (
    <>
      <h1>Beat 16 - More Cowbell edition!</h1>
      <Playhead length={grid[0].length} currentStep={currentStep} />
      <Grid grid={grid} toggleStep={toggleStep} />
      <PlayerControls
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentBpm={currentBpm}
        setCurrentBpm={setCurrentBpm}
        currentSwing={currentSwing}
        setCurrentSwing={setCurrentSwing}
        clearGrid={clearGrid}
      />
    </>
  );
}

export default Player;
