import { useState } from "react";
import useAudioEngine from "../hooks/useAudioEngine";
import "./Player.css";

const INSTRUMENTS = ["kick", "snare", "hihat", "cowbell"] as const;
const STEPS = 16;

function Player() {
  const { playSound } = useAudioEngine();

  const [grid, setGrid] = useState<boolean[][]>(() =>
    Array.from({ length: INSTRUMENTS.length }, () =>
      Array.from({ length: STEPS }, () => false)
    )
  );

  return (
    <div className="sequencer-grid">
      {INSTRUMENTS.map((instrument, index) => (
        <>
          <div className="instrument-label" key={`${instrument}-label`}>
            {instrument}
          </div>
          {grid[index].map((isActive, stepIndex) => (
            <button
              key={`${instrument}-${stepIndex}`}
              className={isActive ? "active" : ""}
            >
              {stepIndex + 1}
            </button>
          ))}
        </>
      ))}
    </div>
  );
}

export default Player;
