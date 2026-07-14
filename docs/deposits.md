# Sistema de sinal

O tenant configura sinal fixo ou percentual, exigência por serviço, dispensa por cliente e antecedência mínima de cancelamento. Todo cálculo acontece em centavos.

- `PENDING`: pagamento criado, ainda não confirmado.
- `PAID`: sinal capturado.
- `FAILED`: provedor recusou.
- `REFUNDED`: valor devolvido.
- `CONVERTED_TO_CREDIT`: cancelamento dentro do prazo.
- `RETAINED_NO_SHOW`: falta ou cancelamento tardio.
- `APPLIED_TO_SERVICE`: valor abatido do atendimento concluído.

No MVP o gateway é simulado. Stripe real entra em `PaymentGateway`, usa webhook assinado como fonte de verdade e nunca recebe dados de cartão no servidor da aplicação.

