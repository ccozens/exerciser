import type { Tweened } from "svelte/motion";

export interface Workout {
    label: string;
    tween: Tweened<number>;
}