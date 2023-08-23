<script lang="ts">
	import { workoutExercises } from '$lib/assets';
	import { started } from '$lib/stores';
	import { formatTime, createFinalWorkoutArray, setTween } from '$lib/functions';
	import { tweened } from 'svelte/motion';
	import type { Tweened } from 'svelte/motion';
	import { Period, WorkoutChoiceButton } from '$lib/components/';

	// define workout
	let chosenWorkout = workoutExercises['isometric'];

	const preWorkoutDuration: number = 0.2;
	const workDuration: number = 0.2;
	const restDuration: number = 0.2;

	const { finalWorkoutArray, totalDuration } = createFinalWorkoutArray(
		chosenWorkout,
		preWorkoutDuration,
		workDuration,
		restDuration
	);

	// tween for total workout
	const totalDurationTween: Tweened<number> = tweened(0, { duration: 0 });

	// define formatted total duration
	$: formattedTotalDuration = formatTime($totalDurationTween);

	// set totalDurationTween duration to totalDuration when started
	$: if ($started) {
		totalDurationTween.set(totalDuration * 1000, { duration: totalDuration * 1000 });
	}

	// define current period
	let currentIndex: number = 0;

	$: currentPeriod = finalWorkoutArray[currentIndex];

	// set tween for current period and then increment currentIndex when tween completes
	export async function setPeriod() {
		currentIndex = await setTween(currentIndex, currentPeriod);
	}

	// set current period when started, or reset when stopped
	$: {
		if ($started && currentPeriod && currentIndex >= 0 && currentIndex < finalWorkoutArray.length) {
			setPeriod();
		}
		if ($started && !currentPeriod) {
			reset();
		}
	}


	// reset workout
	function reset() {
		// set started to false
		started.set(false);
		// reset currentIndex
		currentIndex = 0;
		// reset totalDurationTween
		totalDurationTween.set(0);
	}
</script>

<main>
	<button on:click={() => started.set(true)}>Start</button>
	<button on:click={() => reset()}>Reset</button>

	<p>totalDuration: {totalDuration / 1000} seconds</p>

	{#each finalWorkoutArray as period, index}
		{#if index === currentIndex}
			<Period {...period} />
		{/if}
	{/each}

	<h3>ex list</h3>
	{#each chosenWorkout as exercise}
		<p>{exercise}</p>
	{/each}

	<h4>Total progress</h4>
	<p>{formattedTotalDuration}</p>
	<progress max={totalDuration} value={$totalDurationTween} />

	<WorkoutChoiceButton bind:chosenWorkout />
</main>
