<template>
<div>
  <h2 class="timer-title"> {{title}} </h2>

  <div class="timer-container">
    <svg class="timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
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
          ">
        </path>
      </g>
    </svg>

    <!-- to show the remaining time in the timer -->
    <span class="timer__label"> {{ formattedTimeLeft }}<br>{{leftWord}}</span>
  </div>

  <h4 class="coins-to-earn"> Coins to earn: {{coinsToEarn}} </h4>

  <div id="buttons">
    <!-- Timer completes -->
    <button id="done" class="timerControlledBtns" @click="doneTimer()">
        <img src="../assets/timer/done_icon.png" alt="timerDone" height = "18px" width="18px"/>
    </button>

    &nbsp; <!-- for extra spacing between the buttons -->

    <!-- Pause Timer -->
    <button id="pause" class="timerControlledBtns" @click="pauseTimer()">
        <img src="../assets/timer/pause_icon.png" alt="timerPause" height = "18px" width="18px"/>
    </button>

    &nbsp; <!-- for extra spacing between the buttons -->

    <!-- Cancel Timer -->
    <button id="cancel" class="timerControlledBtns" @click="cancelTimer()">
        <img src="../assets/timer/cancel_icon.png" alt="timerCancel" height = "18px" width="18px"/>
    </button>
  </div>

</div>
</template>


<script>
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 15;
const ALERT_THRESHOLD = 10;

const COLOR_CODES = {
  info: {
    color: "green",
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

// To change here to bind to the actual data
const TIME_IN_SEC= 10; // dummy timing value (e.g 3913sec => 1hr5min13sec) for testing at the moment

export default {
  data() {
    return {
      timePassed: 0, /* To store the amount of time (in sec) that has passed */
      timerInterval: null,
      title: "Selected Task Category + Task Name Here",
      coinsToEarn: 0,
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
        return 'Times Up!';
      }
    },
    leftWord() {
      const timeLeft = this.timeLeft;
      if (timeLeft != 0) {
        return 'Left';
      } else {
        return '';
      }
    },
    timeLeft() {
      return TIME_IN_SEC - this.timePassed;
    },

    // Update the dasharray value as time passes, starting with 283
    circleDasharray() { // To animate the ring arc length of the remaining time line with the 'stroke-dasharray' in <path>
      return `${(this.timeFraction * FULL_DASH_ARRAY).toFixed(0)} 283`;
    },

    timeFraction() {
      // Divides time left by the defined time limit
      const rawTimeFraction = this.timeLeft / TIME_IN_SEC;

      // reducing the length of the ring gradually during the countdown
      return rawTimeFraction - (1 / TIME_IN_SEC) * (1 - rawTimeFraction);
    },

    remainingPathColor() {
      const { alert, warning, info } = COLOR_CODES;

      if (this.timeLeft <= alert.threshold) {
        return alert.color;
      } else if (this.timeLeft <= warning.threshold) {
        return warning.color;
      } else {
        return info.color;
      }
    }
  },

  watch: {
    timeLeft(newValue) {
      if (newValue === 0) {
        this.onTimesUp();
      }
    }
  },

  mounted() { // to start the timer immediately when the component gets mounted
    this.startTimer();
  },

  methods: {
    onTimesUp: function() {
      clearInterval(this.timerInterval);
    },

    // Fn that increase the value of timePassed by 1unit per sec and recompute the timeLeft value
    startTimer: function() {
      // increment the timePassed value every sec
      this.timerInterval = setInterval(() => (this.timePassed += 1), 1000);
    },

    doneTimer: function() {
      // logic to compute the coins here?
    },

    pauseTimer: function() {
      this.title = "Break time!"
    },

    cancelTimer: function() {

    },
  }
};
</script>


<style scoped>
/* Sets the containers height and width; i.e. setting the timer's size */
.timer-container {
  position: relative;
  width: 300px;
  height: 300px;
}

/* Removes SVG styling that would hide the time label */
.timer__circle {
  fill: none;
  stroke: none;
}

/* The SVG path that displays the timer's progress */
.timer__path-elapsed {
  stroke-width: 3px; /* The original circle ring */
  stroke: #e6e6e6;
}

.timer__inner-circle {
  fill: #81b762;
  opacity: 0.47;
}

/* stacking a new green ring on top of the original gray ring for the duration progress animation */
.timer__path-remaining {
  stroke-width: 6px; /* This need be the same size as the original ring */
  stroke-linecap: round; /* Rounds the line endings to create a seamless circle */

  /* Makes sure the animation starts at the top of the circle */
  transform: rotate(90deg);
  transform-origin: center;

  transition: 1s linear all; /* One second aligns with the speed of the countdown timer */
  fill-rule: nonzero;
  stroke: currentColor;  /* Allows the ring to change color when the color value updates */
  opacity: 1;
}

.timer__path-remaining.green {
  color: #81b762; /* rgb(65, 184, 131) */
}

.timer__path-remaining.orange {
  color: orange;
}

.timer__path-remaining.red {
  color: red;
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

  font-size: 48px;
  text-align: center;
}
</style>
