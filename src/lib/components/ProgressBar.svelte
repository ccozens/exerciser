<!-- script -->
<script lang="ts">
	import type { Tweened } from "svelte/motion";
	import { tweened } from "svelte/motion";

	export let tween: Tweened<number> = tweened(0, { duration: 0 }) ;
	export let tweenedDuration: number = 0;
</script>


<div class="progress-wrapper">
	<div class="progress-bar" style="height: {$tween/tweenedDuration*100}%; --tweenedDuration"></div>
	{$tween}
	{tweenedDuration}
	{$tween/tweenedDuration}
</div>

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
		/* transition: height 1s linear; */
		transition-property: height;
		transition-duration: var(--tweenedDuration)s;
		transition-timing-function: linear;
		background: linear-gradient(
			rgba(2, 0, 36, 1) 0%,
			rgba(9, 9, 121, 1) 35%,
			rgba(0, 212, 255, 1) 100%
		);
	}


</style>
