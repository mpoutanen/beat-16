interface PlayerControlsProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  currentBpm: number;
  setCurrentBpm: (bpm: number) => void;
  currentSwing: number;
  setCurrentSwing: (swing: number) => void;
  clearGrid: () => void;
  savePattern: () => void;
  loadPattern: () => void;
  clearPattern: () => void;
}

function PlayerControls({
  isPlaying,
  setIsPlaying,
  currentBpm,
  setCurrentBpm,
  currentSwing,
  setCurrentSwing,
  clearGrid,
  savePattern,
  loadPattern,
  clearPattern: deletePattern,
}: PlayerControlsProps) {
  return (
    <div className="player-controls">
      <div>
        <button onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? "Stop" : "Play"}
        </button>
        <button onClick={clearGrid}>Clear Grid</button>
        <div>
          <button onClick={savePattern}>Save Pattern</button>
          <button onClick={loadPattern}>Load Pattern</button>
          <button onClick={deletePattern}>Delete Pattern</button>
        </div>
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
      <label>
        <span>Swing: </span> {currentSwing}
        <input
          type="range"
          min="0"
          max="100"
          value={currentSwing}
          onChange={(e) => setCurrentSwing(Number(e.target.value))}
        />
      </label>
    </div>
  );
}

export default PlayerControls;
