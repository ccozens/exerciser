<!-- script -->
<script lang="ts">
	import { tweened } from 'svelte/motion';
	import type { Tweened } from 'svelte/motion';

	// props
	export let tweenedProgress: number = 0;
	export let tweenedProgressPercent: string = '0%';
	export let direction: string = 'width';
	export let tween: Tweened<number> = tweened(0, { duration: 0 });
	export let tweenedDuration: number = 0;

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

<div class="progress-wrapper">
	<div class="progress-bar" style={cssVarStyles} />
	<div class="countup">{((tweenedDuration - $tween) / 1000).toFixed(0)}</div>
</div>

<style>
	:root {
		--height: inherit;
		--width: inherit;
		--transition-property: inherit;
		--gradientDirection: inherit;
	}

	.progress-bar {
		width: var(--width, 0%);
		height: var(--height, 0%);
		transition-property: var(--transition-property);
		border-radius: var(--radius);
		transition-timing-function: linear;
		background: linear-gradient(var(--gradientDirection), oklch(90% 0.3 200), oklch(87% 0.2 90));
	}

	.progress-wrapper {
		width: 100%;
		height: 90%;
		background-color: oklch(25% 0.1 147 / 0.5); /* swatch 8 with 50% transparency */
		border-radius: var(--radius);
		overflow: hidden;
	}

	.countup {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 2rem;
		color: var(--text-2);
		background-color: oklch(16% 0.06 147 / 0.5);
		border-radius: 50%;
		height: 3rem;
		width: 3rem;
		text-align: center;
		padding: auto;
	}
</style>
