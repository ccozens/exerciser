<script lang="ts">
    import { onMount, onDestroy } from 'svelte';

    let workDuration = 60; // Duration of each work period in seconds
    let restDuration = 15; // Duration of each rest period in seconds
    let numPeriods = 5; // Number of work periods

    let currentPeriod = 1; // Current work period
    let timeRemaining = workDuration; // Time remaining in the current period
    let isResting = false; // Flag to indicate if it's a rest period

    let intervalId; // ID of the interval timer

    function startTimer() {
      intervalId = setInterval(() => {
        if (timeRemaining > 0) {
          timeRemaining--;
        } else {
          if (isResting) {
            currentPeriod++;
            if (currentPeriod > numPeriods) {
              clearInterval(intervalId);
            } else {
              timeRemaining = workDuration;
              isResting = false;
            }
          } else {
            timeRemaining = restDuration;
            isResting = true;
          }
        }
      }, 1000);
    }

    function stopTimer() {
      clearInterval(intervalId);
    }

    onMount(() => {
      startTimer();
    });

    onDestroy(() => {
      stopTimer();
    });
  </script>

  <main>
    <h1>Interval Timer</h1>
    <p>Work Period: {currentPeriod}</p>
    <p>Time Remaining: {timeRemaining} seconds</p>
    <p>{isResting ? 'Resting' : 'Working'}</p>
  </main>