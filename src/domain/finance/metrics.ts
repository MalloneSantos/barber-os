export function calculateAverageTicket(valuesInCents: number[]): number {
  if (valuesInCents.length === 0) return 0;
  const total = valuesInCents.reduce((sum, value) => sum + value, 0);
  return Math.round(total / valuesInCents.length);
}

export function calculateOccupancy(input: {
  bookedMinutes: number;
  availableMinutes: number;
}): number {
  if (input.availableMinutes <= 0) return 0;
  return Math.round((input.bookedMinutes / input.availableMinutes) * 10_000) / 100;
}

