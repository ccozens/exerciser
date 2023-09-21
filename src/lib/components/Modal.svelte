<script lang="ts">
	import { ScreenWakeLock } from 'svelte-screen-wake-lock';
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

	$: clickOutsideProps = {
		'on:click-outside': closeModal,
		class: 'modal-wrapper'
	};
</script>

{#if isModalOpen}
	<ScreenWakeLock />
	<Portal>
		<div
			use:clickOutside
			{...clickOutsideProps}
			class="modal-wrapper"
			transition:fly={{ opacity: 0, y: 100 }}
		>
			<slot />
		</div>
		{#if background}
			<div on:click={closeModal} transition:fade class="background" />
		{/if}
	</Portal>
{/if}

<style>
	.modal-wrapper {
		position: fixed;
		inset: 5vh 0 0;
		background-color: var(--surface-1);
		width: 80vw;
		height: 90vh;
		margin: 0 auto;
		padding: 1.5rem 2.5rem 3rem 2.5rem;
		border-radius: var(--radius);
		box-shadow: 0 0 10px var(--accent);
		z-index: 1000;
	}

	.background {
		position: fixed;
		inset: 0;
		backdrop-filter: blur(10px);
		z-index: 999;
		cursor: pointer;
	}

	@media (min-width: 700px) {
		.modal-wrapper {
			height: 85vh;
		}
	}
	@media (min-width: 1000px) {
		.modal-wrapper {
			inset: 100px 0 0;
			width: 35vw;
			height: 40vh;
			padding: 3rem 3rem 5rem 3rem;
		}
	}
</style>
