<!-- script -->
<script lang="ts">
	// props
	export let tweenedProgress: number = 0;
	export let tweenedProgressPercent: string = '0%';
	export let direction: string = 'width';

	// vars
	let height: string = '100%';
	let width: string = '100%';
	let gradientDirection: string = '0deg';

	// det vars depending on direction
	$: if (direction === 'width') {
		tweenedProgressPercent = (tweenedProgress * 100).toString() + '%';
		height = '100%';
		width = tweenedProgressPercent;
		gradientDirection = '90deg';
	}
	$: if (direction === 'height') {
		tweenedProgressPercent = (tweenedProgress * 100).toString() + '%';
		height = tweenedProgressPercent;
		width = '100%';
		gradientDirection = '180deg';
	}

	// set css vars
	$: cssVarStyles =
		`--height:${height}; --width:${width}; --gradientDirection:${gradientDirection};` as string;
</script>

<!-- <div class="flex-wrapper"> -->
<div class="progress-wrapper">
	<div class="progress-bar" style={cssVarStyles} />
</div>
<!-- </div> -->

<style>
	:root {
		--height: inherit;
		--width: inherit;
		--transition-property: inherit;
		--gradientDirection: inherit;
	}

	/* .flex-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		width: var(--wrapper-width, 30vw);
		height: var(--wrapper-height, 20vh);
	} */

	.progress-bar {
		width: var(--width, 0%);
		height: var(--height, 0%);
		transition-property: var(--transition-property);
		border-radius: var(--radius);
		transition-timing-function: linear;
		background: linear-gradient(
			var(--gradientDirection),
			rgba(2, 0, 36, 1) 0%,
			rgba(9, 9, 121, 1) 35%,
			rgba(0, 212, 255, 1) 100%
		);
	}

	.progress-wrapper {
		width: 100%;
		height: 90%;
		background-color: #ccc;
		border-radius: var(--radius);
		overflow: hidden;
	}
</style>
