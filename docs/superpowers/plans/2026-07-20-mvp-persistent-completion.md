# Barber OS Persistent MVP Completion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Substituir a casca demonstrativa do Barber OS por fluxos multiempresa persistidos, mantendo o projeto e a direção visual existentes.

**Architecture:** Server Components consultam serviços Prisma com `tenantId` derivado da sessão; Server Actions validam entrada com Zod, repetem autenticação/autorização e revalidam a interface após mutações. O fluxo público resolve o tenant pelo slug e usa serviços transacionais para disponibilidade, reserva, sinal, cancelamento e fila.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Prisma 7, PostgreSQL, Zod 4, bcryptjs, Vitest e Playwright.

---

### Task 1: Banco, seed e sessão persistida

**Files:**
- Modify: `prisma/schema.prisma`
- Create: `prisma/migrations/20260720140000_persistent_mvp/migration.sql`
- Modify: `prisma/seed.ts`
- Modify: `src/server/auth/session.ts`
- Create: `src/server/auth/service.ts`
- Test: `tests/server/auth.test.ts`

- [ ] **Step 1: escrever testes falhando para login, expiração e tenant ativo**

```ts
it("rejects a session whose membership is inactive", async () => {
  const session = await resolveSession("token", fakeRepository({ membershipActive: false }));
  expect(session).toBeNull();
});
```

- [ ] **Step 2: executar `npm test -- tests/server/auth.test.ts` e confirmar a falha pela ausência do serviço**
- [ ] **Step 3: adicionar `tenantId` a `Session`, índice de expiração e serviço opaco com token aleatório armazenado no banco**
- [ ] **Step 4: tornar o seed idempotente, com senhas bcrypt e dois tenants para provar isolamento**
- [ ] **Step 5: executar Prisma generate, migration, seed e o teste até passar**

### Task 2: Login, cadastro, logout e recuperação

**Files:**
- Create: `src/app/(auth)/actions.ts`
- Create: `src/components/auth/login-form.tsx`
- Create: `src/components/auth/signup-form.tsx`
- Modify: `src/app/(auth)/login/page.tsx`
- Modify: `src/app/(auth)/cadastro/page.tsx`
- Modify: `src/app/(auth)/recuperar-senha/page.tsx`
- Modify: `src/app/api/logout/route.ts`
- Remove: `src/app/api/demo-login/route.ts`
- Test: `tests/server/auth-actions.test.ts`

- [ ] **Step 1: testar que credenciais inválidas não criam sessão e cadastro cria tenant + OWNER atomicamente**
- [ ] **Step 2: executar o teste e observar a falha esperada**
- [ ] **Step 3: implementar actions Zod com `useActionState`, bcrypt e mensagens neutras na recuperação**
- [ ] **Step 4: implementar logout que apaga sessão persistida e cookie**
- [ ] **Step 5: executar testes de autenticação e typecheck**

### Task 3: Autorização e isolamento multiempresa

**Files:**
- Modify: `src/domain/auth/permissions.ts`
- Create: `src/server/auth/authorization.ts`
- Create: `src/server/data/tenant.ts`
- Modify: `src/components/layout/dashboard-shell.tsx`
- Modify: `src/app/(dashboard)/layout.tsx`
- Test: `tests/server/tenant-isolation.test.ts`
- Test: `tests/server/authorization.test.ts`

- [ ] **Step 1: escrever casos falhando para acesso cruzado e matriz OWNER/MANAGER/RECEPTIONIST/PROFESSIONAL**
- [ ] **Step 2: executar os testes e confirmar `TENANT_MISMATCH`/`FORBIDDEN` ausentes**
- [ ] **Step 3: implementar `requireSession`, `requirePermission` e filtros de tenant em cada consulta/mutação**
- [ ] **Step 4: filtrar navegação com a mesma matriz usada no servidor**
- [ ] **Step 5: executar testes, lint e typecheck**

### Task 4: Cadastros e configurações

**Files:**
- Create: `src/app/(dashboard)/actions/crud.ts`
- Create: `src/components/dashboard/entity-form.tsx`
- Modify: `src/app/(dashboard)/[module]/page.tsx`
- Modify: `src/app/(dashboard)/configuracoes/page.tsx`
- Modify: `src/components/dashboard/settings-form.tsx`
- Test: `tests/server/crud.test.ts`

- [ ] **Step 1: testar criação/edição/exclusão lógica de cliente, equipe e serviço dentro do tenant**
- [ ] **Step 2: verificar a falha antes da implementação**
- [ ] **Step 3: implementar schemas e actions; persistir `StaffService` e as políticas do tenant**
- [ ] **Step 4: trocar tabelas mockadas por consultas Prisma e diálogos funcionais**
- [ ] **Step 5: executar testes e recarregar páginas para comprovar persistência**

### Task 5: Disponibilidade e agenda

**Files:**
- Create: `src/server/services/availability.ts`
- Create: `src/app/(dashboard)/agenda/actions.ts`
- Modify: `src/app/(dashboard)/agenda/page.tsx`
- Modify: `src/components/dashboard/agenda-workspace.tsx`
- Test: `tests/server/availability-service.test.ts`

- [ ] **Step 1: testar jornada, intervalo, bloqueio, duração e agendamento ativo**
- [ ] **Step 2: confirmar falhas para os casos ainda não cobertos**
- [ ] **Step 3: implementar cálculo de slots no timezone do tenant e persistência de `Availability`/`TimeOff`**
- [ ] **Step 4: alimentar a agenda com reservas reais e formular bloqueios/agendamentos**
- [ ] **Step 5: executar testes e typecheck**

### Task 6: Reserva, conflito e sinal simulado

**Files:**
- Create: `src/server/services/booking.ts`
- Create: `src/app/(public)/barbearia/[slug]/agendar/actions.ts`
- Create: `src/app/api/public/[slug]/availability/route.ts`
- Modify: `src/app/(public)/barbearia/[slug]/agendar/page.tsx`
- Modify: `src/components/booking/booking-wizard.tsx`
- Modify: `src/server/integrations/payment.ts`
- Test: `tests/server/booking-service.test.ts`

- [ ] **Step 1: testar transação completa e duas reservas concorrentes sobrepostas**
- [ ] **Step 2: observar a falha antes de criar o serviço**
- [ ] **Step 3: adicionar `btree_gist` e constraint `tstzrange` para status ativos**
- [ ] **Step 4: implementar criação atômica de cliente, agendamento, serviço, histórico, pagamento e depósito**
- [ ] **Step 5: substituir datas/horários fixos e `setTimeout` por disponibilidade e Server Action reais**
- [ ] **Step 6: executar testes de reserva, migration e typecheck**

### Task 7: Cancelamento e fila de espera

**Files:**
- Create: `src/server/services/cancellation.ts`
- Create: `src/server/services/waitlist.ts`
- Create: `src/app/(dashboard)/fila-de-espera/actions.ts`
- Modify: `src/app/(dashboard)/fila-de-espera/page.tsx`
- Modify: `src/components/dashboard/waitlist-actions.tsx`
- Test: `tests/server/cancellation.test.ts`
- Test: `tests/server/waitlist-service.test.ts`

- [ ] **Step 1: testar crédito no prazo, retenção tardia, dupla tentativa e oferta persistida**
- [ ] **Step 2: executar e confirmar as falhas esperadas**
- [ ] **Step 3: implementar cancelamento e fila em transações com histórico e notificação simulada**
- [ ] **Step 4: ligar botões de cancelar, incluir e oferecer vaga às actions**
- [ ] **Step 5: executar os testes e confirmar dados no banco**

### Task 8: Dashboard, fidelidade, produtos e financeiro

**Files:**
- Create: `src/server/queries/dashboard.ts`
- Create: `src/server/services/loyalty.ts`
- Create: `src/server/services/inventory.ts`
- Create: `src/server/queries/finance.ts`
- Create: `src/app/(dashboard)/financeiro/exportar/route.ts`
- Modify: `src/app/(dashboard)/painel/page.tsx`
- Modify: `src/app/(dashboard)/[module]/page.tsx`
- Test: `tests/server/operational-modules.test.ts`

- [ ] **Step 1: testar métricas derivadas, resgate, ajuste de estoque e CSV isolados por tenant**
- [ ] **Step 2: confirmar que os testes falham sem os serviços**
- [ ] **Step 3: implementar queries paralelas e mutações transacionais**
- [ ] **Step 4: trocar todos os indicadores e tabelas operacionais restantes por dados Prisma**
- [ ] **Step 5: executar os testes e validar estados vazios**

### Task 9: Documentação e E2E

**Files:**
- Modify: `README.md`
- Modify: `.env.example`
- Create: `docs/architecture.md`
- Modify: `docs/permissions.md`
- Modify: `docs/booking.md`
- Modify: `docs/waitlist.md`
- Modify: `docs/deposits.md`
- Modify: `tests/e2e/main.spec.ts`

- [ ] **Step 1: documentar instalação, credenciais, integrações simuladas e limites do MVP**
- [ ] **Step 2: escrever E2E para login, permissão, CRUD, reserva, conflito e cancelamento**
- [ ] **Step 3: executar o E2E e corrigir cada falha pela causa raiz**

### Task 10: Verificação final

**Files:**
- Modify as required by verification failures.

- [ ] **Step 1: executar `npm install`**
- [ ] **Step 2: executar `npm run db:generate && npm run db:validate`**
- [ ] **Step 3: executar migrations e `npm run db:seed` duas vezes para provar idempotência**
- [ ] **Step 4: executar `npm run lint && npm run typecheck && npm test -- --run`**
- [ ] **Step 5: executar `npm run build && npm run test:e2e`**
- [ ] **Step 6: registrar no resumo o que é real, simulado e externo**
