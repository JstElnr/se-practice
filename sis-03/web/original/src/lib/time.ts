export const DAY_MINUTES = 1440;

export const TIME_OPTIONS: readonly number[] = Array.from({ length: 97 }, (_, i) => i * 15);

export function formatTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

export function formatRange(start: number, end: number): string {
  return `${formatTime(start)} – ${formatTime(end)}`;
}
