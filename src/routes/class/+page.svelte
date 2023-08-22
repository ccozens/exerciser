<script lang="ts">
	import WorkoutTimer from '$lib/components/WorkoutTimer.svelte';
	import { workouts } from '$lib/assets';
	import { started, currentPeriod, isRest } from '$lib/stores';
	import { createWorkoutArray, appendPreTimer } from './';
	import type { Workout } from './types';
	import type { Tweened } from 'svelte/motion';
	import { get } from 'svelte/store';

	let workout = workouts.isometric;

	const preWorkoutDuration: number = 5;
	const workDuration: number = 3;
	const restDuration: number = 5;

	// construct flat array of objects with label and tween, interpolating exercise and rest periods

	const initialWorkoutArray = createWorkoutArray(workout, workDuration, restDuration);

	const finalWorkoutArray = appendPreTimer(initialWorkoutArray, preWorkoutDuration);

	// vars to access in startWorkout
	let period: Workout;
	let duration: number;
	let exercise: string;
	let progress: Tweened<number>;
	let timeRemaining: number;

	// start workout
	export async function startWorkout(finalWorkoutArray: Workout[]) {
		// set started to true
		started.set(true);
		// cycle through periods calling a tween for each
		for (let i = 0; i < finalWorkoutArray.length; i++) {
			period = finalWorkoutArray[i];
			progress = period.tween;
			duration = period.tweenedDuration;
			exercise = period.label;
			await progress.set(0);
		}
		// set started to false
		started.set(false);
	}

	$: console.log($started);
</script>

<main>
	<button on:click={() => startWorkout(finalWorkoutArray)}>Start</button>

	<p>{exercise}</p>

	{#if started}
		<div class="progress-bar">
			<div class="progress" style={`width: ${$progress}%;`} />
		</div>
	{/if}

	<h3>ex list</h3>
	{#each workout as exercise}
		<p>{exercise}</p>
	{/each}
</main>
