import type { Weekday, WorkSchedule } from '../../../lib/types';

const DAY_FROM_INDEX: Record<number, Weekday> = {
  0: 'sunday',
  1: 'monday',
  2: 'tuesday',
  3: 'wednesday',
  4: 'thursday',
  5: 'friday',
  6: 'saturday',
};

const SLOT_DURATION_MINUTES = 30;

type ReminderWindow = { reminderAt: number; endAt: number };

export function getDayKey(date: Date): Weekday {
  return DAY_FROM_INDEX[date.getDay()];
}

function getSlotStartTimestamp(baseDate: Date, slot: number): number {
  const start = new Date(baseDate);
  const hours = Math.floor(slot / 2);
  const minutes = slot % 2 === 0 ? 0 : SLOT_DURATION_MINUTES;
  start.setHours(hours, minutes, 0, 0);
  return start.getTime();
}

function getSlotEndTimestamp(baseDate: Date, slot: number): number {
  return (
    getSlotStartTimestamp(baseDate, slot) + SLOT_DURATION_MINUTES * 60 * 1000
  );
}

function coerceReminderMinutes(input: number): number | null {
  const parsed = Number(input);
  if (!Number.isFinite(parsed)) {
    return null;
  }

  const floored = Math.floor(parsed);
  if (floored <= 0) {
    return null;
  }

  return floored;
}

export function getLocalDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getReminderWindow(
  baseDate: Date,
  slots: number[],
  minutesBefore: number
): ReminderWindow | null {
  if (!slots || slots.length === 0) {
    return null;
  }

  const safeMinutes = coerceReminderMinutes(minutesBefore);
  if (!safeMinutes) {
    return null;
  }

  const sortedSlots = Array.from(new Set(slots)).sort((a, b) => a - b);
  const lastSlot = sortedSlots[sortedSlots.length - 1];

  if (typeof lastSlot !== 'number' || Number.isNaN(lastSlot)) {
    return null;
  }

  const endAt = getSlotEndTimestamp(baseDate, lastSlot);
  const reminderAt = endAt - safeMinutes * 60 * 1000;

  return { reminderAt, endAt };
}

export function findNextReminderWindow(
  fromDate: Date,
  schedule: WorkSchedule,
  minutesBefore: number
): ReminderWindow | null {
  for (let offset = 1; offset <= 7; offset += 1) {
    const candidate = new Date(fromDate);
    candidate.setDate(candidate.getDate() + offset);
    const dayKey = getDayKey(candidate);
    const slots = schedule[dayKey];
    if (!slots || slots.length === 0) {
      continue;
    }

    const window = getReminderWindow(candidate, slots, minutesBefore);
    if (!window) {
      continue;
    }

    if (window.reminderAt > fromDate.getTime()) {
      return window;
    }
  }

  return null;
}

export function hasWorkSchedule(schedule: WorkSchedule): boolean {
  return Object.values(schedule ?? {}).some(
    slots => Array.isArray(slots) && slots.length > 0
  );
}
