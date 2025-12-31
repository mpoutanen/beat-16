import { Fragment } from "react";
import { INSTRUMENTS } from "../../hooks/usePlayerReducer";
import "./Grid.css";

interface GridProps {
  grid: boolean[][];
  toggleStep: (row: number, col: number) => void;
}

function Grid({ grid, toggleStep }: GridProps) {
  return (
    <div className="sequencer-grid">
      {INSTRUMENTS.map((instrument, index) => (
        <Fragment key={instrument}>
          <div
            className={`instrument-label ${instrument}`}
            key={`${instrument}-label`}
          >
            {instrument}
          </div>
          {grid[index].map((isActive, stepIndex) => (
            <button
              key={`${instrument}-${stepIndex}`}
              className={`${
                isActive ? "active" : ""
              } ${instrument} step-button`}
              onClick={() => toggleStep(index, stepIndex)}
            ></button>
          ))}
        </Fragment>
      ))}
    </div>
  );
}

export default Grid;
