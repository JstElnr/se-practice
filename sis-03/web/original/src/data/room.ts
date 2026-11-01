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
  { id: 'b1', title: 'Calculus study group', start: 8 * 60 + 30, end: 9 * 60 + 30 },
  { id: 'b2', title: 'Faculty review panel', start: 10 * 60, end: 11 * 60 + 30 },
  { id: 'b3', title: 'Lab orientation', start: 13 * 60, end: 14 * 60 },
  { id: 'b4', title: 'Thesis defense rehearsal', start: 14 * 60, end: 15 * 60 + 30 },
  { id: 'b5', title: 'Robotics club', start: 16 * 60, end: 17 * 60 + 30 },
  { id: 'b6', title: 'Evening film screening', start: 19 * 60, end: 21 * 60 },
];
