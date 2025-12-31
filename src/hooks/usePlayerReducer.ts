/**
 * Reducer function to manage the state of a sequencer grid.
 * @clear Resets all steps in the grid to false.
 * @toggleStep Toggles the state of a specific step in the grid.
 */

import { useReducer, useCallback } from "react";

type GridAction =
  | { type: "TOGGLE_STEP"; payload: { row: number; col: number } }
  | { type: "CLEAR" }
  | { type: "SET_GRID"; payload: boolean[][] };
type State = boolean[][];

export const INSTRUMENTS = ["kick", "snare", "hihat", "cowbell"] as const;
const STEPS = 16;

const initialGrid = Array.from({ length: INSTRUMENTS.length }, () =>
  Array.from({ length: STEPS }, () => false)
);

function gridReducer(state: State, action: GridAction): boolean[][] {
  switch (action.type) {
    case "TOGGLE_STEP": {
      // Return new state with the specified step toggled
      const { row, col } = action.payload;
      return state.map((r, i) =>
        i === row ? r.map((c, j) => (j === col ? !c : c)) : r
      );
    }

    case "CLEAR":
      return initialGrid;

    case "SET_GRID":
      return action.payload;

    default:
      return state;
  }
}

export function useSequencerGrid() {
  const [grid, dispatch] = useReducer(gridReducer, initialGrid);

  const toggleStep = (row: number, col: number) => {
    dispatch({ type: "TOGGLE_STEP", payload: { row, col } });
  };

  const clearGrid = () => {
    dispatch({ type: "CLEAR" });
  };

  const setGrid = useCallback((newGrid: boolean[][]) => {
    dispatch({ type: "SET_GRID", payload: newGrid });
  }, []);

  return { grid, toggleStep, clearGrid, setGrid };
}
