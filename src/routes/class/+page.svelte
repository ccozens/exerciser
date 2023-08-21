<script lang="ts">
	import WorkoutTimer from '$lib/components/WorkoutTimer.svelte';
	import { workouts } from '$lib/assets';
	import { started, currentPeriod, isRest } from '$lib/stores';
	import { createWorkoutArray, appendPreTimer } from './';
	import type {Workout} from './types';

	let workout = workouts.isometric;

	const preWorkoutDuration: number = 5;
	const workDuration: number = 3;
	const restDuration: number = 5;

	const initialWorkoutArray = createWorkoutArray(workout, workDuration, restDuration);

	const finalWorkoutArray = appendPreTimer(initialWorkoutArray, preWorkoutDuration);

	$: console.log(finalWorkoutArray);
	$: console.log(initialWorkoutArray);

	async function startWorkout(finalWorkoutArray: Workout[]) {
		console.log('start workout');
		// construct flat array of objects with label and tween, interpolating exercise and rest periods

		// cycle through periods calling a tween for each
		for (let i = 0; i < finalWorkoutArray.length; i++) {
			console.log(finalWorkoutArray[i].label);
			await finalWorkoutArray[i].tween.set(0);
		}
	}


</script>

<main>
	<p>Hi</p>

	<button on:click={() => startWorkout(finalWorkoutArray)}>Start</button>

	{#each workout as exercise}
		<p>{exercise}</p>
	{/each}
</main>
