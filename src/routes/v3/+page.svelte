<!-- script -->
<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { reset } from '$lib/functions/Reset';
	import { currentPeriod, isRest, started } from '$lib/stores';
	import Timer from './Timer.svelte';

	let interval = 10 * 1000; // set seconds. Note defaults to ms and setInterval fixes
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
	const isometric = ['Wall sit', 'Plank', 'Chair squat', 'GLute bridge', 'Side plank'];
	const movement = ['Push up', 'Squat', 'Lunge', 'Tricep dip', 'Burpee'];

	// variables
	// rest period length (seconds)
	let rest: number = 2;
	// work period length (seconds)
	let work: number = 5;
	// number of work periods
	let numberOfPeriods: number = 5;

	// interval timer
	const workoutTimer = (rest: number, work: number, numberOfPeriods: number) => {
		// abort if not started
		if (!isStarted) return;

		for (let i = 0; i < numberOfPeriods; i++) {
			// if !isRest, increment currentPeriod and set tweened time to work
			if (!$isRest) {
				console.log('working start', 'period: ', $currentPeriod, 'isRest: ', $isRest);
				currentPeriod.set($currentPeriod + 1);
				timer.set(work, { duration: work });
				toggleRest();
				console.log('working end', 'period: ', $currentPeriod, 'isRest: ', $isRest);
			}
			// if isRest, set tweened time to rest * 100
			if ($isRest) {
				console.log('resting start', 'period: ', $currentPeriod, 'isRest: ', $isRest);

				timer.set(rest, { duration: rest });
				toggleRest();
				console.log('resting end', 'period: ', $currentPeriod, 'isRest: ', $isRest);
			}
		}
		reset();
	};

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
		workoutTimer(rest, work, numberOfPeriods);
	}


</script>

<main>
	<!-- <Timer {interval} {timer} /> -->

	{#if $currentPeriod && $currentPeriod < numberOfPeriods}
		<Timer {interval} {timer} />
		{#if isRest}
			<h1>Rest</h1>
		{:else}
			<h1>Work</h1>
		{/if}
	{:else}
		<button on:click={setStarted}>Start workout</button>
	{/if}

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
	.progress-wrapper {
		width: 20vw;
		height: 20vh;
		background-color: #ccc;
		border-radius: 10px;
		overflow: hidden;
	}
	.progress-bar {
		border-radius: 10px;
		transition: height 0.1s ease-in-out;
		background: linear-gradient(
			rgba(2, 0, 36, 1) 0%,
			rgba(9, 9, 121, 1) 35%,
			rgba(0, 212, 255, 1) 100%
		);
	}

	progress {
	}
</style>
