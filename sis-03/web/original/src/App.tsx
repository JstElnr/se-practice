import { useMemo, useState } from 'react';
import { BookingList } from '@/components/BookingList';
import { DayTimeline } from '@/components/DayTimeline';
import { RequestForm } from '@/components/RequestForm';
import { ResultPanel } from '@/components/ResultPanel';
import { RoomHeader } from '@/components/RoomHeader';
import { BOOKINGS, INITIAL_BLOCKED, ROOM } from '@/data/room';
import { checkAvailability } from '@/lib/availability';
import { useCurrentMinutes } from '@/hooks/useCurrentMinutes';

const DEFAULT_START = 11 * 60;
const DEFAULT_END = 12 * 60;

function App() {
  const nowMinutes = useCurrentMinutes();
  const [start, setStart] = useState(DEFAULT_START);
  const [end, setEnd] = useState(DEFAULT_END);
  const [blocked, setBlocked] = useState(INITIAL_BLOCKED);

  const result = useMemo(
    () => checkAvailability({ start, end, nowMinutes, blocked, bookings: BOOKINGS }),
    [start, end, nowMinutes, blocked]
  );

  const conflictIds = useMemo(() => new Set(result.conflicts.map((booking) => booking.id)), [result]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <RoomHeader
        room={ROOM}
        nowMinutes={nowMinutes}
        blocked={blocked}
        onToggleBlocked={() => setBlocked((current) => !current)}
      />

      <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start">
          <div className="flex flex-col gap-6">
            <ResultPanel start={start} end={end} result={result} />
            <RequestForm start={start} end={end} onStartChange={setStart} onEndChange={setEnd} />
          </div>
          <BookingList bookings={BOOKINGS} conflictIds={conflictIds} />
        </div>

        <DayTimeline
          bookings={BOOKINGS}
          blocked={blocked}
          start={start}
          end={end}
          nowMinutes={nowMinutes}
          available={result.available}
        />
      </main>
    </div>
  );
}

export default App;
