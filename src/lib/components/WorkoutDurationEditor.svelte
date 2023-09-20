<!-- script -->
<script lang='ts'>
    	import { workDuration, restDuration, chosenWorkout } from '$lib/stores';

</script>

<!-- html -->
<div class="durationEditor">
	<label for="workDuration">Work:</label>
	<input type="number" min="1" max="60" step="1" bind:value={$workDuration} />
	<label for="restDuration">Rest:</label>
	<input type="number" min="1" max="60" step="1" bind:value={$restDuration} />
</div>