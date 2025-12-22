import { useState, Fragment, useCallback, useEffect } from "react";
import useAudioEngine from "../../hooks/useAudioEngine";
import { useSequencerGrid, INSTRUMENTS } from "./playerReducer";
import { useSequencerTransport } from "../../hooks/useSequencerTransport";
import "./Player.css";

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
      <div className="playhead-container">
        <span></span>
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            className={`playhead-cell${
              i === currentStep ? " playhead-active" : ""
            }`}
          />
        ))}
      </div>
      <div className="sequencer-grid">
        {INSTRUMENTS.map((instrument, index) => (
          <Fragment key={instrument}>
            <div className="instrument-label" key={`${instrument}-label`}>
              {instrument}
            </div>
            {grid[index].map((isActive, stepIndex) => (
              <button
                key={`${instrument}-${stepIndex}`}
                className={`${isActive ? "active" : ""} step-button`}
                onClick={() => toggleStep(index, stepIndex)}
              ></button>
            ))}
          </Fragment>
        ))}
      </div>
      <div className="player-controls">
        <div>
          <button onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? "Stop" : "Play"}
          </button>
          <button onClick={clearGrid}>Clear Grid</button>
        </div>
        <label>
          <span>BPM: </span> {currentBpm}
          <input
            type="range"
            min="60"
            max="200"
            value={currentBpm}
            onChange={(e) => setCurrentBpm(Number(e.target.value))}
          />
        </label>
      </div>
    </>
  );
}

export default Player;
