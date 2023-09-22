<script lang="ts">
	import { chosenWorkout, started, workoutInfo } from '$lib/stores';
	import { finish } from '$lib/assets/';
	import { formatTime, setTween } from '$lib/functions';
	import { tweened } from 'svelte/motion';
	import type { Tweened } from 'svelte/motion';
	import {
		Button,
		Period,
		WorkoutSelector,
		GithubCorner,
		Modal,
		WorkoutDurationEditor
	} from '$lib/components/';

	// define workout
	$: finalWorkoutArray = $workoutInfo.finalWorkoutArray;
	// define total duration
	$: totalDuration = $workoutInfo.totalDuration;
	// number of periods
	$: numberOfPeriods = finalWorkoutArray.length;

	// tween for total workout
	const totalDurationTween: Tweened<number> = tweened(0, { duration: 0 });

	// define formatted total duration
	$: formattedTotalDuration = formatTime(totalDuration);

	// set totalDurationTween duration to totalDuration when started
	$: if ($started) {
		totalDurationTween.set(totalDuration * 1000, { duration: totalDuration * 1000 });
	}

	// define current period
	let currentIndex:number = 0;
	let nextLabel: string = '';
	$: {
		const currentPeriod = finalWorkoutArray[currentIndex];
		const nextPeriod = finalWorkoutArray[currentIndex + 1] === undefined ? finish : finalWorkoutArray[currentIndex + 1] ;
		nextLabel = nextPeriod.label;

		if ($started && currentPeriod && currentIndex >= 0 && currentIndex < numberOfPeriods) {
			setTween(currentIndex, currentPeriod).then((index) => {
				currentIndex = index;
			});
		}
		if ($started && currentIndex === numberOfPeriods) {
			reset();
		}
	}

	// start workout
	function setStarted() {
		started.set(true);
		isModalOpen = true;
	}

	function reset() {
		started.set(false);
		isModalOpen = false;
		currentIndex = 0;
		totalDurationTween.set(0);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key !== ' ' && event.key !== 'Escape') return;
		if (event.key === ' ') {
			setStarted();
		}
		if (event.key === 'Escape') {
			reset();
		}
	}

	let isModalOpen = false;
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
				<hr />
				<div class="exercises">
					{#each $chosenWorkout.exercises as exercise}
						<input value={exercise} />
					{/each}
				</div>
				<hr />

				<div class="buttons">
					<WorkoutSelector />
					<WorkoutDurationEditor />
					<Button text="Start" on:click={setStarted} />
				</div>
			</article>
		</div>
	</section>
</main>

<svelte:window on:keydown={handleKeydown} />
{#if $started}
	<Modal {isModalOpen}>
		<!-- display current exercise and progress bar -->
		{#each finalWorkoutArray as period, index}
			{#if index === currentIndex}
				<Period {...period} {nextLabel} />
			{/if}
		{/each}
		<!-- workout progress -->
		{#if nextLabel === 'rest'}
			<p class="modal-progress">{(currentIndex + 1) / 2} / {numberOfPeriods / 2}</p>
		{/if}
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
	}
	h1 {
		font-size: 2.5rem;
	}

	h2 {
		font-size: 2rem;
		text-align: center;
	}

	hr {
		width: 95%;
		border: none;
		border-top: 1px solid var(--accent);
		margin: 0.3rem;
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

	input {
		border: none;
		border-radius: var(--radius);
		font-size: 1.5rem;
		background-color: var(--surface-1);
		color: var(--text-1);
		border: solid 1px transparent;
		text-align: center;
		transition: all 0.2s ease-in-out;
	}

	input:hover,
	input:focus,
	input:active {
		color: var(--text-2);
		border: solid 1px var(--accent);
	}

	.container {
		padding: 2rem 5rem;
	}

	.exercises {
		display: grid;
		place-items: center;
		border-radius: var(--radius);
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

	.modal-progress {
		text-align: center;
		color: var(--text-2);
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
