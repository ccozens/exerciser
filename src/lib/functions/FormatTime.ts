export function formatTime(time: number): string {
    const minutes = Math.floor(time / 1000 / 60);
    const seconds = Math.floor(time / 1000 - minutes * 60);
    return seconds < 10 ? `${minutes} min 0${seconds} sec` : `${minutes} min ${seconds} sec`;
}