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

	$: clickOutsideProps = {
		'on:click-outside': closeModal,
		class: 'modal-wrapper'
	};
</script>

{#if isModalOpen}
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
		inset: 100px 0 0;
		background-color: var(--surface-1);
		min-width: 320px;
		max-width: 530px;
		margin: 0 auto;
		width: 100%;
		max-height: 250px;
		padding: 2rem;
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

</style>
