<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	let wakeLock: WakeLockSentinel | null = null;

	onMount(() => {
		if (browser && 'wakeLock' in navigator) {
			navigator.wakeLock.request('screen').then((wl) => {
				wakeLock = wl;
			});
		}
	});

	function releaseWakeLock() {
		if (wakeLock) {
			wakeLock.release();
			wakeLock = null;
		}
	}
</script>

{#if browser && 'wakeLock' in navigator}
	<button on:click={releaseWakeLock}>Release Wake Lock</button>
{/if}
