interface PlayerControlsProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  currentBpm: number;
  setCurrentBpm: (bpm: number) => void;
  currentSwing: number;
  setCurrentSwing: (swing: number) => void;
  clearGrid: () => void;
}

function PlayerControls({
  isPlaying,
  setIsPlaying,
  currentBpm,
  setCurrentBpm,
  currentSwing,
  setCurrentSwing,
  clearGrid,
}: PlayerControlsProps) {
  return (
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
