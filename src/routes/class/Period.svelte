<script lang="ts">
	import {tweened} from "svelte/motion";
    import type {Tweened} from "svelte/motion";
    import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();


    export let label: string = 'exercise';
    export let tween: Tweened<number> = tweened(0, { duration: 0 });
	export let tweenedDuration: number = 0;
    export let currentIndex: number = 0;

</script>

<p>{label}</p>
<p >{$tween}</p>
