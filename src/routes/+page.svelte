<script lang="ts">
	import { chosenWorkout, started, isModalOpen, workoutInfo } from '$lib/stores';
	import { formatTime, setStarted } from '$lib/functions';
	import { tweened } from 'svelte/motion';
	import type { Tweened } from 'svelte/motion';
	import {
		Button,
		WorkoutSelector,
		GithubCorner,
		Modal,
		WorkoutDurationEditor,
		Exercises,
		CurrentPeriod
	} from '$lib/components/';

	// define total duration
	$: totalDuration = $workoutInfo.totalDuration;

	// tween for total workout
	const totalDurationTween: Tweened<number> = tweened(0, { duration: 0 });

	// define formatted total duration
	$: formattedTotalDuration = formatTime(totalDuration);

	// set totalDurationTween duration to totalDuration when started
	$: if ($started) {
		totalDurationTween.set(totalDuration * 1000, { duration: totalDuration * 1000 });
	}

	function handleStart() {
		setStarted();
	}

	function reset() {
		started.set(false);
		// currentIndex = 0;
		totalDurationTween.set(0);
	}

	function handleKeydown(event: KeyboardEvent) {
		const key = event.key;
		if (key !== ' ' && key !== 'Escape') return;
		if (key === ' ') {
			if (!$started) setStarted();
		}
		if (key === 'Escape') {
			reset();
		}
	}

</script>
<GithubCorner />
<main>
	<section>
		<heading>
			<h1>Interval exerciser</h1>
		</heading>

		<div class="container">
			<article>
				<h2><span class="capitals">{$chosenWorkout.name}</span> workout</h2>
				<p class="duration">{formattedTotalDuration}</p>

				<Exercises />

				<div class="buttons">
					<WorkoutSelector />
					<WorkoutDurationEditor />
					<Button text="Start" on:click={handleStart} />
				</div>
			</article>
		</div>
	</section>
</main>

<svelte:window on:keydown={handleKeydown} />

{#if $started}
	<Modal >
		<!-- display current exercise and progress bar -->
		<CurrentPeriod />
	</Modal>
{/if}

<style lang="postcss">
	main {
		display: grid;
		place-items: center;
		height: 100vh;
	}

	heading {
		padding: 2rem 0rem 0rem 0rem;

		> h1 {
			font-size: 2.5rem;
		}
	}

	h2 {
		font-size: 2rem;
		text-align: center;
	}

	section {
		display: grid;
		place-items: center;
		background-color: var(--surface-1);
		border-radius: var(--radius);
	}

	article {
		display: grid;
		place-items: center;
		border-radius: var(--radius);
		box-shadow: 0 0 3px var(--accent), 0 0 6px var(--accent);
		padding: 1rem;
	}

	.container {
		padding: 2rem 5rem;
	}

	.capitals {
		text-transform: capitalize;
	}

	.buttons {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		padding: 0 1rem 1rem 1rem;
	}

	.duration {
		font-size: 1.2rem;
	}

	@media (min-width: 1000px) {
		heading {
			padding: 2rem 2rem 0rem 2rem;
		}

		section {
			box-shadow: 0 0 3px var(--accent), 0 0 6px var(--accent), 0 0 9px var(--accent),
				0 0 12px var(--accent);
			min-width: 31rem;
		}

		article {
			width: 25rem;
		}
	}
</style>
