<!-- script -->
<script lang="ts">
	import { workoutExercises } from '$lib/assets';
	import { Button } from '$lib/components/';
	import { chosenWorkout } from '$lib/stores';

	export let workoutDisplay: string = 'isometric';

	function setWorkout(workout: string) {
		workoutDisplay = workout;
	}

	function getWorkoutOnClick(workout: string) {
		const workoutLowerCase = workout.toLowerCase();
		chosenWorkout.set(workoutExercises[workoutLowerCase]);
	}
</script>

<!-- html -->

<select bind:value={workoutDisplay}>
	{#each Object.keys(workoutExercises) as workout}
		<option value={workout}>{workout}</option>
	{/each}
</select>

<style>
	select {
		border: none;
		border-radius: var(--radius);
		padding: 0.5rem;
		margin: 0.5rem;
		font-size: 1.5rem;
		background-color: var(--surface-1);
		color: var(--text-1);
		box-shadow: 0 0 1px var(--accent);
		border: solid 1px transparent;
		text-align: center;
		transition: all 0.2s ease-in-out;
	}

	select:hover, button:focus {
        background-color: var(--surface-1);
        color: var(--text-2);
        border: solid 1px var(--accent);
    }
</style>
