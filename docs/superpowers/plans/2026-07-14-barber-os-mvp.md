# Barber OS MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir uma demonstração funcional e escalável do sistema operacional multiempresa para a AS Barber Club.

**Architecture:** Monólito modular Next.js com regras puras testáveis, serviços/repositórios com escopo obrigatório de tenant e adapters para integrações externas. PostgreSQL/Prisma é a persistência de produção; um seed tipado garante uma demonstração local completa.

**Tech Stack:** Next.js, React, TypeScript strict, Tailwind CSS, shadcn/ui, Zod, React Hook Form, Recharts, Lucide, Prisma/PostgreSQL, Vitest e Playwright.

---

## Mapa de arquivos

- `src/app`: páginas e layouts; apenas orquestração.
- `src/components/ui`: primitives visuais acessíveis.
- `src/components/dashboard`: gráficos, cartões, agenda e tabelas.
- `src/components/booking`: wizard e resumo da reserva.
- `src/domain`: funções puras e erros de domínio.
- `src/server`: autenticação, autorização, serviços, repositórios e adapters.
- `src/data/demo.ts`: fonte única dos dados demonstrativos.
- `prisma/schema.prisma`: modelo PostgreSQL multiempresa.
- `prisma/seed.ts`: seed persistente equivalente à demo.
- `tests`: testes unitários das regras e E2E principal.

### Task 1: Fundação do projeto

**Files:** `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `src/app/globals.css`, `components.json`

- [ ] Inicializar Next.js com TypeScript strict, App Router e Tailwind.
- [ ] Instalar Zod, React Hook Form, Recharts, Lucide, Prisma, Vitest e Playwright.
- [ ] Configurar aliases, scripts `dev`, `lint`, `typecheck`, `test`, `test:e2e`, `build`, `db:seed`.
- [ ] Criar tokens semânticos da identidade escura e primitives essenciais.
- [ ] Executar lint e typecheck para validar a fundação.

### Task 2: Regras de domínio em TDD

**Files:** `src/domain/**/*.ts`, `tests/domain/*.test.ts`

- [ ] Escrever teste falhando de disponibilidade considerando jornada, pausa, duração e bloqueios.
- [ ] Implementar geração de slots e executar o teste até passar.
- [ ] Escrever teste falhando de sobreposição e implementar detecção de conflito.
- [ ] Escrever testes falhando de sinal fixo/percentual/dispensa e implementar cálculo monetário em centavos.
- [ ] Escrever testes falhando de cancelamento dentro/fora do prazo e implementar política de crédito/retenção.
- [ ] Escrever teste falhando de ranking da fila e implementar ordenação estável.
- [ ] Escrever testes falhando de fidelidade, ticket médio e ocupação e implementar agregadores.
- [ ] Escrever testes falhando de RBAC e tenant mismatch e implementar políticas.
- [ ] Executar toda a suíte unitária.

### Task 3: Persistência multiempresa

**Files:** `prisma/schema.prisma`, `prisma/seed.ts`, `.env.example`, `src/server/repositories/*.ts`

- [ ] Modelar identidade, operação, receita, crescimento e auditoria com enums, índices e constraints.
- [ ] Criar migration inicial PostgreSQL.
- [ ] Implementar contratos de repositório que exigem `TenantContext`.
- [ ] Implementar repositórios Prisma com `tenantId` em todas as operações.
- [ ] Criar seed da AS Barber Club com equipe, 100 clientes e séries realistas.
- [ ] Validar schema com `prisma validate`.

### Task 4: Autenticação e autorização

**Files:** `src/server/auth/*`, `src/app/(auth)/*`, `src/middleware.ts`

- [ ] Criar sessão demonstrativa segura por cookie e contrato compatível com Auth.js.
- [ ] Implementar login por e-mail/senha das personas de demonstração.
- [ ] Implementar middleware de proteção e redirects.
- [ ] Implementar autorização server-side por permissão.
- [ ] Criar telas de login, cadastro e recuperação com Zod e feedback.
- [ ] Testar acesso permitido, negado e isolamento de tenant.

### Task 5: Shell premium e dashboard

**Files:** `src/app/(dashboard)/*`, `src/components/layout/*`, `src/components/dashboard/*`, `src/data/demo.ts`

- [ ] Criar sidebar desktop, header tablet e navegação inferior mobile.
- [ ] Criar hero operacional e cards principais com valores em euro.
- [ ] Criar gráfico de faturamento e ocupação semanal com carregamento adiado do Recharts.
- [ ] Criar timeline do dia, horários vagos, ranking de profissionais e alertas de estoque.
- [ ] Criar card “Impacto gerado pela plataforma” e painel de Insights.
- [ ] Validar navegação por teclado, contraste e layouts mobile/desktop.

### Task 6: Agenda e reservas

**Files:** `src/app/(dashboard)/agenda/*`, `src/app/(public)/barbearia/[slug]/*`, `src/components/booking/*`, `src/server/services/booking.ts`

- [ ] Criar página pública rica da barbearia, equipe, serviços e avaliações.
- [ ] Criar agenda diária por profissional com status e ações funcionais.
- [ ] Criar wizard serviço → profissional → data/horário → dados → resumo.
- [ ] Validar disponibilidade novamente no servidor antes da confirmação.
- [ ] Simular pagamento do sinal usando `PaymentGateway` e registrar transação.
- [ ] Criar confirmação, cancelamento e reagendamento com histórico.
- [ ] Cobrir o fluxo crítico com Playwright.

### Task 7: Fila, clientes e crescimento

**Files:** `src/app/(dashboard)/fila-de-espera/*`, `src/app/(dashboard)/clientes/*`, `src/app/(dashboard)/campanhas/*`, `src/server/services/waitlist.ts`

- [ ] Criar fila filtrável, compatibilidade e oferta temporária simulada.
- [ ] Criar lista e ficha CRM com segmentos, histórico e consentimentos.
- [ ] Criar campanhas e resultados demonstrativos com sugestões automáticas.
- [ ] Criar central de notificações e adapters mock de e-mail/WhatsApp.
- [ ] Registrar ações sensíveis em auditoria.

### Task 8: Produtos, fidelidade e financeiro

**Files:** `src/app/(dashboard)/produtos/*`, `src/app/(dashboard)/fidelidade/*`, `src/app/(dashboard)/financeiro/*`, `src/server/services/*.ts`

- [ ] Criar catálogo/estoque, venda e movimento de inventário.
- [ ] Criar saldo, níveis, recompensas e histórico de fidelidade.
- [ ] Criar receitas, despesas, ticket médio e projeção financeira.
- [ ] Criar telas de equipe, serviços, campanhas e configurações com ações simuladas claras.
- [ ] Implementar exportação CSV dos relatórios demonstrativos.

### Task 9: Documentação e verificação

**Files:** `README.md`, `docs/architecture.md`, `docs/permissions.md`, `docs/booking.md`, `docs/waitlist.md`, `docs/deposits.md`

- [ ] Documentar instalação, variáveis, PostgreSQL, migrations, seed e credenciais.
- [ ] Documentar RBAC, booking, fila, sinal e pontos de extensão das integrações.
- [ ] Executar `npm test` e corrigir falhas.
- [ ] Executar `npm run lint` e corrigir falhas.
- [ ] Executar `npm run typecheck` e corrigir falhas.
- [ ] Executar `npm run build` e corrigir falhas.
- [ ] Executar smoke E2E quando o navegador estiver disponível.

