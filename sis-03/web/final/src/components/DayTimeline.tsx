import type { CSSProperties } from 'react';
import { Card } from '@/components/Card';
import { DAY_MINUTES, formatTime } from '@/lib/time';
import type { Booking } from '@/lib/availability';

interface DayTimelineProps {
  readonly bookings: readonly Booking[];
  readonly blocked: boolean;
  readonly start: number;
  readonly end: number;
  readonly nowMinutes: number;
  readonly available: boolean;
}

const TICK_HOURS = [0, 6, 12, 18, 24];

function percentOf(minute: number): string {
  return `${(minute / DAY_MINUTES) * 100}%`;
}

const BLOCK_PATTERN: CSSProperties = {
  backgroundImage:
    'repeating-linear-gradient(45deg, rgba(244,63,94,0.18) 0 8px, rgba(244,63,94,0.06) 8px 16px)',
};

export function DayTimeline({ bookings, blocked, start, end, nowMinutes, available }: DayTimelineProps) {
  const hasRequest = start < end;
  const clampedStart = Math.max(0, Math.min(start, DAY_MINUTES));
  const clampedEnd = Math.max(clampedStart, Math.min(end, DAY_MINUTES));

  return (
    <Card title="Today at Room 204" description="Grey blocks are existing bookings. Your requested slot is outlined in green or red.">
      <div className="relative h-16 overflow-hidden rounded-xl bg-slate-100 ring-1 ring-inset ring-slate-200">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            title={`${booking.title} (${formatTime(booking.start)}–${formatTime(booking.end)})`}
            className="absolute inset-y-2 rounded-md bg-slate-500/80 transition-opacity duration-200 hover:bg-slate-600"
            style={{ left: percentOf(booking.start), width: percentOf(booking.end - booking.start) }}
          />
        ))}

        {blocked && <div className="absolute inset-0" style={BLOCK_PATTERN} aria-hidden="true" />}

        {hasRequest && (
          <div
            className={`absolute inset-y-0 rounded-md border-2 transition-all duration-300 ${
              available
                ? 'border-emerald-600 bg-emerald-500/25'
                : 'border-rose-600 bg-rose-500/25'
            }`}
            style={{
              left: percentOf(clampedStart),
              width: percentOf(clampedEnd - clampedStart),
            }}
            aria-label="Requested time slot"
          />
        )}

        {nowMinutes < DAY_MINUTES && (
          <div
            className="absolute inset-y-0 w-0.5 bg-slate-900"
            style={{ left: percentOf(nowMinutes) }}
            aria-hidden="true"
          />
        )}
      </div>

      <div className="relative mt-2 h-4 text-xs tabular-nums text-slate-500">
        {TICK_HOURS.map((hour) => (
          <span
            key={hour}
            className={`absolute whitespace-nowrap ${
              hour === 0 ? '' : hour === 24 ? '-translate-x-full' : '-translate-x-1/2'
            }`}
            style={{ left: percentOf(hour * 60) }}
          >
            {String(hour).padStart(2, '0')}:00
          </span>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-600">
        <LegendItem swatchClass="bg-slate-500/80" label="Booked" />
        <LegendItem swatchClass="bg-emerald-500/25 ring-1 ring-emerald-600" label="Your slot (available)" />
        <LegendItem swatchClass="bg-rose-500/25 ring-1 ring-rose-600" label="Your slot (unavailable)" />
        <LegendItem swatchClass="bg-rose-100" label="Room blocked" />
        <LegendItem swatchClass="bg-slate-900" label="Now" />
      </div>
    </Card>
  );
}

function LegendItem({ swatchClass, label }: { readonly swatchClass: string; readonly label: string }) {
  return (
    <span className="flex items-center gap-2">
      <span className={`h-3 w-3 rounded-sm ${swatchClass}`} aria-hidden="true" />
      {label}
    </span>
  );
}
