<script lang="ts">
	// dispatch an event to start the session on click
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	// dispatch an event to start the session on click
	function startSession() {
		dispatch('startSession');
	}
</script>

<button on:click={startSession}> Start</button>
