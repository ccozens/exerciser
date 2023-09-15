<script lang="ts">
	import { chosenWorkout, started, workoutInfo } from '$lib/stores';
	import { finish } from '$lib/assets/';
	import { formatTime, createFinalWorkoutArray, setTween } from '$lib/functions';
	import { tweened } from 'svelte/motion';
	import type { Tweened } from 'svelte/motion';
	import { Button, Period, WorkoutSelector, ProgressBar } from '$lib/components/';

	// define workout
	$: finalWorkoutArray = $workoutInfo.finalWorkoutArray;
	// define total duration
	$: totalDuration = $workoutInfo.totalDuration;

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
	$: currentIndex = 0;
	$: currentPeriod = finalWorkoutArray[currentIndex];
	$: nextPeriod = finish ?? finalWorkoutArray[currentIndex + 1];
	$: nextLabel = nextPeriod.label;

	$: if (currentIndex < finalWorkoutArray.length - 1) {
		nextPeriod = finalWorkoutArray[currentIndex + 1];
		nextLabel = nextPeriod.label;
	}

	// set tween for current period and then increment currentIndex when tween completes
	export async function setPeriod() {
		currentIndex = await setTween(currentIndex, currentPeriod);
	}

	async function resetPeriod() {
		currentIndex = await setTween(0, finalWorkoutArray[0]);
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

	// start workout
	function setStarted() {
		started.set(true);
	}
	// reset workout
	async function reset() {
		// set started to false
		started.set(false);
		await resetPeriod();
		// reset totalDurationTween
		totalDurationTween.set(0, { duration: 0 });
		// reset currentIndex
		currentIndex = 0;
		// reset currentPeriod
		currentPeriod = finalWorkoutArray[currentIndex];
		// reset nextPeriod
		nextPeriod = finalWorkoutArray[currentIndex + 1];
	}
	$: workoutDisplay = 'isometric';

	function handleKeydown(event: KeyboardEvent) {
		if (event.key !== ' ' && event.key !== 'Escape') return;
		if (event.key === ' ') {
			setStarted();
		}
		if (event.key === 'Escape') {
			reset();
		}
	}
</script>

<main>
	{#if $started}
		<!-- display current exercise and progress bar -->
		{#each finalWorkoutArray as period, index}
			{#if index === currentIndex}
				<Period {...period} {nextLabel} />
			{/if}
		{/each}
		<!-- workout progress -->
		<h4>Total progress</h4>
		<p>{formattedCurrentTime} / {formattedTotalDuration}</p>

		<!-- rotated so progress bar goes right way, meaning width is height and vice versa -->
		<ProgressBar
			--wrapper-width="90vw"
			--wrapper-height="5vh"
			direction="width"
			{tweenedProgress}
		/>
	{/if}

	<h1>Interval exerciser</h1>

	<h3><span class="capitals">{workoutDisplay}</span> workout</h3>
	<p>Duration: {formattedTotalDuration}</p>
	{#each $chosenWorkout as exercise}
		<p class="exercise">{exercise}</p>
	{/each}

	<div class="buttons">
		<WorkoutSelector bind:workoutDisplay />
		<div class="controls">
			<Button text="Start" on:click={setStarted} />
			<Button text="Reset" on:click={reset} />
		</div>
	</div>
</main>

<svelte:window on:keydown={handleKeydown} />

<style lang="postcss">
	.capitals {
		text-transform: capitalize;
	}

	main {
		display: grid;
		place-items: center;
	}

	.exercise {
		margin: 0.5rem;
	}

	.buttons {
		display: grid;
		    place-items: center;
			gap: 1rem;
	}
</style>
