const clockPattern = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

export function timeToMinutes(value: string): number {
  if (!clockPattern.test(value)) throw new Error("INVALID_TIME");
  const [hour, minute] = value.split(":").map(Number);
  return hour * 60 + minute;
}

export function parseAvailabilityWindow(input: {
  start: string;
  end: string;
  breakStart?: string;
  breakEnd?: string;
}) {
  const startMinute = timeToMinutes(input.start);
  const endMinute = timeToMinutes(input.end);
  if (endMinute <= startMinute) throw new Error("INVALID_WORKDAY");

  const hasBreakStart = Boolean(input.breakStart);
  const hasBreakEnd = Boolean(input.breakEnd);
  if (hasBreakStart !== hasBreakEnd) throw new Error("INVALID_BREAK");

  if (!hasBreakStart || !hasBreakEnd) {
    return { startMinute, endMinute, breakStartMinute: null, breakEndMinute: null };
  }

  const breakStartMinute = timeToMinutes(input.breakStart!);
  const breakEndMinute = timeToMinutes(input.breakEnd!);
  if (breakStartMinute < startMinute || breakEndMinute > endMinute || breakEndMinute <= breakStartMinute) {
    throw new Error("INVALID_BREAK");
  }

  return { startMinute, endMinute, breakStartMinute, breakEndMinute };
}
