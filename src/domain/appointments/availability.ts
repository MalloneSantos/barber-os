type TimeRange = {
  start: string;
  end: string;
};

type AvailabilityInput = {
  date: string;
  workStart: string;
  workEnd: string;
  slotIntervalMinutes: number;
  serviceDurationMinutes: number;
  breaks: TimeRange[];
  appointments: TimeRange[];
  blocks: TimeRange[];
};

function toMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function toTime(minutes: number): string {
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
}

export function hasAppointmentConflict(
  start: string,
  end: string,
  occupiedRanges: TimeRange[],
): boolean {
  const startMinutes = toMinutes(start);
  const endMinutes = toMinutes(end);

  return occupiedRanges.some((range) => {
    const occupiedStart = toMinutes(range.start);
    const occupiedEnd = toMinutes(range.end);
    return startMinutes < occupiedEnd && endMinutes > occupiedStart;
  });
}

export function generateAvailableSlots(input: AvailabilityInput): string[] {
  const start = toMinutes(input.workStart);
  const end = toMinutes(input.workEnd);
  const occupied = [...input.breaks, ...input.appointments, ...input.blocks];
  const slots: string[] = [];

  for (
    let cursor = start;
    cursor + input.serviceDurationMinutes <= end;
    cursor += input.slotIntervalMinutes
  ) {
    const slotStart = toTime(cursor);
    const slotEnd = toTime(cursor + input.serviceDurationMinutes);
    if (!hasAppointmentConflict(slotStart, slotEnd, occupied)) {
      slots.push(slotStart);
    }
  }

  return slots;
}

