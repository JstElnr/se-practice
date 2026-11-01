import type { Booking } from '@/lib/availability';

export interface RoomInfo {
  readonly name: string;
  readonly building: string;
  readonly capacity: number;
}

export const ROOM: RoomInfo = {
  name: 'Room 204 · Maple Seminar Room',
  building: 'Halden Hall, Level 2',
  capacity: 12,
};

export const INITIAL_BLOCKED = false;

export const BOOKINGS: readonly Booking[] = [
  { id: 'b1', title: 'Faculty review panel', start: 10 * 60, end: 11 * 60 },
];
