import React from 'react';

const SessionTimer = (props) => (
    <div id="session-timer">
        <h1 id="session-label">Session Length</h1>
        <button
            id="session-decrement"
            onClick={props.handleDecrementSession}
        >
            &minus;
      </button>
        <span id="session-length">{props.sessionLength}</span>
        <button
            id="session-increment"
            onClick={props.handleIncrementSession}
        >
            &#43;
      </button>
    </div>
)

export default SessionTimer; 