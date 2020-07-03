import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
const { useState, useEffect } = React;


const initialState = {
  session: 1500,
  break: 300,
  remaining: 1500,
  isRunning: false,
  cycle: false
};

const Pomodoro = () => {
  let [session, setSession] = useState(initialState.session);
  let [Break, setBreak] = useState(initialState.break);
  let [remaining, setRemaining] = useState(initialState.remaining);
  let [isRunning, setIsRunning] = useState(initialState.isRunning);
  let [cycle, setCycle] = useState(initialState.cycle);
  const go = document.getElementById("go");
  const beep = document.getElementById("beep");

  function toggle() {
    const go = document.getElementById("go");
    if (isRunning === false) go.play();
    setIsRunning(!isRunning);
  }

  function reset() {
    setSession(initialState.session);
    setBreak(initialState.break);
    setRemaining(initialState.remaining);
    setIsRunning(initialState.isRunning);
    setCycle(initialState.cycle);
    beep.currentTime = 0;
    go.currentTime = 0;
    beep.pause();
    go.pause();
  }

  useEffect(() => {
    const beep = document.getElementById("beep");
    let interval = null;
    if (remaining === 0 && !cycle) {
      beep.play();
      setCycle(true);
      setRemaining(Break);
    } else if (remaining === 0 && cycle) {
      beep.play();
      setCycle(false);
      setRemaining(session);
    }
    if (isRunning && !cycle) {
      interval = setInterval(() => {
        if (remaining > 0) {
          setRemaining((remaining) => remaining - 1);
        }
      }, 1000);
    } else if (isRunning && cycle) {
      interval = setInterval(() => {
        if (remaining > 0) {
          setRemaining((remaining) => remaining - 1);
        }
      }, 1000);
    } else if (!isRunning && remaining !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [session, Break, remaining, isRunning, cycle]);

  const increment = (id) => {
    if (isRunning === false) {
      if (id === "break-increment" && Break < 3600) setBreak(Break + 60);
      else if (id === "session-increment" && session < 3600) {
        setSession(session + 60);
        setRemaining(remaining + 60);
      }
    }
  };
  const decrement = (id) => {
    if (isRunning === false) {
      if (id === "break-decrement" && Break > 60) setBreak(Break - 60);
      else if (id === "session-decrement" && session > 60) {
        setSession(session - 60);
        setRemaining(remaining - 60);
      }
    }
  };

  const secondsToTime = (secs) => {
    let divisor_for_minutes = secs % (60 * 60);
    let minutes;
    if (secs === 3600) minutes = Math.floor(3600 / 60);
    else minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    if (seconds.toString().split("").length === 1)
      seconds = [0].concat(parseInt(seconds)).join("");
    if (minutes.toString().split("").length === 1)
      minutes = [0].concat(parseInt(minutes)).join("");

    let obj = [minutes, seconds].join(":");

    return obj;
  };
  const secondsToMinutes = (secs) => {
    return secs / 60;
  };

  return (
    <div id="pomodoro">
      <h1 id="title">Pomodoro Clock</h1>
      <div id="left">
        <button
          class="minus"
          id="break-decrement"
          onClick={(e) => decrement(e.target.id)}
        >
          -
        </button>
        <h1 id="break-label">Break Length</h1>
        <br />
        <h1 id="break-length">{secondsToMinutes(Break)}</h1>
        <button
          class="plus"
          id="break-increment"
          onClick={(e) => increment(e.target.id)}
        >
          +
        </button>
      </div>

      <div id="right">
        <button
          class="minus"
          id="session-decrement"
          onClick={(e) => decrement(e.target.id)}
        >
          -
        </button>
        <h1 id="session-label">Session Length</h1>
        <br />
        <h1 id="session-length">{secondsToMinutes(session)}</h1>
        <button
          class="plus"
          id="session-increment"
          onClick={(e) => increment(e.target.id)}
        >
          +
        </button>
      </div>
      <div id="center">
        <div id="session_border">
          {cycle ? (
            <h1 id="timer-label" style={{ color: "#ffc958" }}>
              Break
            </h1>
          ) : (
            <h1 id="timer-label">Session</h1>
          )}
          {cycle ? (
            <h2 id="time-left" style={{ color: "#ffc958" }}>
              {secondsToTime(remaining)}
            </h2>
          ) : (
            <h2 id="time-left">{secondsToTime(remaining)}</h2>
          )}
        </div>
        <button id="start_stop" onClick={toggle}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button id="reset" onClick={reset}>
          Reset
        </button>
      </div>
      <h3 id="subtitle">
        Designed & Coded by{" "}
        <a href="https://yavuzsonmez.com/">
          {">> "}Yavuz Sönmez{" <<"}
        </a>
        <br />
        <a href="https://yavuzsonmez.com/portofolio">Return to Portofolio</a>
      </h3>
      <audio id="beep">
        <source
          src="https://media.jpkarlsven.com/audio/codepen/pomodoro-clock/start.mp3"
          type="audio/mp3"
        ></source>
      </audio>
      <audio id="go">
        <source
          src="https://media.jpkarlsven.com/audio/codepen/pomodoro-clock/start.mp3"
          type="audio/mp3"
        ></source>
      </audio>
    </div>
  );
};

ReactDOM.render (
  <React.StrictMode>
  <Pomodoro />
  </React.StrictMode>,
  document.getElementById('root')
);
