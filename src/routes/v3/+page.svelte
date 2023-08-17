<!-- script -->
<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { reset } from '$lib/functions/Reset';
	import { currentPeriod, isRest, started } from '$lib/stores';
	import Timer from './Timer.svelte';

	let timer = tweened(0);

	// set started to true if false
	const start = () => {
		if ($started) return;
		if(!$started) {$started = true}
	};

	// set started to false if true
	const stop = () => {
		if (!$started) return;
		if($started) {$started = false}
	};

	// workouts
	const isometric = ['Wall sit', 'Plank', 'Chair squat', 'Glute bridge', 'Side plank'];
	const movement = ['Push up', 'Squat', 'Lunge', 'Tricep dip', 'Burpee'];

	// variables
	// rest period length (seconds)
	let rest: number = 2;
	// work period length (seconds)
	let work: number = 1;
	// work milliseconds
	$: workMs = work * 1000;
	// rest milliseconds
	$: restMs = rest * 1000;
	// define interval for calculating progress bar
	$: interval = $isRest ? restMs : workMs;
	// number of work periods
	let numberOfPeriods: number = 5;

	// interval timer
	async function workoutTimer(interval: number, numberOfPeriods: number) {
		// abort if not started
		if (!isStarted) return;
		console.log('fn started: ', $currentPeriod, $isRest, $started, interval);
		// create intervalTimer
		let  intervalTimer ;

		// cycle through numberOfPeriods loops of work and rest
		if ($currentPeriod < numberOfPeriods) {
			console.log('in loop: ', $currentPeriod, $isRest, $started, interval);
			intervalTimer = setInterval(() => {
				if ($currentPeriod < numberOfPeriods) {
					timer.set(interval, { duration: interval });
					toggleRest();
					// iterate currentPeriod if a work period
					if (!$isRest)
					{$currentPeriod = $currentPeriod + 1}
				}
			},
			// call again at interval timing
			interval);
		}
		// when currentPeriod reaches numberOfPeriods, cancel timer
		clearInterval(intervalTimer);
	}

	// toggle isRest
	function toggleRest() {
		isRest.set(!$isRest);
	}
	function zeroTimer() {
		timer.set(0);
	}
	// function to update started store
	function setStarted() {
		started.set(true);
	}
	$: isStarted = $started;
	// run timer if started
	$: if (isStarted) {
		workoutTimer(interval, numberOfPeriods);
	}
</script>

<main>
	<Timer {interval} {timer} />
	current period: {$currentPeriod}

	<button on:click={setStarted}>Start workout</button>

	<div class="buttons">
		<button on:click={reset}>Reset workout</button>
		<button on:click={start}>Start</button>
		<button on:click={stop}>Stop</button>
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 95vh;
	}
	.buttons {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
</style>
