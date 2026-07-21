# Agendamento e disponibilidade

1. A página resolve o tenant pelo slug e carrega somente serviços/profissionais ativos.
2. A API de disponibilidade combina jornada semanal, intervalo, `TimeOff`, duração do serviço e agendamentos ativos no timezone do tenant.
3. O cliente escolhe serviço, profissional ou “qualquer profissional”, data e horário.
4. A Server Action valida os dados e recalcula o slot.
5. O gateway simulado aprova o sinal.
6. Uma transação cria/atualiza cliente e grava agendamento, serviço, histórico, pagamento, depósito e notificação.
7. A constraint `Appointment_staff_active_time_excl` usa intervalos `[início, fim)` para rejeitar sobreposição, inclusive entre requisições concorrentes.

Proprietários e gerentes administram, na própria agenda, a jornada de cada profissional e os bloqueios pontuais. Cada alteração revalida a agenda e o fluxo público de reserva.

Status bloqueadores: `PENDING`, `CONFIRMED`, `CHECKED_IN` e `IN_PROGRESS`. Cancelados, concluídos e faltas não ocupam um novo slot.

Em produção, o gateway deverá usar idempotência e webhook assinado. O MVP não armazena número de cartão.
