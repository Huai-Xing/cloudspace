<template>
<div>
  <br>
  <h2 class="timer-title"> {{title}} </h2>

  <div class="timer-container">
    <svg class="timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g class="timer__circle">
        <circle class="timer__path-elapsed" cx="50" cy="50" r="45"></circle>
        <circle class="timer__inner-circle" cx="50" cy="50" r="35.5"></circle>
        <path id="test"
          :stroke-dasharray="circleDasharray"
          class="timer__path-remaining"
          :class="remainingPathColor"
          d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,1 90,0
            a 45,45 0 1,1 -90,0
          ">
        </path>
      </g>
    </svg>

    <!-- to show the remaining time in the timer -->
    <span class="timer__label"> {{ formattedTimeUsed }} <br> elapsed </span>
  </div>

  <br><br>

  <div id="buttons">
    <!-- Timer completes -->
    <button id="done" class="timerControlledBtns" @click="doneTimer()">
        <img src="../assets/timer/done_icon.png" alt="timerDone" height = "18px" width="18px"/>
    </button>

    &nbsp; <!-- for extra spacing between the buttons -->

    <!-- Pause Timer -->
    <button id="pause" class="timerControlledBtns" @click="contdPlayTimer()">
        <img src="../assets/timer/contdPlay_icon.png" alt="timerPause" height = "18px" width="18px"/>
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

const COLOR_CODES = {
  info: {
    color: "red",
  },
};

// To change here to bind to the actual data
const TIME_IN_SEC= 10; // dummy timing value start from 0 for testing at the moment

export default {
  data() {
    return {
      timePassed: 0, /* To store the amount of time (in sec) that has passed */
      timerInterval: null,
      totalTimePassed: 0,
      title: "Break time!",
      coinsToEarn: 0,
    };
  },

  computed: {
    formattedTimeUsed() {
      const currentTimeUsed = TIME_IN_SEC - this.timeUsed; // time is originally stored in totalSecs
      const timeUsed = currentTimeUsed + this.totalTimePassed;

      let hours = Math.floor(timeUsed / 3600);
      let minutes = Math.floor((timeUsed % 3600) / 60); // remaining mins
      let seconds = Math.floor((timeUsed % 3600) % 60); // remaining sec

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
      return `${hours}:${minutes}:${seconds}`;
    },

    timeUsed() {
      if (this.timePassed == TIME_IN_SEC) {
        this.resetTIMEPASSED();
        return TIME_IN_SEC;
      } else {
        return TIME_IN_SEC - this.timePassed;
      }
    },

    // Update the dasharray value as time passes, starting with 283
    circleDasharray() { // To animate the ring arc length of the remaining time line with the 'stroke-dasharray' in <path>
      //return `${(this.timeFraction * FULL_DASH_ARRAY).toFixed(0)} 283`;
      return `${((1- this.timeFraction) * FULL_DASH_ARRAY).toFixed(0)} 283`;
    },

    timeFraction() {
      // Divides time used by the defined time limit
      const rawTimeFraction = this.timeUsed / TIME_IN_SEC;
      // reducing the length of the ring gradually during the countdown
      return rawTimeFraction - (1 / TIME_IN_SEC) * (1 - rawTimeFraction);
    },

    remainingPathColor() {
      const { info } = COLOR_CODES;
      return info.color;
    }

  },

  watch: {
    timeUsed(newValue) {
      if (newValue === 0) {
        this.onTimesUp();
      }
    }
  },

  mounted() { // to start the timer immediately when the component gets mounted
    this.startTimer();
  },

  methods: {
    resetTIMEPASSED: function() {
      this.timePassed = 0;
      this.totalTimePassed = TIME_IN_SEC + this.totalTimePassed;
    },
    onTimesUp: function() {
      clearInterval(this.timerInterval);
    },

    // Fn that increase the value of timePassed by 1unit per sec and recompute the timeUsed value
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

    contdPlayTimer: function() {

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
  fill: #F27D84;
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

.timer__path-remaining.red {
  color: #F27D84;
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
