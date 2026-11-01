import { MAX_DURATION_MINUTES } from '@/lib/availability';
import { Card } from '@/components/Card';
import { formatTime } from '@/lib/time';

interface RequestFormProps {
  readonly start: number;
  readonly end: number;
  readonly onStartChange: (value: number) => void;
  readonly onEndChange: (value: number) => void;
}

const inputClass =
  'w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 font-mono text-base tabular-nums text-slate-900 shadow-sm transition-colors duration-200 hover:border-slate-400 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500/30';

function toInputValue(minutes: number): string {
  return Number.isInteger(minutes) && minutes >= 0 && minutes < 1440 ? formatTime(minutes) : '';
}

function fromInputValue(value: string): number {
  const match = /^(\d{2}):(\d{2})$/.exec(value);
  if (!match) return Number.NaN;
  return Number(match[1]) * 60 + Number(match[2]);
}

export function RequestForm({ start, end, onStartChange, onEndChange }: RequestFormProps) {
  const duration = end - start;

  return (
    <Card title="Check a time slot" description={`Pick a start and end time. Maximum length is ${MAX_DURATION_MINUTES} minutes.`}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-slate-700">Start</span>
          <input
            type="time"
            step={60}
            className={inputClass}
            value={toInputValue(start)}
            onChange={(event) => onStartChange(fromInputValue(event.target.value))}
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-slate-700">End</span>
          <input
            type="time"
            step={60}
            className={inputClass}
            value={toInputValue(end)}
            onChange={(event) => onEndChange(fromInputValue(event.target.value))}
          />
        </label>
      </div>

      <p className="mt-4 text-sm text-slate-500">
        Duration:{' '}
        <span className="font-semibold tabular-nums text-slate-800">
          {Number.isFinite(duration) && duration > 0 ? `${duration} minutes` : 'not valid'}
        </span>
      </p>
    </Card>
  );
}
