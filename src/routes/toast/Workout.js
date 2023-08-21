import { writable } from "svelte/store";

const newTimer = (exercise) => {
    const { subscribe, set, update } = writable(0);




    function timer (exercise = {}) {
        const { name, duration, type } = exercise;
        set(duration);
        const interval = setInterval(() => {
            update((n) => {
                if (n === 0) {
                    clearInterval(interval);
                    return duration;
                }
                return n - 1;
            });
        }, 1000);
    }

    return {
        start : timer,
        subscribe,
        reset: () => set(0),
        increment: () => update((n) => n + 1),
    };
    }

    export const timer = newTimer();