export type WaitlistCandidate = {
  id: string;
  compatibility: number;
  loyaltyPoints: number;
  joinedAt: string;
};

export function rankWaitlist(entries: WaitlistCandidate[]): WaitlistCandidate[] {
  return [...entries].sort(
    (left, right) =>
      right.compatibility - left.compatibility ||
      right.loyaltyPoints - left.loyaltyPoints ||
      Date.parse(left.joinedAt) - Date.parse(right.joinedAt),
  );
}

