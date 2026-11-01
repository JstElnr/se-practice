import { AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import type { AvailabilityResult } from '@/lib/availability';
import { formatRange } from '@/lib/time';

interface ResultPanelProps {
  readonly start: number;
  readonly end: number;
  readonly result: AvailabilityResult;
}

export function ResultPanel({ start, end, result }: ResultPanelProps) {
  if (result.available) {
    return (
      <div
        role="status"
        className="flex items-start gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 transition-all duration-300 sm:p-6"
      >
        <CheckCircle2 className="mt-0.5 h-8 w-8 shrink-0 text-emerald-600" aria-hidden="true" />
        <div>
          <p className="text-2xl font-bold tracking-tight text-emerald-800">Available</p>
          <p className="mt-1 text-sm text-emerald-900/80">The room is free for {formatRange(start, end)}.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      role="status"
      className="rounded-2xl border border-rose-200 bg-rose-50 p-5 transition-all duration-300 sm:p-6"
    >
      <div className="flex items-start gap-4">
        <XCircle className="mt-0.5 h-8 w-8 shrink-0 text-rose-600" aria-hidden="true" />
        <div className="min-w-0">
          <p className="text-2xl font-bold tracking-tight text-rose-800">Unavailable</p>
          <p className="mt-1 text-sm text-rose-900/80">This time slot cannot be booked.</p>
        </div>
      </div>
      <ul className="mt-4 space-y-2 border-t border-rose-200 pt-4">
        {result.messages.map((message) => (
          <li key={message} className="flex items-start gap-2 text-sm text-rose-900">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" aria-hidden="true" />
            <span>{message}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
