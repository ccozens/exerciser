<!-- script -->
<script lang="ts">
	export let currentIndex = 0;
	export let numberOfPeriods = 0;
</script>

<!-- html -->

{#if currentIndex > 0}
	{#if currentIndex % 2 === 0}
		<p class="modal-progress">{currentIndex / 2 + 1} / {numberOfPeriods / 2}</p>
	{:else}
		<p class="modal-progress">{(currentIndex + 1) / 2} / {numberOfPeriods / 2}</p>
	{/if}
{/if}

<style>
	.modal-progress {
		text-align: center;
		color: var(--text-2);
	}
</style>
