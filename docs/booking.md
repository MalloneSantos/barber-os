# Fluxo de agendamento

1. O cliente escolhe serviço ou combo.
2. Escolhe um profissional ou o primeiro disponível.
3. Seleciona data e horário calculados sobre jornada, pausa, folga e reservas existentes.
4. Informa os dados e aceita a política.
5. O servidor recalcula a disponibilidade dentro de uma transação.
6. O agendamento nasce `PENDING` e o gateway recebe a cobrança do sinal.
7. Pagamento aprovado cria `Payment` + `Deposit`, muda o agendamento para `CONFIRMED` e registra histórico.
8. A central cria a notificação de confirmação.

O conflito usa intervalos semiabertos: `[início, fim)`. Por isso um atendimento que termina às 10:45 não conflita com outro que começa às 10:45. Preparação e limpeza entram na duração bloqueada.

Em produção, o passo 5 deve usar transação curta e controle de concorrência no PostgreSQL. O ID do agendamento é a idempotency key do gateway.

