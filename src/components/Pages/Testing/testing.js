import React from "react";
import { useStopwatch } from "react-timer-hook";

function Testing() {
  const { seconds, minutes, hours, isRunning, start, pause, reset } =
    useStopwatch({ autoStart: false });

  const formatTime = (time) => {
    return String(time).padStart(2, "0");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>react-timer-hook</h1>
      <p>Stopwatch Demo</p>
      <div
        style={{
          fontSize: "80px",
        }}
      >
        <span>{formatTime(hours)}</span>:<span>{formatTime(minutes)}</span>:
        <span>{formatTime(seconds)}</span>
      </div>

      <button onClick={start}>In</button>
      <button onClick={pause}>Out</button>
      {/* <button onClick={reset}>Reset</button> */}
    </div>
  );
}

export default Testing;
