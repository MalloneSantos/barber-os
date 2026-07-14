# Notas do schema

O schema está dividido em identidade, operação, crescimento e financeiro. IDs expostos usam CUID; timestamps são `timestamptz`; dinheiro é inteiro em centavos; percentuais de comissão são basis points. Índices compostos começam por `tenantId` e refletem as consultas principais, como agenda por profissional/data e clientes por status/última visita.

Foreign keys usadas em joins e cascatas possuem índices explícitos. Exclusão recuperável usa `deletedAt` em identidades operacionais. Entidades financeiras e auditoria são imutáveis na camada de aplicação.

Para ambientes de grande volume, candidatos a particionamento por mês são `Notification`, `AuditLog`, `LoyaltyTransaction` e `AppointmentStatusHistory`. Isso não é necessário no MVP.

