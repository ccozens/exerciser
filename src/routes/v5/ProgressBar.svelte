<!-- script -->
<script lang="ts">
	export let time = 0;
	export let interval: number = 1;
</script>


<div class="progress-wrapper">
	<div class="progress-bar" style="height: {((time) / interval) * 100}%" />
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
		transition: height 1s linear;
		background: linear-gradient(
			rgba(2, 0, 36, 1) 0%,
			rgba(9, 9, 121, 1) 35%,
			rgba(0, 212, 255, 1) 100%
		);
	}


</style>
