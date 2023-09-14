<script lang="ts">
	import { workoutExercises } from '$lib/assets';
	import { started } from '$lib/stores';
	import type { Workout } from '$lib/types';
	import { formatTime, createFinalWorkoutArray, setTween } from '$lib/functions';
	import { tweened } from 'svelte/motion';
	import type { Tweened } from 'svelte/motion';
	import { Period, WorkoutChoiceButton, ProgressBar } from '$lib/components/';

	// define workout and update when chosenWorkout changes
	let defaultWorkout: string[] = workoutExercises['isometric'];
	$: chosenWorkout = workoutExercises['isometric'];

	const preWorkoutDuration: number = 4;
	const workDuration: number = 5;
	const restDuration: number = 1;

	// create finalWorkoutArray and totalDuration, and update when chosenWorkout changes
	$: finalWorkoutArray = createFinalWorkoutArray(
		chosenWorkout || defaultWorkout,
		restDuration,
		workDuration,
		preWorkoutDuration
	);

	// calculate total duration of workout (in ms)
	$: totalDuration = finalWorkoutArray.reduce((acc, curr) => acc + curr.tweenedDuration, 0);
	// tween for total workout
	const totalDurationTween: Tweened<number> = tweened(0, { duration: 0 });
		$: tweenedProgress = $totalDurationTween / totalDuration;
	// define formatted total duration
	$: formattedCurrentTime = formatTime($totalDurationTween);
	$: formattedTotalDuration = formatTime(totalDuration);

	// set totalDurationTween duration to totalDuration when started
	$: if ($started) {
		totalDurationTween.set(totalDuration * 1000, { duration: totalDuration * 1000 });
	}

	// define current period
	let currentIndex: number = 0;
	let nextPeriod: Workout;
	let nextLabel: string = '';

	$: currentPeriod = finalWorkoutArray[currentIndex];
	$: if (currentIndex < finalWorkoutArray.length-1) {
		nextPeriod = finalWorkoutArray[currentIndex + 1];
		nextLabel = nextPeriod.label;
	}

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

	{#each finalWorkoutArray as period, index}
		{#if index === currentIndex}
			<Period {...period} {nextLabel} />
		{/if}
	{/each}

	<h3>ex list</h3>
	{#each chosenWorkout as exercise}
		<p>{exercise}</p>
	{/each}

	<h4>Total progress</h4>
	<p>{formattedCurrentTime} / { formattedTotalDuration }</p>

	<!-- rotated so progress bar goes right way, meaning width is height and vice versa -->
	<ProgressBar
		--wrapper-width="90vw"
		--wrapper-height="5vh"
		direction="width"
		{tweenedProgress} />

	<WorkoutChoiceButton bind:chosenWorkout />
</main>

<style lang="postcss">


</style>
