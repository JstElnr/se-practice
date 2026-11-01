import { TIME_OPTIONS, DAY_MINUTES, formatTime } from '@/lib/time';
import { MAX_DURATION_MINUTES } from '@/lib/availability';
import { Card } from '@/components/Card';

interface RequestFormProps {
  readonly start: number;
  readonly end: number;
  readonly onStartChange: (value: number) => void;
  readonly onEndChange: (value: number) => void;
}

const selectClass =
  'w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 font-mono text-base tabular-nums text-slate-900 shadow-sm transition-colors duration-200 hover:border-slate-400 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500/30';

export function RequestForm({ start, end, onStartChange, onEndChange }: RequestFormProps) {
  const duration = end - start;

  return (
    <Card title="Check a time slot" description={`Pick a start and end time. Maximum length is ${MAX_DURATION_MINUTES} minutes.`}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-slate-700">Start</span>
          <select
            className={selectClass}
            value={start}
            onChange={(event) => onStartChange(Number(event.target.value))}
          >
            {TIME_OPTIONS.filter((minute) => minute < DAY_MINUTES).map((minute) => (
              <option key={minute} value={minute}>
                {formatTime(minute)}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-slate-700">End</span>
          <select
            className={selectClass}
            value={end}
            onChange={(event) => onEndChange(Number(event.target.value))}
          >
            {TIME_OPTIONS.filter((minute) => minute > 0).map((minute) => (
              <option key={minute} value={minute}>
                {formatTime(minute)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="mt-4 text-sm text-slate-500">
        Duration:{' '}
        <span className="font-semibold tabular-nums text-slate-800">
          {duration > 0 ? `${duration} minutes` : 'not valid'}
        </span>
      </p>
    </Card>
  );
}
