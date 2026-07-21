# Sinal e cancelamento

O tenant define `defaultDepositCents` e `cancellationNoticeHours`. O sinal fixo nunca supera o total do serviço.

- reserva confirmada: cria `Payment(PAID)` e `Deposit(PAID)` via gateway simulado;
- cancelamento com antecedência suficiente: depósito vira `CONVERTED_TO_CREDIT` e cria `Credit` para o cliente;
- cancelamento tardio: depósito vira `RETAINED_NO_SHOW`;
- uma reserva já cancelada/concluída não pode ser cancelada novamente.

O MVP não captura nem devolve dinheiro real. Um adquirente deverá substituir `MockPaymentGateway`, usar idempotência, webhook assinado e nunca enviar dados brutos de cartão ao servidor da aplicação.
