import type { Tweened } from 'svelte/motion';

export async function setTween(
  currentIndex: number,
  period: { tweenedDuration: number; tween: Tweened<number> } | undefined
): Promise<number> {
  if (!period) {
    return currentIndex;
  }

  // tween
  await period.tween.set(period.tweenedDuration, { duration: period.tweenedDuration });

  // increment currentIndex
  return currentIndex + 1;
}