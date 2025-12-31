import { useState, useCallback } from "react";
import useAudioEngine from "../../hooks/useAudioEngine";
import { useSequencerGrid, INSTRUMENTS } from "../../hooks/usePlayerReducer";
import { useSequencerTransport } from "../../hooks/useSequencerTransport";
import { useKeyPress } from "../../hooks/useKeyPress";
import "./Player.css";
import Playhead from "../Playhead/Playhead";
import Grid from "../Grid/Grid";
import PlayerControls from "../PlayerControls/PlayerControls";

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
    startStep: currentStep,
  });

  // Play/Pause with Space key
  useKeyPress("Space", () => setIsPlaying(!isPlaying));

  // Clear grid with C key
  useKeyPress("KeyC", () => clearGrid());

  // Adjust BPM with up and down arrow keys
  useKeyPress("ArrowUp", () => setCurrentBpm((bpm) => Math.min(bpm + 1, 200)));
  useKeyPress("ArrowDown", () => setCurrentBpm((bpm) => Math.max(bpm - 1, 60)));

  // Navigate steps with left and right arrow keys
  useKeyPress("ArrowRight", () =>
    setCurrentStep((step) => (step + 1) % grid[0].length)
  );
  useKeyPress("ArrowLeft", () =>
    setCurrentStep((step) => (step - 1 + grid[0].length) % grid[0].length)
  );

  // Use key press 0 to return to step 0
  useKeyPress("Digit0", () => setCurrentStep(0));

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
