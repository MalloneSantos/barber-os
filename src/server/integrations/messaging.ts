export type OutboundMessage = {
  recipient: string;
  templateKey: string;
  variables: Record<string, string>;
};

export interface MessageProvider {
  send(message: OutboundMessage): Promise<{ messageId: string; status: "SENT" }>;
}

export class MockEmailProvider implements MessageProvider {
  async send(message: OutboundMessage) {
    return { messageId: `email_${message.templateKey}_${Date.now()}`, status: "SENT" as const };
  }
}

export class MockWhatsAppProvider implements MessageProvider {
  async send(message: OutboundMessage) {
    return { messageId: `whatsapp_${message.templateKey}_${Date.now()}`, status: "SENT" as const };
  }
}

