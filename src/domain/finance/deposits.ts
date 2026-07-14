type DepositPolicy = {
  totalCents: number;
  type: "FIXED" | "PERCENTAGE";
  value: number;
  customerExempt?: boolean;
};

type CancellationInput = {
  appointmentAt: Date;
  cancelledAt: Date;
  noticeHours: number;
  depositCents: number;
};

export function calculateDeposit(policy: DepositPolicy): number {
  if (policy.customerExempt) return 0;
  if (policy.type === "FIXED") return Math.min(policy.value, policy.totalCents);
  return Math.round((policy.totalCents * policy.value) / 100);
}

export function resolveCancellation(input: CancellationInput): {
  status: "CONVERTED_TO_CREDIT" | "RETAINED";
  creditCents: number;
} {
  const noticeMilliseconds = input.appointmentAt.getTime() - input.cancelledAt.getTime();
  const noticeHours = noticeMilliseconds / 3_600_000;

  if (noticeHours >= input.noticeHours) {
    return { status: "CONVERTED_TO_CREDIT", creditCents: input.depositCents };
  }

  return { status: "RETAINED", creditCents: 0 };
}

