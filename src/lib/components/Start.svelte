<script lang="ts">
    // dispatch an event to start the session on click
    import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{
		startSession: null; // startSession param with no payload
	}>();
</script>

<button on:click={() => dispatch('startSession')}> Start</button>
