import React from 'react';
import './App.css';
import BreakTimer from './BreakTimer';
import SessionTimer from './SessionTimer';
import Timer from './Timer'
import Title from './Title';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timerLabel: "Session",
      time: 25 * 60 * 1000,
      isPlay: false,
    }
    //this.handleDecrementBreak = this.handleDecrementBreak.bind(this)
    //this.handleIncrementBreak = this.handleIncrementBreak.bind(this)
    //this.handlePlayPause = this.handlePlayPause.bind(this);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.time === 0 && prevState.timerLabel === "Session") {
      this.setState({ time: this.state.breakLength * 60 * 1000, timerLabel: "Break" })
      this.audio.play();
    } else {
      if (prevState.time === 0 && prevState.timerLabel === "Break") {
        this.setState({ time: this.state.sessionLength * 60 * 1000, timerLabel: "Session" })
        this.audio.play();
      }
    }
  }
  handleDecrementBreak = () => {
    if (this.state.breakLength !== 1)
      this.setState({ breakLength: this.state.breakLength - 1 })
  }
  handleIncrementBreak = () => {
    if (this.state.breakLength !== 60)
      this.setState({ breakLength: this.state.breakLength + 1 })
  }
  handleDecrementSession = () => {
    if (this.state.sessionLength !== 1)
      this.setState({ sessionLength: this.state.sessionLength - 1, time: this.state.time - 1 * 60 * 1000 })

  }
  handleIncrementSession = () => {
    if (this.state.sessionLength !== 60)
      this.setState({ sessionLength: this.state.sessionLength + 1, time: this.state.time + 1 * 60 * 1000 })
  }
  handlePlayPause = () => {
    if (this.state.isPlay) {
      this.setState({ isPlay: false })
      clearInterval(this.clock);
    } else {
      this.setState({ isplay: true })
      this.clock = setInterval(() => this.setState({ time: this.state.time - 1000 }), 1000)
    }
    this.setState({ isPlay: !this.state.isPlay })
  }
  handleReset = () => {
    this.setState({
      breakLength: 5, sessionLength: 25, time: 25 * 60 * 1000,
      timerLabel: "Session", isPlay: false
    })
    clearInterval(this.clock);
    this.audio.pause();
    this.audio.currentTime = 0;
  }
  convertMilliseconds = (ms, p) => {
    let pattern = p,
      arrayPattern = pattern.split(":"),
      clock = [],
      minutes = Math.floor(ms / 60000), // 1 Minutes = 60000 Milliseconds
      seconds = Math.floor(((ms % 360000) % 60000) / 1000) // 1 Second = 1000 Milliseconds	
    // build the clock result
    function createClock(unit) {
      // match the pattern to the corresponding variable
      if (pattern.match(unit)) {
        if (unit.match(/mm/)) {
          addUnitToClock(minutes, unit);
        }
        if (unit.match(/ss/)) {
          addUnitToClock(seconds, unit);
        };
      }
    }
    function addUnitToClock(val, unit) {
      if (val < 10 && unit.length === 2) {
        val = "0" + val;
      }
      clock.push(val); // push the values into the clock array		
    }
    // loop over the pattern building out the clock result
    for (var i = 0, j = arrayPattern.length; i < j; i++) {
      createClock(arrayPattern[i]);
    }
    return clock.join(":")
  }
  render() {
    return (
      <div className='app-app'>
        <Title />
        <div className="app">
          <BreakTimer
            breakLength={this.state.breakLength}
            handleDecrementBreak={this.handleDecrementBreak}
            handleIncrementBreak={this.handleIncrementBreak}
          />
          <SessionTimer
            sessionLength={this.state.sessionLength}
            handleDecrementSession={this.handleDecrementSession}
            handleIncrementSession={this.handleIncrementSession}
          />
          <Timer
            isSessionLabel={this.state.isSessionLabel}
            timerLabel={this.state.timerLabel}
            time={this.convertMilliseconds(this.state.time, "mm:ss")}
            isPlay={this.state.isPlay}
            handlePlayPause={this.handlePlayPause}
            handleReset={this.handleReset}
          />
          <audio
            id="beep"
            src='https://www.soundjay.com/button/button-2.mp3'
            ref={ref => this.audio = ref}
          ></audio>
        </div>
      </div>
    )
  }
}

export default App;
