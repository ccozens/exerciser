<!-- script -->
<script lang="ts">
	import { getWorkout } from '$lib/functions';
	import { workoutExercises } from '$lib/assets';

	export let chosenWorkout: string[] = workoutExercises['isometric'];

	function getWorkoutOnClick(workout: string) {
		chosenWorkout = getWorkout(workout);
	}
</script>

<!-- html -->
{#each Object.keys(workoutExercises) as workout}
	<button
		on:click={() => {
			getWorkoutOnClick(workout);
		}}>{workout}</button
	>
{/each}
