import { DAY_MINUTES, formatRange, formatTime } from '@/lib/time';

export const MAX_DURATION_MINUTES = 120;

export interface Booking {
  readonly id: string;
  readonly title: string;
  readonly start: number;
  readonly end: number;
}

export interface AvailabilityInput {
  readonly start: number;
  readonly end: number;
  readonly nowMinutes: number;
  readonly blocked: boolean;
  readonly bookings: readonly Booking[];
}

export interface AvailabilityResult {
  readonly available: boolean;
  readonly messages: readonly string[];
  readonly conflicts: readonly Booking[];
}

function isValidMinute(value: number): boolean {
  return Number.isInteger(value) && value >= 0 && value <= DAY_MINUTES;
}

export function checkAvailability(input: AvailabilityInput): AvailabilityResult {
  const { start, end, nowMinutes, blocked, bookings } = input;
  const messages: string[] = [];

  if (blocked) {
    messages.push('The room is blocked and is not accepting requests right now.');
  }

  if (!isValidMinute(start) || !isValidMinute(end)) {
    messages.push('Times must be whole minutes between 00:00 and 24:00.');
  } else {
    if (start >= end) {
      messages.push('The end time must be later than the start time.');
    } else if (end - start > MAX_DURATION_MINUTES) {
      messages.push(
        `The requested duration is ${end - start} minutes. The maximum is ${MAX_DURATION_MINUTES} minutes.`
      );
    }

    if (start <= nowMinutes) {
      messages.push(`The start time must be after the current time (${formatTime(nowMinutes)}).`);
    }
  }

  const conflicts = bookings.filter((booking) => start < booking.end && booking.start < end);
  for (const booking of conflicts) {
    messages.push(`Overlaps "${booking.title}" (${formatRange(booking.start, booking.end)}).`);
  }

  return {
    available: messages.length === 0,
    messages,
    conflicts,
  };
}
