<!-- script -->
<script lang="ts">
	import { currentPeriod, isRest, started } from '$lib/stores';
	import Start from '$lib/components/Start.svelte';
	import Stop from '$lib/components/Stop.svelte';
    import { reset } from '$lib/functions/Reset';
    import { tick } from 'svelte';
    import { tweened } from 'svelte/motion';

    let interval: number ; // MDN: "The returned intervalID is a numeric, non-zero value which identifies the timer created by the call to setInterval(); this value can be passed to WindowOrWorkerGlobalScope.clearInterval() to cancel the timeout."
    let rest: number = 2;
    let work: number = 5;
    let numberOfPeriods: number = 5;

    const workMs = work * 1000;
    const restMs = rest * 1000;

    // run workout using tweened
    async function tweenedWorkout (rest: number, work: number, numberOfPeriods: number) {
        // abort if not started
        if (!isStarted) return;
        for (let i = 0; i < numberOfPeriods; i++) {
        // if !isRest, increment currentPeriod and set tweened time to work * 100
        if (!$isRest) {
            currentPeriod.set($currentPeriod + 1);
            await time.set(workMs, { duration: workMs });
            time.set(0, {duration: 0});
            toggleRest();
            console.log('working', $currentPeriod, $isRest);
        }
        // if isRest, set tweened time to rest * 100
        if ($isRest) {
            await time.set(restMs, { duration: restMs });
            time.set(0, {duration: 0});
            toggleRest();
            console.log('resting', $currentPeriod, $isRest);
        }}
        // run reset when exit loop:
        reset();
     /*    // if currentPeriod === numberOfPeriods, reset
        if ($currentPeriod === numberOfPeriods) {
            reset();
        } */
    }

    // toggle isRest
    function toggleRest() {
        isRest.set(!$isRest);
        // $isRest === "Work" ? isRest.set("Rest") : isRest.set("Work");
    }
	// function to update started store
	function setStarted() {
		started.set(true);
	}
	$: isStarted = $started;
	// run timer if started
	$: if (isStarted) {
		tweenedWorkout(rest, work, numberOfPeriods);
	}

      // use tweened to create timer with rest and work intervals, depending on isRest
      const time = tweened(isRest? restMs : workMs);

      // convert time to seconds
      $: timeInSeconds = Math.round($time / 1000); // TODO should be *1000 but shortened so dev quicker
      // convert to countdown
        $: countdown = isRest ? rest - timeInSeconds : work - timeInSeconds;
</script>

<!-- html -->

    <div>Current Period: {$currentPeriod}</div>
        <div>Time Remaining: {timeInSeconds}</div>
        <div>Countdown: {countdown}</div>
    <div>Is Rest: {$isRest ? 'true' : 'false'}</div>
    <div>Started: {$started}</div>


<Start on:startSession={setStarted} />
emits startSession on click
<Stop />
runs reset to stop timer and reset values
