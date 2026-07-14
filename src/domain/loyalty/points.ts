export function calculateLoyaltyPoints(input: {
  spendCents: number;
  visitPoints: number;
  euroRate: number;
}): number {
  const earnedFromSpend = Math.floor(input.spendCents / 100) * input.euroRate;
  return input.visitPoints + earnedFromSpend;
}

