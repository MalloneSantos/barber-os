# Permissões e isolamento

## Papéis

- `OWNER`: acesso total, financeiro, auditoria e configurações.
- `ADMIN` / `MANAGER`: operação ampla; alterações financeiras críticas podem ser limitadas.
- `RECEPTIONIST`: agenda, clientes, fila e pagamentos presenciais, sem financeiro sensível.
- `PROFESSIONAL`: própria agenda, clientes permitidos, comissão e desempenho.
- `CUSTOMER`: somente o próprio perfil, reservas, pontos e histórico.

## Regra de servidor

Cada comando recebe `tenantId`, `userId`, `role` e permissões extras a partir da sessão. O identificador de tenant enviado pelo cliente é ignorado. Antes de acessar uma entidade, o repositório aplica `where: { tenantId: context.tenantId }`. Recursos encontrados fora do escopo resultam em `TENANT_MISMATCH` sem revelar sua existência.

Permissões granulares: `finance:view`, `finance:edit`, `appointments:view`, `appointments:edit`, `customers:view`, `customers:edit`, `campaigns:create`, `team:edit`, `commissions:view` e `settings:edit`.

## Evolução PostgreSQL

RLS deve ser habilitado e forçado nas tabelas operacionais. A transação define `app.current_tenant_id`, e as policies comparam esse valor a `tenant_id`. A conexão da aplicação não deve usar superuser.

