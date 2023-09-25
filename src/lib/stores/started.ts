import { writable, derived } from 'svelte/store';

export const started = writable(false);

export const isModalOpen = derived(started, ($started) => {
	return $started;
});
