import { formatTime } from './FormatTime';

export function calculateTotalWorkoutTime(rest: number, work: number, numberOfPeriods: number) {
	const restTime = rest * (numberOfPeriods - 1);
	const workTime = work * numberOfPeriods;
	const totalTime = restTime + workTime;
	return formatTime(totalTime * 1000);
}
