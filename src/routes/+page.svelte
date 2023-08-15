<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Timer from '$lib/components/Timer.svelte';
	import { currentPeriod, isRest, started, time } from '$lib/stores';
	import Start from '$lib/components/Start.svelte';

    const interval: number = 1000;
	const numberOfPeriods: number = 5;

    let timeRemaining = interval; // Time remaining in the current period

    function startTimer(interval: number) {
        // if not started, return
        if (!started) return;

        // check timerRemaining > 0 and decrement 1 if so
        const intervalId = setInterval(() => {
            if (timeRemaining > 0) {
                timeRemaining--;
            }
                // in else branch, timeRemaining = 0
             else {
                if (!$isRest) { // if isRest is false, ie working, increment current period, set timeRemaining to interval and isRest to true
                    console.log('if1 start', $currentPeriod, $isRest);
                    timeRemaining = interval;
                    // if isRest, increment currentPeriod
                    currentPeriod.set($currentPeriod + 1);
                    isRest.set(true);
                    console.log('if1 end', $currentPeriod, $isRest);

                    if ($currentPeriod === 5) { // if currentPeriod = 5, finish
                        console.log('if2', $currentPeriod, $isRest);
                        clearInterval(intervalId);
                        finish();
                        return ;
                    }
                } else { // if isRest is true, ie resting, set timeRemaining to interval/5 and isRest to false
                    console.log('else', $currentPeriod, $isRest);
                    timeRemaining = interval;
                    isRest.set(false);
                }
            }
        });
    }


	function setStarted() {
		started.set(true);
	}

	function finish() {
		started.set(false);
		console.log('finished');
	}

	async function workoutRunning(rest: number, work: number, numberOfPeriods: number) {
		while ($currentPeriod < numberOfPeriods) {
			// return if not started
			if (!started) return;
			// check if rest and set 15 s timer
			if ($isRest) {
                startTimer(rest);
				isRest.set(false);
			}
			// check if work and if currentPeriod < 5and set 60 s timer
			if (!$isRest && $currentPeriod < 5) {
				startTimer(work);
				currentPeriod.set($currentPeriod + 1);
				console.log('internal', $currentPeriod, $isRest);
				isRest.set(true);
				console.log('internal', $isRest);
			}
			// check if work and if currentPeriod = 5 and finish
			if (!$isRest && $currentPeriod === 5) {

				finish();
			}

		}
	}

	// reset
    function reset() {
        started.set(false);
        currentPeriod.set(0);
        isRest.set(false);
        timeRemaining = interval;
    }

	// call startWorkout when started=true
	$: sessionStarted = $started;
	$: if (sessionStarted) {
		// startTimer(interval / 5, interval, numberOfPeriods);
		startTimer(5);
	}

	$: console.log($currentPeriod);
</script>

<Start on:startSession={setStarted} />
<!-- here for dev, not sure I want -->
<button on:click={reset}>Stop</button>

<Timer {timeRemaining} {interval} {time} />

<p>
	currentPeriod:
	{$currentPeriod}
</p>
<p>
	isRest:
	{$isRest}
</p>
