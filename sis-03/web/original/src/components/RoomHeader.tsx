import { Ban, DoorOpen, Users } from 'lucide-react';
import type { RoomInfo } from '@/data/room';
import { formatTime } from '@/lib/time';

interface RoomHeaderProps {
  readonly room: RoomInfo;
  readonly nowMinutes: number;
  readonly blocked: boolean;
  readonly onToggleBlocked: () => void;
}

export function RoomHeader({ room, nowMinutes, blocked, onToggleBlocked }: RoomHeaderProps) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-600 text-white shadow-sm">
            <DoorOpen className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wider text-teal-700">Campus Room Availability</p>
            <h1 className="truncate text-lg font-semibold leading-tight text-slate-900 sm:text-xl">{room.name}</h1>
            <p className="flex items-center gap-1.5 text-sm text-slate-500">
              <span>{room.building}</span>
              <span aria-hidden="true">·</span>
              <Users className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{room.capacity} seats</span>
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 sm:justify-end">
          <div className="text-right">
            <p className="text-xs text-slate-500">Current time</p>
            <p className="font-mono text-base font-semibold tabular-nums text-slate-900">{formatTime(nowMinutes)}</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={blocked}
            onClick={onToggleBlocked}
            className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
              blocked
                ? 'bg-rose-600 text-white hover:bg-rose-700 focus-visible:ring-rose-500'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 focus-visible:ring-slate-400'
            }`}
          >
            <Ban className="h-4 w-4" aria-hidden="true" />
            <span>{blocked ? 'Room blocked' : 'Block room'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
