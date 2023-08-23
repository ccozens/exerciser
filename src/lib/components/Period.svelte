<script lang="ts">
	import { tweened } from 'svelte/motion';
	import type { Tweened } from 'svelte/motion';
	import ProgressBar from './ProgressBar.svelte';

	export let label: string = 'exercise';
	export let tween: Tweened<number> = tweened(0, { duration: 0 });
	export let tweenedDuration: number = 0;
</script>

<p>{label}</p>
<p>{$tween}</p>
<ProgressBar {tween} {tweenedDuration} />

