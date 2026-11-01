import { Card } from '@/components/Card';
import type { Booking } from '@/lib/availability';
import { formatRange } from '@/lib/time';

interface BookingListProps {
  readonly bookings: readonly Booking[];
  readonly conflictIds: ReadonlySet<string>;
}

export function BookingList({ bookings, conflictIds }: BookingListProps) {
  return (
    <Card title="Existing bookings" description="These are fixed for today and cannot be changed here.">
      <ul className="divide-y divide-slate-100">
        {bookings.map((booking) => {
          const conflicts = conflictIds.has(booking.id);
          return (
            <li
              key={booking.id}
              className={`flex items-center justify-between gap-4 py-3 transition-colors duration-200 ${
                conflicts ? '-mx-2 rounded-lg bg-rose-50 px-2' : ''
              }`}
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-900">{booking.title}</p>
                <p className="font-mono text-xs tabular-nums text-slate-500">
                  {formatRange(booking.start, booking.end)}
                </p>
              </div>
              {conflicts && (
                <span className="shrink-0 rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-medium text-rose-700">
                  Conflict
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
