<script lang="ts">
	import { workouts } from '$lib/assets';
	import { started } from '$lib/stores';
	import { createWorkoutArray, appendPreTimer } from './';
	import type { Workout } from './types';
	import { tweened } from 'svelte/motion';
	import type { Tweened } from 'svelte/motion';
	import { get } from 'svelte/store';
	import { startWorkout } from './StartWorkout';
	import { formatTime } from '$lib/functions';
	import Period from './Period.svelte';

	let workout = workouts.isometric;

	const preWorkoutDuration: number = 1;
	const workDuration: number = 3;
	const restDuration: number = 2;

	// construct flat array of objects with label and tween, interpolating exercise and rest periods

	const initialWorkoutArray = createWorkoutArray(workout, workDuration, restDuration);

	// append preWorkoutDuration to workoutArray
	const finalWorkoutArray = appendPreTimer(initialWorkoutArray, preWorkoutDuration);
	console.log(finalWorkoutArray);
	// calculate total duration of workout (in ms)
	const totalDuration = finalWorkoutArray.reduce((acc, curr) => acc + curr.tweenedDuration, 0);

	// tween for total workout
	const totalProgress: Tweened<number> = tweened(0, { duration: 0 });

	$: if ($started) {
		totalProgress.set(totalDuration * 1000, { duration: totalDuration * 1000 });
	}

	$: formattedTotalDuration = formatTime($totalProgress);

	// define current period
	let currentIndex: number = 0;

	// $: currentIndex = Math.floor($totalProgress / 1000);
	$: currentPeriod = finalWorkoutArray[currentIndex];
	// $: currentPeriod = finalWorkoutArray.find((period) => period.label === label);

	$: ({ label, tweenedDuration, tween } = currentPeriod || {});

	$: {
		if ($started) {
			currentIndex;
		}
	}
	// define current period progress
	$: {
		if ($started && currentPeriod) {
			setTween(tweenedDuration, tween);
		}
	}

	async function setTween(tweenedDuration: number, tween: Tweened<number>) {
		// tween
		await tween.set(tweenedDuration, { duration: tweenedDuration });
		// increment currentIndex
		currentIndex++;
	}
	$: console.log($started);
</script>

<main>
	<button on:click={() => started.set(true)}>Start</button>

	<p>totalDuration: {totalDuration / 1000} seconds</p>

	{#each finalWorkoutArray as period, index}
		{#if index === currentIndex}
			<Period {...period} bind:currentIndex />
		{/if}
	{/each}

	<h3>ex list</h3>
	{#each workout as exercise}
		<p>{exercise}</p>
	{/each}

	<h4>Total progress</h4>
	<p>{formattedTotalDuration}</p>
	<progress max={totalDuration} value={$totalProgress} />
</main>
