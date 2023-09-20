<!-- script -->
<script lang="ts">
	import { workDuration, restDuration } from '$lib/stores';
</script>

<!-- html -->
<div class="durationEditor">
		<label for="workDuration">Work:</label>
		<input type="number" min="1" max="120" step="1" bind:value={$workDuration} />
		<label for="restDuration">Rest:</label>
		<input type="number" min="1" max="30" step="1" bind:value={$restDuration} />
</div>

<style>
	.durationEditor {
		margin: 0 0.5rem;
		box-shadow: 0 0 1px var(--accent);
		border-radius: var(--radius);
		padding: 0.5rem;
		display: grid;
        grid-template-columns: 1fr 1fr;
	}
	label {
		font-size: 1.5rem;
		color: var(--text-1);
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
	input:focus {
		background-color: var(--surface-1);
		color: var(--text-2);
		border: solid 1px var(--accent);
	}

	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>
