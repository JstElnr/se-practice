import { useEffect, useState } from 'react';

function minutesSinceMidnight(): number {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

export function useCurrentMinutes(): number {
  const [nowMinutes, setNowMinutes] = useState(minutesSinceMidnight);

  useEffect(() => {
    const id = window.setInterval(() => setNowMinutes(minutesSinceMidnight()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  return nowMinutes;
}
