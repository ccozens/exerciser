<!-- script -->
<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { reset } from '$lib/functions/Reset';
	import { currentPeriod, isRest, started } from '$lib/stores';
	import Timer from './Timer.svelte';

	let timer = tweened(0);

	const start = () => {
		timer.set(interval, {
			duration: interval
		});
	};

	const stop = () => {
		timer.set(0);
	};

	// workouts
	const isometric = ['Wall sit', 'Plank', 'Chair squat', 'Glute bridge', 'Side plank'];
	const movement = ['Push up', 'Squat', 'Lunge', 'Tricep dip', 'Burpee'];

	// variables
	// rest period length (seconds)
	let rest: number = 0.5;
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

		let i = 0;
		const timerInterval = setInterval(async () => {
			if (!$isRest) {
				console.log(
					'working start',
					'period: ',
					$currentPeriod,
					'isRest: ',
					$isRest,
					'work interval: ',
					interval
				);
				await setTimer(interval);
				console.log('working end', 'period: ', $currentPeriod, 'isRest: ', $isRest);
			}
			if ($isRest) {
				console.log(
					'resting start',
					'period: ',
					$currentPeriod,
					'isRest: ',
					$isRest,
					'rest interval',
					interval
				);
				await setTimer(interval);
				console.log('resting end', 'period: ', $currentPeriod, 'isRest: ', $isRest);
			}
			toggleRest();

			if (i === numberOfPeriods - 1) {
				clearInterval(timerInterval); // Stop the interval
				reset();
			} else {
				currentPeriod.set($currentPeriod + 1);
				i++;
			}
		}, interval);
	}

	async function setTimer(interval: number) {
		await timer.set(interval, { duration: interval });
		timer.set(0);
	}
	// toggle isRest
	function toggleRest() {
		isRest.set(!$isRest);
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
	<!-- <Timer {interval} {timer} /> -->
	<Timer {interval} {timer} />
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
