import type {Tweened} from "svelte/motion";
import { get } from "svelte/store";

export function pause(store: Tweened<number>) {
    const value = get(store);
    return store.set(value, {duration: 0});
}

export function resume(store: Tweened<number>, duration: number) {
    const value = get(store);
    const amountCompleted = value / duration;
    return store.set(duration, {duration: duration * (1 - amountCompleted)});
}