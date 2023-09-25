<!-- script -->
<script lang='ts'>
    import { started, workoutInfo } from '$lib/stores';
	import { finish } from '$lib/assets/';
    import { setTween, reset } from '$lib/functions';
    import type { Workout } from '$lib/types';
    import { CurrentPeriodNumber, Period } from '$lib/components/';

    	// define workout
	$: finalWorkoutArray = $workoutInfo.finalWorkoutArray;
    // number of periods
	$: numberOfPeriods = finalWorkoutArray.length;

    	// define current period
	let currentIndex: number = 0;
	let nextLabel: string = '';
	$: {
		const currentPeriod = finalWorkoutArray[currentIndex];
		const nextPeriod =
			finalWorkoutArray[currentIndex + 1] === undefined
				? finish
				: finalWorkoutArray[currentIndex + 1];
		nextLabel = nextPeriod.label;

		if ($started && currentPeriod && currentIndex >= 0 && currentIndex < numberOfPeriods) {
			setTween(currentIndex, currentPeriod).then((index) => {
				currentIndex = index;
			});
		}
		if ($started && currentIndex === numberOfPeriods) {
			reset();
		}
	}
</script>

<!-- html -->

<CurrentPeriodNumber {currentIndex} {numberOfPeriods} />
{#each finalWorkoutArray as period, index}
    {#if index === currentIndex}
        <Period {...period} {nextLabel} />
    {/if}
{/each}