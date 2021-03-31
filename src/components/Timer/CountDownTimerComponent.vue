<template>
  <div>
    <h2 id="timer-title">{{ title }}</h2>

    <div class="timer-container">
      <svg
        class="timer__svg"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g class="timer__circle">
          <circle class="timer__path-elapsed" cx="50" cy="50" r="45"></circle>
          <circle class="timer__inner-circle" cx="50" cy="50" r="35.5"></circle>
          <path
            :stroke-dasharray="circleDasharray"
            class="timer__path-remaining"
            :class="remainingPathColor"
            d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
          "
          ></path>
        </g>
      </svg>

      <!-- to show the remaining time in the timer -->
      <span class="timer__label">
        {{ formattedTimeLeft }}<br />{{ leftWord }}
      </span>
    </div>

    <div class="buttons">
      <p id="coins-to-earn">
        Coins to earn:
        <u
          ><b>{{ coinsToEarn }}</b></u
        >
        <span id="info"
          >i
          <span id="coinsToolTip" class="tooltiptext">
            Maximum number of coins earned per task is based on the rate of
            <b>1 coin per 10 minutes</b>, adjusted for previous trend of
            overestimate or underestimate of task timing.
            <br />
            By default, a 1 hr task will earn a maximum of 6 coins.
            <br />
            However, if there is a consistent overestimate or underestimate of
            the allocated time per task, then the maximum number of coins to be
            earned will be reduced.
            <br />
            <u>This is to encourage accurate allocation of time per task.</u>
          </span>
        </span>
      </p>
      <!-- Timer completes -->
      <button id="done" class="timerControlledBtns" @click="doneTimer()">
        <span class="tooltiptext">Complete task</span>
        <img
          src="../../assets/timer/done_icon.png"
          alt="timerDone"
          class='doneBtn'
        />
      </button>
      <!-- Pause Timer -->
      <button id="pause" class="timerControlledBtns" @click="pauseTimer()">
        <span class="tooltiptext">Pause for a break</span>
        <img
          src="../../assets/timer/pause_icon.png"
          alt="timerPause"
          class='pauseBtn'
        />
      </button>
      <!-- Cancel Timer -->
      <button id="cancel" class="timerControlledBtns" @click="cancelTimer()">
        <span class="tooltiptext">Cancel task</span>
        <img
          src="../../assets/timer/cancel_icon.png"
          alt="timerCancel"
          class='cancelBtn'
        />
      </button>
      <p id="note">
        Note: Please click on the 'tick' to complete the task before the time is
        up.<br />Penalty will be imposed on coins earned for tasks that exceed
        time limit!
      </p>
    </div>
  </div>
</template>


<script>
import coinCal from ".././CoinLogic.js";
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 0.25;
const ALERT_THRESHOLD = 0.1;

const COLOR_CODES = {
  info: {
    color: "green",
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD,
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD,
  },
};

// To change here to bind to the actual data
//const this.totalTime= 10; // dummy timing value (e.g 3913sec => 1hr5min13sec) for testing at the moment

export default {
  props: {
    currentTimer: Number,
    timerTimePassed: Number,
    taskTitle: String,
    coin: Number,
  },
  data() {
    return {
      timePassed: 0 /* To store the amount of time (in sec) that has passed */,
      timerInterval: null,
      title: "Task",
      coinsToEarn: 0,
      totalTime: 3600,
      timeToStop: null,
      timeStop: 0,
    };
  },

  computed: {
    formattedTimeLeft() {
      const timeLeft = this.timeLeft; // time is originally stored in totalSecs

      let hours = Math.floor(timeLeft / 3600);
      let minutes = Math.floor((timeLeft % 3600) / 60); // remaining mins
      let seconds = Math.floor((timeLeft % 3600) % 60); // remaining sec

      // If the values of hours, mins and seconds are < 10, display the value with a leading zero
      if (hours < 10) {
        hours = `0${hours}`;
      }

      if (minutes < 10) {
        minutes = `0${minutes}`;
      }

      if (seconds < 10) {
        seconds = `0${seconds}`;
      }

      // Output the time in HH:MM:SS format
      if (timeLeft != 0) {
        return `${hours}:${minutes}:${seconds}`;
      } else {
        return "Time's Up!";
      }
    },
    leftWord() {
      const timeLeft = this.timeLeft;
      if (timeLeft != 0) {
        return "left";
      } else {
        return "";
      }
    },
    timeLeft() {
      return this.totalTime - this.timePassed;
    },

    // Update the dasharray value as time passes, starting with 283
    circleDasharray() {
      // To animate the ring arc length of the remaining time line with the 'stroke-dasharray' in <path>
      return `${(this.timeFraction * FULL_DASH_ARRAY).toFixed(0)} 283`;
    },

    timeFraction() {
      // Divides time left by the defined time limit
      const rawTimeFraction = this.timeLeft / this.totalTime;

      // reducing the length of the ring gradually during the countdown
      return rawTimeFraction - (1 / this.totalTime) * (1 - rawTimeFraction);
    },

    remainingPathColor() {
      const { alert, warning, info } = COLOR_CODES;
      var alertTime = this.totalTime * alert.threshold;
      var warningTime = this.totalTime * warning.threshold;
      if (this.timeLeft <= alertTime) {
        return alert.color;
      } else if (this.timeLeft <= warningTime) {
        return warning.color;
      } else {
        return info.color;
      }
    },
  },

  watch: {
    timeLeft(newValue) {
      if (newValue === 0) {
        this.onTimesUp();
      }
    },
  },

  async created() {
    this.title = this.taskTitle;
    this.totalTime = this.currentTimer + this.timerTimePassed;
    this.timePassed = this.timerTimePassed;
    this.coinsToEarn = this.coin;
    this.coinsToEarn = await coinCal(this.currentTimer);
    //console.log("COINS: " + this.coinsToEarn);
    // to start the timer immediately when the component gets mounted
    this.startTimer();
  },

  methods: {
    onTimesUp: function () {
      clearInterval(this.timerInterval);
      this.timeToStop = setInterval(() => (this.timeStop += 1), 1000);
    },

    // Fn that increase the value of timePassed by 1unit per sec and recompute the timeLeft value
    startTimer: function () {
      // increment the timePassed value every sec
      this.timerInterval = setInterval(() => (this.timePassed += 1), 1000);
    },

    doneTimer: function () {
      this.$emit("end", this.timePassed, this.timeStop, this.coinsToEarn);
    },

    pauseTimer: function () {
      var timeLeft = this.totalTime - this.timePassed;
      this.$emit("switch", true, timeLeft, this.timePassed);
    },
    cancelTimer: function () {
      this.$emit("cancel");
    },
  },
};
</script>


<style scoped>
* {
  font-family: Lora;
}
.tooltiptext {
  visibility: hidden;
  width: auto;
  background-color: rgb(235, 235, 235);
  color: rgb(0, 0, 0);
  text-align: center;
  border-radius: 6px;
  padding: 5px 10px 5px 10px;
  position: absolute;
  z-index: 1;
  top: 125%;
  left: -10%;
  margin-left: 0px;
  opacity: 0;
  transition: opacity 0.3s;
  font-size: 10px;
}

.tooltiptext::after {
  content: "";
  position: absolute;
  bottom: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent rgb(235, 235, 235) transparent;
}

#info {
  border: 1px solid black;
  border-radius: 100%;
  width: 12px;
  height: 12px;
  text-align: center;
  font-size: 12px;
  font-weight: 700;
  font-style: italic;
  display: block;
  padding: None;
  margin-left: 10px;
}

#coinsToolTip {
  position: absolute;
  z-index: 1;
  top: -430%;
  left: 370%;
  width: 290px;
  height: auto;
  padding: 10px;
  font-size: 11px;
  font-style: normal;
  font-weight: 300;
  text-align: justify;
  border-radius: 20px;
}

#coinsToolTip::after {
  content: "";
  position: absolute;
  bottom: 42%;
  left: -10%;
  margin-left: -5px;
  border-width: 20px;
  border-style: solid;
  border-color: transparent rgb(235, 235, 235) transparent transparent;
}

button:hover > .tooltiptext {
  visibility: visible;
  opacity: 1;
}

#info:hover > .tooltiptext {
  visibility: visible;
  opacity: 1;
}

#info {
  position: relative;
  display: inline-block;
}

.buttons {
  display: block;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
button {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 40px;
  margin: 8px;
}
img {
  position: relative;
  right: 10%;
  top: 6%;
  width: 30px;
  height: 30px;
}
#note {
  text-align: center;
  font-size: 10px;
}
#timer-title {
  display: block;
  text-align: center;
  width: 400px;
  word-wrap: break-word;
}
/* Sets the containers height and width; i.e. setting the timer's size */
.timer-container {
  position: relative;
  width: 300px;
  height: 300px;
  margin-left: auto;
  margin-right: auto;
}

/* Styling to show the timing value inside the circle */
.timer__label {
  position: absolute;
  top: 10px; /* Keep the label placed 10px down from the top edge to make it more like in the middle */

  /* Size should match the parent container, i.e. timer-container */
  width: 300px;
  height: 300px;

  /* Create a flexible box that centers content vertically and horizontally */
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 28px;
  letter-spacing: 1.3px;
  text-align: center;
}

/* Removes SVG styling that would hide the time label */
.timer__circle {
  fill: none;
  stroke: none;
}

/* The SVG path that displays the timer's progress */
.timer__path-elapsed {
  stroke-width: 3px; /* The original circle ring */
  stroke: #fff; /* #e6e6e6; */
}

.timer__inner-circle {
  fill: #81b762;
  opacity: 0.47;
}

/* stacking a new green ring on top of the original gray ring for the duration progress animation */
.timer__path-remaining {
  stroke-width: 3px; /* This need be the same size as the original ring */
  stroke-linecap: round; /* Rounds the line endings to create a seamless circle */

  /* Makes sure the animation starts at the top of the circle */
  transform: rotate(90deg);
  transform-origin: center;

  transition: 1s linear all; /* One second aligns with the speed of the countdown timer */
  fill-rule: nonzero;
  stroke: currentColor; /* Allows the ring to change color when the color value updates */
  opacity: 1;
}

.timer__path-remaining.green {
  color: #81b762; /* rgb(65, 184, 131) */
}

.timer__path-remaining.orange {
  color: orange;
}

.timer__path-remaining.red {
  color: rgb(255, 96, 96);
}
.timerControlledBtns {
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.1);
  border: none;
  cursor: pointer;
}
.timerControlledBtns:focus {
  box-shadow: inset 0px 0px 4px #c1c1c1;
  transform: translateY(4px);
  outline: none;
}
.doneBtn {
  height: 18px;
  width: auto;
  padding-left: 5px;
  padding-bottom: 3px;
  vertical-align: middle;
}
.pauseBtn {
  height: 24px;
  width: auto;
  padding-left: 5px;
  padding-bottom: 3px;
  vertical-align: middle;
}
.cancelBtn {
  height: 18px;
  width: auto;
  padding-left: 5px;
  padding-bottom: 3px;
  vertical-align: middle;
}
</style>
