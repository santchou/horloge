import React from 'react';

const BreakTimer = (props) => (
    <div id="break-timer">
        <h1 id="break-label">Break Length</h1>
        <button
            id="break-decrement"
            onClick={props.handleDecrementBreak}
        >
            &minus;
      </button>
        <span id="break-length">{props.breakLength}</span>
        <button
            id="break-increment"
            onClick={props.handleIncrementBreak}
        >
            &#43;
      </button>
    </div>
)

export default BreakTimer;