export type PaymentRequest = {
  tenantId: string;
  appointmentId: string;
  amountCents: number;
  currency: "EUR";
};

export type PaymentResult = {
  externalId: string;
  status: "PAID" | "FAILED";
  processedAt: Date;
};

export interface PaymentGateway {
  chargeDeposit(request: PaymentRequest): Promise<PaymentResult>;
  refund(externalId: string, amountCents: number): Promise<PaymentResult>;
}

export class MockPaymentGateway implements PaymentGateway {
  async chargeDeposit(request: PaymentRequest): Promise<PaymentResult> {
    return { externalId: `mock_${request.appointmentId}`, status: "PAID", processedAt: new Date() };
  }

  async refund(externalId: string): Promise<PaymentResult> {
    return { externalId, status: "PAID", processedAt: new Date() };
  }
}

