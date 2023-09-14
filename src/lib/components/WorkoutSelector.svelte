<!-- script -->
<script lang="ts">
	import { workoutExercises } from '$lib/assets';
	import { Button } from '$lib/components/';
	import { chosenWorkout } from '$lib/stores';

	function getWorkoutOnClick(workout: string) {
		const workoutLowerCase = workout.toLowerCase();
		chosenWorkout.set(workoutExercises[workoutLowerCase])
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
