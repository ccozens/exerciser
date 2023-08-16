<!-- script -->
<script lang="ts">
	import { tweened } from 'svelte/motion';


	export let interval: number = 1;
    $: intervalSeconds = interval / 1000;

    export let timer = tweened(0, {duration: interval});

	// $timer is the tweened value
	$: seconds = timer ? Math.floor($timer / 1000) : 0;
	$: countdownSeconds = intervalSeconds - seconds;

    $: height = $timer / interval;

</script>

	<div class="progress-wrapper">
		<div class="progress-bar" style="height: {($timer / interval) * 100}%" />
	</div>

    <p>{height.toFixed(2)}</p>
	<p>{countdownSeconds}</p>

<style>

	.progress-wrapper {
		width: 20vw;
		height: 20vh;
		background-color: #ccc;
		border-radius: 10px;
		overflow: hidden;
	}
	.progress-bar {
		border-radius: 10px;
		transition: height 0.1s ease-in-out;
		background: linear-gradient(
			rgba(2, 0, 36, 1) 0%,
			rgba(9, 9, 121, 1) 35%,
			rgba(0, 212, 255, 1) 100%
		);
	}


</style>
