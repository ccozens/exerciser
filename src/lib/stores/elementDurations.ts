import { writable } from 'svelte/store';

export const preWorkoutDuration = writable(1000);
export const workDuration = writable(5);
export const restDuration = writable(1);
