# Permissões e isolamento

`User` é a identidade global. `Membership` liga o usuário a um `Tenant` e define o papel. `Session.tenantId` guarda a única empresa ativa naquela sessão.

| Capacidade | OWNER/ADMIN | MANAGER | RECEPTIONIST | PROFESSIONAL |
|---|:---:|:---:|:---:|:---:|
| Agenda e agendamentos | editar | editar | editar | própria agenda |
| Clientes | editar | editar | editar | leitura |
| Equipe | editar | editar | não | não |
| Serviços | editar | editar | leitura | leitura |
| Fila | editar | editar | editar | não |
| Produtos/fidelidade | editar | editar | leitura limitada | não |
| Financeiro | editar | leitura | não | não |
| Configurações | editar | não | não | não |

As páginas chamam `requirePermission`. Cada Server Action repete a autorização com `authorizeAction`. IDs enviados pelo navegador nunca definem o tenant; queries e `updateMany` incluem o `tenantId` da sessão. Recursos de outro tenant são tratados como inexistentes.

RLS no PostgreSQL é uma evolução recomendada para defesa adicional; a conexão da aplicação não deverá usar superuser quando isso for ativado.
