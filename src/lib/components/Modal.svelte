<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import Portal from './Portal.svelte';
	import { clickOutside } from '$lib/functions';
	// control whether modal open when a component loads
	export let isModalOpen = false;
	export let background = true;

	// function to close modal
	function closeModal() {
		isModalOpen = false;
	}
</script>

{#if isModalOpen}
	<Portal>
		<div
			use:clickOutside
			on:click-outside={closeModal}
			class="modal-wrapper"
			transition:fly={{ opacity: 0, y: 100 }}
		>
			<slot />
			<button class="close-btn" on:click={closeModal} aria-label="Close Modal Box">Close</button>
		</div>
		{#if background}
			<div on:click={closeModal} transition:fade class="background" />
		{/if}
	</Portal>
{/if}

<style>
	.modal-wrapper {
		position: fixed;
		inset: 100px 0 0;
		background-color: white;
		min-width: 320px;
		max-width: 530px;
		margin: 0 auto;
		width: 100%;
		max-height: 250px;
		padding: 2rem;
		border-radius: 0.5rem;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
		z-index: 1000;
	}

	.background {
		position: fixed;
		inset: 0;
		backdrop-filter: blur(10px);
		z-index: 999;
		cursor: pointer;
	}

	.close-btn {
		position: absolute;
		top: 0;
		right: 0;
		padding: 0.5rem;
		border: none;
		background-color: transparent;
		cursor: pointer;
		box-shadow: -3px 3px 3px rgba(0, 0, 0, 0.20);
		border-radius: 0.5rem;
	}
</style>
