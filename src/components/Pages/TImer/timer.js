/* eslint-disable no-dupe-class-members */
// import React, { useEffect } from "react";
// import { useRef } from "react";
// import { useState } from "react";
import Authapi from "../../Services/Authapi";

import React, { Component } from "react";
import ls from "local-storage";
import LoadderButton from "../../Layouts/LoadderButton";
import * as workerTimers from "worker-timers";
import "./timer.css";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: ls.get("timer") ? ls.get("timer") : 0,
      isActive: ls.get("isActive") ? ls.get("isActive") : false,
      isPaused: ls.get("isPaused") ? ls.get("isPaused") : false,
      startTime: ls.get("startTime") ? ls.get("startTime") : 0,
      stopTime: ls.get("stopTime") ? ls.get("stopTime") : 0,
    };
    this.countRef = React.createRef(null);

    if (this.state.isActive === false) {
      this.scnd();
    }
  }

  scnd = async () => {
    let timeCount = await Authapi.durTime();
    // console.log(timeCount);

    this.counterUpdate(parseInt(timeCount.totalDurationInSec));
  };

  // updateCounterOnload(timer) {
  //   this.setState({ timer: timer });

  //   // ls.set(this.state.count);
  //   // console.log(this.state.count)
  // }

  saveStateToLocalStorage() {
    ls.set("startTime", this.state.startTime);
    ls.set("timer", this.state.timer);
    ls.set("isActive", this.state.isActive);
    ls.set("stopTime", this.state.stopTime);
  }

  componentDidMount() {
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
    // if (this.state.timerOn) {
    //   this.runCycle()
    // }
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
    // saves if component has a chance to unmount
    this.saveStateToLocalStorage();
  }

  runCycle() {
    this.countRef.current = workerTimers.setInterval(() => {
      this.setState({ timer: this.state.timer + 1 });
      this.saveStateToLocalStorage();
    }, 1000);
  }

  handleStart = async () => {
    await Authapi.inTime();
    this.setState({ isActive: true }, function () {
      this.setState({ startTime: Date.now() - this.state.startTime });
      this.runCycle();
    });
  };

  handlePause = async () => {
    // clearInterval(this.countRef.current);
    // this.setState({ isPaused: false });
    await Authapi.outTime();
    this.setState({ isActive: false }, function () {
      this.setState({ stopTime: Date.now() });
      workerTimers.clearInterval(this.countRef.current);
    });
    window.location.reload();
    // ls.remove("isActive", false);

    this.saveStateToLocalStorage();
  };

  counterUpdate = (timer) => {
    this.setState({ timer: timer });
  };

  componentDidMount() {
    if (this.state.isActive === true) {
      this.runCycle();
    }
  }

  formatTime = () => {
    const getSeconds = `0${this.state.timer % 60}`.slice(-2);
    const minutes = `${Math.floor(this.state.timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(this.state.timer / 3600)}`.slice(-2);

    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };

  render() {
    return (
      <div className="stopwatch-card">
        <p className="timerText">{this.formatTime()}</p>
        <div className="buttons">
          {this.state.isActive === false && (
            <LoadderButton
              onClickFn={this.handleStart}
              btnText="In"
              actionClass="inbutton"
            />
          )}
          {this.state.isActive !== false && (
            <LoadderButton
              onClickFn={this.handlePause}
              btnText="Out"
              actionClass="inbutton"
            />
          )}
        </div>
      </div>
    );
  }
}

export default Timer;
