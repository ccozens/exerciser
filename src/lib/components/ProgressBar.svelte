<!-- script -->
<script lang="ts">
	export let tweenedProgress: number = 0;
</script>

<div class="progress-wrapper">
	<div class="progress-bar" style="height: {tweenedProgress * 100}%; --tweenedDuration" />
	{tweenedProgress}
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
		transition-duration: var(--tweenedDuration) s;
		transition-timing-function: linear;
		background: linear-gradient(
			rgba(2, 0, 36, 1) 0%,
			rgba(9, 9, 121, 1) 35%,
			rgba(0, 212, 255, 1) 100%
		);
	}
</style>
