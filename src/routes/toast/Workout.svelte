<script>
    import { tweened } from "svelte/motion";
    import { onMount } from "svelte";
    import { timer } from './Workout';

    let exercise = {
        name: "pushups",
        duration: 5,
        type: "work",
    };

    let progress = tweened(0, {
        duration: exercise.duration * 1000,
    });


    onMount(async () => {
        // const workout = new Workout();
        await progress.start();
        progress.set(exercise.duration);
    });

</script>

<div class="progress-bar">
	<div class="progress" style={`width: ${$progress}%;`} />
</div>
<p>
	{exercise}
</p>

<style>
	p {
		margin: 0;
	}

	.progress {
		height: 6px;
		background: whitesmoke;
		opacity: 0.3;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
	}
</style>