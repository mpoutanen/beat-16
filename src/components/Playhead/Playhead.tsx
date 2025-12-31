import "./Playhead.css";

function Playhead(props: { length: number; currentStep: number }) {
  const { length = 0, currentStep = 0 } = props;
  return (
    <div className="playhead-container">
      <span></span>
      {Array.from({ length }).map((_, i) => (
        <div
          key={i}
          className={`playhead-cell${
            i === currentStep ? " playhead-active" : ""
          }`}
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
}

export default Playhead;
