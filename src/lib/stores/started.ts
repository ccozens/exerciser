import { writable, derived } from 'svelte/store';

export const started = writable(false);

// isModalOpen updates when started updates
export const isModalOpen = derived(started, ($started) => $started);
