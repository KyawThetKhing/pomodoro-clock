import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      minutes: 25,
      seconds: "00",
      currentTimerStatus: "OFF",
      timer: 25 * 60,
      currentTimerName: "Session"
    };
  }

  handleReset = () => {
    console.log("hanldeReset");
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      minutes: 25,
      seconds: "00",
      timer: 25 * 60,
      currentTimerStatus: "OFF",
      currentTimerName: "Session"
    });
  };

  handleBreakToggle = e => {
    if (e === "decrement" && this.state.breakLength > 1) {
      this.setState({
        ...this.state,
        breakLength: this.state.breakLength - 1,
        minutes: this.state.breakLength - 1
      });
    } else if (e === "increment" && this.state.breakLength < 60) {
      this.setState({
        ...this.state,
        breakLength: this.state.breakLength + 1,
        minutes: this.state.breakLength + 1
      });
    }
  };

  handleSessionToggle = e => {
    if (e === "decrement" && this.state.sessionLength > 1) {
      this.setState({
        ...this.state,
        sessionLength: this.state.sessionLength - 1
      });
    } else if (e === "increment" && this.state.sessionLength < 60) {
      this.setState({
        ...this.state,
        sessionLength: this.state.sessionLength + 1
      });
    }
  };

  handleTimer = () => {
    switch (this.state.currentTimerStatus) {
      case "OFF":
        this.setState({
          ...this.state,
          currentTimerStatus: "ON",
          timer: this.state.minutes * 60
        });
        this.interval = setInterval(() => this.handleTimerUpdate(), 1000);
        break;
      case "ON":
        this.setState({
          ...this.state,
          currentTimerStatus: "PAUSE"
        });
        break;
      case "PAUSE":
        this.setState({
          ...this.state,
          currentTimerStatus: "ON"
        });
        break;
    }
  };

  handleTimerUpdate = () => {
    console.log("handleTimeUpdate");
    if (this.state.currentTimerStatus === "ON") {
      const countDown = this.state.timer - 1;

      if (countDown >= 0) {
        const mins = Math.floor(countDown / 60);
        const secs = countDown - mins * 60;
        console.log("Count Down", countDown);
        this.setState({
          timer: countDown,
          minutes: mins < 10 ? "0" + mins : mins,
          seconds: secs < 10 ? "0" + secs : secs
        });
      }

      if (countDown === 0) {
        console.log("beee ply");
      }
    } else {
      let cTimerName, cTimerLength, cTimer, cSeconds;

      if (this.state.currTimerName === "Session") {
        cTimerName = "Break";
        cTimerLength = this.state.breakLength;
      } else {
        cTimerName = "Session";
        cTimerLength = this.state.sessionLength;
      }
      cTimer = cTimerLength * 60;
      // cTimerLength = cTimerLength;
      cSeconds = "00";

      this.setState({
        ...this.state,
        currentTimerName: cTimerName,
        minutes: cTimerLength < 10 ? "0" + cTimerLength : cTimerLength,
        seconds: cSeconds,
        timer: cTimer
      });
    }
  };

  render() {
    console.log("this.state", this.state);
    return (
      <div className="container-fluid">
        <h3>Promodoro Clock</h3>
        <div className="row">
          <div className="col-md-6">
            <h4 id="break-label" className="break-label">
              Break Length
            </h4>
            <div>
              <span
                onClick={e => this.handleBreakToggle("decrement")}
                className="icon-font"
                id="break-decrement"
              >
                <i className="fa fa-arrow-down" />
              </span>
              <span id="break-length" className="icon-font icon-text">
                {this.state.breakLength}
              </span>
              <span
                onClick={e => this.handleBreakToggle("increment")}
                className="icon-font"
                id="break-increment"
              >
                <i className="fa fa-arrow-up" />
              </span>
            </div>
          </div>
          <div className="col-md-6">
            <h4 id="session-label" className="session-label">
              Session Length
            </h4>
            <div>
              <span
                className="icon-font"
                onClick={e => this.handleSessionToggle("decrement")}
                id="session-decrement"
              >
                <i className="fa fa-arrow-down" />
              </span>
              <span id="session-length" className="icon-font icon-text">
                {this.state.sessionLength}
              </span>
              <span
                onClick={e => this.handleSessionToggle("increment")}
                className="icon-font"
                id="session-increment"
              >
                <i className="fa fa-arrow-up" />
              </span>
            </div>
          </div>
        </div>
        <div className="row timer-sec">
          <div id="timer-label" className="col-md-12 session-label">
            {this.state.currentTimerName}
          </div>
          <div id="time-left" className="col-md-12 time">
            {this.state.minutes}:{this.state.seconds}
          </div>
        </div>
        <div>
          <span
            id="start_stop"
            onClick={this.handleTimer}
            className="icon-start-stop"
          >
            <i className="fa fa-play-circle-o" />
          </span>
          <span id="reset" onClick={this.handleReset} className="icon-reset">
            <i className="fa fa-refresh" />
          </span>
        </div>
      </div>
    );
  }
}

export default App;
