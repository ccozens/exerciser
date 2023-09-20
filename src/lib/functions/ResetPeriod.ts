import type { Workout } from "$lib/types";
import { setTween } from "./SetTween";

export 	async function resetPeriod(currentIndex: number, finalWorkoutArray: Workout[]) {
    currentIndex = await setTween(0, finalWorkoutArray[0]);
    return currentIndex;
}