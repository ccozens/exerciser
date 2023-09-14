<!-- script -->
<script lang="ts">
	import { getWorkout } from '$lib/functions';
	import { workoutExercises } from '$lib/assets';
	import { Button } from '$lib/components/';
	export let chosenWorkout: string[] = workoutExercises['isometric'];

	function getWorkoutOnClick(workout: string) {
		chosenWorkout = getWorkout(workout);
		return chosenWorkout;
	}
</script>

<!-- html -->
{#each Object.keys(workoutExercises) as workout}
	<Button
		text={workout}
		on:click={() => {
			getWorkoutOnClick(workout);
		}}
	/>
{/each}
