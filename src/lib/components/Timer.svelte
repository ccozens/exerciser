<script lang="ts">
	export let interval: number;

	export let time;

	// reverse time so functions as a countdown
	$: reversedTime = interval - $time;

	// round to whole seconds
	$: seconds = Math.floor(reversedTime);
</script>

{#if interval > 0}
	<div class="timer">
		{seconds ? seconds : 0}
	</div>
{/if}

<style lang="postcss">
</style>
