import { describe, it, expect } from 'vitest';
import { canBook } from './booking';

const defaultFixture = {
  now: 540, // 09:00
  blocked: false,
  bookings: [{ start: 600, end: 660 }], // 10:00–11:00
};

describe('canBook', () => {
  it('T01: 660–720 (touching after) → true (AC4)', () => {
    expect(
      canBook({
        ...defaultFixture,
        start: 660,
        end: 720,
      })
    ).toBe(true);
  });

  it('T02: 540–570 (starts now) → false (AC1)', () => {
    expect(
      canBook({
        ...defaultFixture,
        start: 540,
        end: 570,
      })
    ).toBe(false);
  });

  it('T03: 720–720 (zero duration) → false (AC1)', () => {
    expect(
      canBook({
        ...defaultFixture,
        start: 720,
        end: 720,
      })
    ).toBe(false);
  });

  it('T04: 750–720 (reversed) → false (AC1)', () => {
    expect(
      canBook({
        ...defaultFixture,
        start: 750,
        end: 720,
      })
    ).toBe(false);
  });

  it('T05: 1380–1441 (past day end) → false (AC1)', () => {
    expect(
      canBook({
        ...defaultFixture,
        start: 1380,
        end: 1441,
      })
    ).toBe(false);
  });

  it('T06: 720–840 (120 minutes) → true (AC2)', () => {
    expect(
      canBook({
        ...defaultFixture,
        start: 720,
        end: 840,
      })
    ).toBe(true);
  });

  it('T07: 720–841 (121 minutes) → false (AC2)', () => {
    expect(
      canBook({
        ...defaultFixture,
        start: 720,
        end: 841,
      })
    ).toBe(false);
  });

  it('T08: 570–600 (touching before) → true (AC4)', () => {
    expect(
      canBook({
        ...defaultFixture,
        start: 570,
        end: 600,
      })
    ).toBe(true);
  });

  it('T09: 630–690 (partial overlap) → false (AC4)', () => {
    expect(
      canBook({
        ...defaultFixture,
        start: 630,
        end: 690,
      })
    ).toBe(false);
  });

  it('T10: 570–690 (contains booking) → false (AC4)', () => {
    expect(
      canBook({
        ...defaultFixture,
        start: 570,
        end: 690,
      })
    ).toBe(false);
  });

  it('T11: 615–645 (inside booking) → false (AC4)', () => {
    expect(
      canBook({
        ...defaultFixture,
        start: 615,
        end: 645,
      })
    ).toBe(false);
  });

  it('T12: 600–660 (identical interval) → false (AC4)', () => {
    expect(
      canBook({
        ...defaultFixture,
        start: 600,
        end: 660,
      })
    ).toBe(false);
  });

  it('T13: 660–720, blocked = true → false (AC3)', () => {
    expect(
      canBook({
        ...defaultFixture,
        start: 660,
        end: 720,
        blocked: true,
      })
    ).toBe(false);
  });

  it('T14: 630–690, bookings = [] → true (AC4)', () => {
    expect(
      canBook({
        ...defaultFixture,
        start: 630,
        end: 690,
        bookings: [],
      })
    ).toBe(true);
  });

  it('AC5: Available request leaves bookings array unchanged', () => {
    const bookings = [{ start: 600, end: 660 }];
    const before = JSON.stringify(bookings);
    const result = canBook({
      start: 660,
      end: 720,
      now: 540,
      blocked: false,
      bookings,
    });
    expect(result).toBe(true);
    expect(JSON.stringify(bookings)).toBe(before);
  });

  // X1: boundary — exactly at day end (end = 1440) with valid duration and no overlap
  it('X1: 1320–1440 (exactly day end, 120 min) → true (AC1+AC2)', () => {
    expect(
      canBook({
        ...defaultFixture,
        start: 1320,
        end: 1440,
        bookings: [],
      })
    ).toBe(true);
  });

  // X2: boundary — start just after now (now+1)
  it('X2: 541–600 (starts one minute after now) → true (AC1)', () => {
    expect(
      canBook({
        ...defaultFixture,
        start: 541,
        end: 600,
        bookings: [],
      })
    ).toBe(true);
  });
});
