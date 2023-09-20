import { writable } from 'svelte/store';

export const preWorkoutDuration = writable(10);
export const workDuration = writable(60);
export const restDuration = writable(15);
