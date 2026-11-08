export type Interval = { start: number; end: number };

export function canBook({
  start,
  end,
  now,
  blocked,
  bookings,
}: {
  start: number;
  end: number;
  now: number;
  blocked: boolean;
  bookings: Interval[];
}): boolean {
  // Exact extraction of the decision logic from the original App.tsx check()
  // without intentional behaviour changes.

  if (!(0 <= start && start < end && end <= 1440)) return false;
  if (!(start > now)) return false;
  if (end - start > 120) return false;
  if (blocked) return false;

  for (const b of bookings) {
    // Overlap check: intervals overlap when start < b.end && end > b.start
    // Touching endpoints (start === b.end or end === b.start) are allowed.
    if (start < b.end && end > b.start) {
      return false;
    }
  }

  return true;
}
