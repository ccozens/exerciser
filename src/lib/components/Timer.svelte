<script lang="ts">
	export let interval: number;

	export let time;
    export let timeRemaining;

    // reverse time so functions as a countdown
	$: reversedTime = interval - $time;

    // convert ms to s
    function roundToInteger(ms: number) {
        return Math.floor(ms);
    }

    // format time to display as mm:ss
    function formatTime(duration: number) {
        duration = roundToInteger(duration);
        const minutes = Math.floor(duration / 60);
        if (minutes > 0) {
            return `0${minutes}:${duration}`;
        }
        if(duration < 10)
            return `0${duration}`;
        return `${duration}`;
    }


    $: timeDisplay = formatTime(reversedTime);
</script>

<div class="timer">
    Timer
    {timeDisplay ? timeDisplay : 0}
    timeRemaining: {timeRemaining}
</div>

<style lang="postcss">
</style>
