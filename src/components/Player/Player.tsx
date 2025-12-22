import { useState, Fragment } from "react";
import useAudioEngine from "../../hooks/useAudioEngine";
import { useSequencerGrid, INSTRUMENTS } from "./playerReducer";
import { useSequencerTransport } from "../../hooks/useSequencerTransport";
import "./Player.css";

function Player() {
  const { playSound } = useAudioEngine();

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentBpm, setCurrentBpm] = useState(120);
  const { grid, toggleStep, clearGrid } = useSequencerGrid();

  useSequencerTransport({
    grid,
    instruments: INSTRUMENTS,
    bpm: currentBpm,
    isPlaying,
    playSound,
    onStepChange: (step) => setCurrentStep(step),
  });

  return (
    <>
      <h1>Beat 16 - More Cowbell edition!</h1>
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
        <button onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? "Stop" : "Play"}
        </button>
        <button onClick={clearGrid}>Clear Grid</button>
        <label>
          BPM: {currentBpm}
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
