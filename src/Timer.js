import React from 'react';

const Timer = (props) => (
    <div id="time-session">
        <h1 id="timer-label">{props.timerLabel === "Session" ? "Session" : "Break"}</h1>
        <h1 id="time-left">{props.time}</h1>
        <div id="controls-buttons">
            <button
                id="start_stop"
                onClick={props.handlePlayPause}
            >
                {props.isPlay ? <span>&#10074;&#10074;</span> : <span>&#9658;</span>}
            </button>
            <button
                id="reset"
                onClick={props.handleReset}
            >
                <span>&#8635;</span>
            </button>
        </div>
    </div>
)

export default Timer;