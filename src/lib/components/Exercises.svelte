<!-- script -->
<script lang="ts">
	import { chosenWorkout } from '$lib/stores';
</script>

<!-- html -->

<hr />
<div class="exercises">
	{#each $chosenWorkout.exercises as exercise}
		<input value={exercise} />
	{/each}
</div>
<hr />

<style>
	.exercises {
		display: grid;
		place-items: center;
		border-radius: var(--radius);
	}

	hr {
		width: 95%;
		border: none;
		border-top: 1px solid var(--accent);
		margin: 0.3rem;
	}

    input {
		border: none;
		border-radius: var(--radius);
		font-size: 1.5rem;
		background-color: var(--surface-1);
		color: var(--text-1);
		border: solid 1px transparent;
		text-align: center;
		transition: all 0.2s ease-in-out;
	}

	input:hover,
	input:focus,
	input:active {
		color: var(--text-2);
		border: solid 1px var(--accent);
	}
</style>
