import useAudioEngine from "../hooks/useAudioEngine";
import "./Player.css";

function Player() {
  const { playSound } = useAudioEngine();

  return (
    <div className="sequencer-grid">
      <div>
        <button onClick={() => playSound("kick")}>Kick</button>
      </div>
      <div>
        <button onClick={() => playSound("snare")}>Snare</button>
      </div>
      <div>
        <button onClick={() => playSound("hihat")}>Hi-Hat</button>
      </div>
      <div>
        <button onClick={() => playSound("cowbell")}>Cowbell</button>
      </div>
    </div>
  );
}

export default Player;
