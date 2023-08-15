<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Timer from '$lib/components/Timer.svelte';
	import { currentPeriod, isRest, started } from '$lib/stores';
	import Start from '$lib/components/Start.svelte';
	import { tweened } from 'svelte/motion';
    import { tick } from 'svelte';

    const interval: number = 5;
	const numberOfPeriods: number = 5;

	// tweened variable to count down from interval seconds
	const time = tweened(0);

	// start the timer, converting interval to ms
	async function startTimer(duration: number = 0) {
		time.set(0);
		time.set(duration, {
			duration: duration * 1000
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
            await time.set(0);
                await startTimer(rest);
				isRest.set(false);

			}
			// check if work and if currentPeriod < 5and set 60 s timer
			if (!$isRest && $currentPeriod < 5) {
                await time.set(0);
				await startTimer(work);
				currentPeriod.set($currentPeriod + 1);
				console.log('internal', $currentPeriod, $isRest);
				isRest.set(true);
				console.log('internal', $isRest);
			}
			// check if work and if currentPeriod = 5 and finish
			if (!$isRest && $currentPeriod === 5) {
            await time.set(0);

				finish();
			}

		}
	}

	/* 	// function to start workout
	function startWorkout(rest: number, work: number, numberOfPeriods: number) {
		$started = true;
		while ($currentPeriod < numberOfPeriods) {
			workoutRunning(rest, work);
		}
	} */

	// call startWorkout when started=true
	$: sessionStarted = $started;
	$: if (sessionStarted) {
		workoutRunning(interval / 5, interval, numberOfPeriods);
	}

	$: console.log($currentPeriod);
</script>

<Start on:startSession={setStarted} />
<!-- here for dev, not sure I want -->
<button on:click={() => started.set(false)}>Stop</button>

<Timer {interval} {time} />

<p>
	currentPeriod:
	{$currentPeriod}
</p>
<p>
	isRest:
	{$isRest}
</p>
