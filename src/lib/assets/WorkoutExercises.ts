import type { WorkoutExercises } from '$lib/types';

export const workoutExercises: WorkoutExercises[] = [
	{
		name: 'isometric',
		exercises: ['Wall sit', 'Plank', 'Chair squat', 'Glute bridge', 'Side plank']
	},
	{ name: 'movement', exercises: ['Push up', 'Squat', 'Lunge', 'Tricep dip', 'Burpee'] },
	{
		name: 'cardio',
		exercises: ['Jumping jacks', 'High knees', 'Butt kicks', 'Mountain climbers', 'Burpee']
	},
	{
		name: 'yoga',
		exercises: [
			"Child's pose",
			'Cat cow',
			'Down Dog',
			'Three-legged dog',
			'High lunge',
			'Warrior Two first side',
			'Warrior Two second side',
			'Plank',
			'Down Dog'
		]
	}
];
