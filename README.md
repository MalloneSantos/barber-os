# AS Barber Club — Barber OS

Micro SaaS multiempresa para gestão, crescimento e automação de barbearias. O MVP combina agenda, clientes, fila de espera, sinais, fidelidade, produtos, campanhas e financeiro em uma experiência premium em português do Brasil.

## O que está implementado

- landing page e página pública da barbearia;
- login demonstrativo com sessão JWT em cookie HTTP-only;
- quatro personas com papéis distintos;
- dashboard com receita, ocupação, agenda, impacto e insights;
- agenda diária por profissional;
- fluxo completo de reserva em cinco etapas;
- pagamento simulado do sinal e confirmação;
- fila de espera com ranking e oferta simulada;
- CRM demonstrativo, equipe, serviços, produtos e campanhas;
- fidelidade e financeiro básico;
- configurações do estabelecimento e políticas;
- schema PostgreSQL/Prisma com 37 entidades;
- migration inicial e seed com 100 clientes;
- regras críticas cobertas por Vitest.

## Stack

- Next.js 16 com App Router, React 19 e TypeScript strict;
- Tailwind CSS 4 e shadcn/ui;
- Zod, React Hook Form, Recharts e Lucide;
- PostgreSQL 17 e Prisma 7 com adapter `pg`;
- Vitest e Playwright preparado;
- `jose` para a sessão demonstrativa.

## Arquitetura

```text
src/
  app/                    rotas públicas, autenticação e painel
  components/             primitives shadcn e composição por domínio
  data/demo.ts            dataset único da experiência sem banco
  domain/                 regras puras e testáveis
  server/auth/            sessão, personas e contexto autenticado
  server/integrations/    contratos e adapters mock
  server/db.ts            Prisma Client com adapter PostgreSQL
prisma/
  schema.prisma           modelo multiempresa
  migrations/             migration inicial reproduzível
  seed.ts                 demonstração persistente
tests/domain/             testes das regras críticas
docs/                     decisões e fluxos
```

As telas leem do dataset demonstrativo para que o produto seja navegável sem infraestrutura. O schema e o seed equivalentes permitem trocar os seletores por repositórios Prisma módulo a módulo sem alterar a interface.

## Instalação rápida

Requisitos: Node.js 22+, npm e Docker.

```bash
npm install
cp .env.example .env
docker compose up -d
npx prisma migrate deploy
npm run db:seed
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Variáveis de ambiente

| Variável | Obrigatória | Uso |
|---|---:|---|
| `DATABASE_URL` | sim para persistência | Conexão PostgreSQL |
| `AUTH_SECRET` | sim | Assinatura HS256 da sessão; mínimo 32 caracteres |
| `NEXT_PUBLIC_APP_URL` | produção | URL canônica |
| `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` | não | OAuth futuro via Auth.js |
| `STRIPE_SECRET_KEY` | não | Gateway real futuro |
| `STRIPE_WEBHOOK_SECRET` | não | Validação de webhooks futura |

Nunca coloque segredos em arquivos versionados. `.env*` é ignorado, com exceção de `.env.example`.

## Contas de demonstração

Senha para todas as contas: `demo123`.

| Perfil | E-mail |
|---|---|
| Proprietário | `owner@asbarber.be` |
| Gerente | `gerente@asbarber.be` |
| Recepcionista | `recepcao@asbarber.be` |
| Profissional | `lucas@asbarber.be` |

## Comandos

```bash
npm run dev           # servidor de desenvolvimento
npm test              # regras de negócio
npm run test:coverage # cobertura HTML/texto
npm run lint          # ESLint sem warnings
npm run typecheck     # TypeScript strict
npm run build         # produção
npm run db:generate   # gerar Prisma Client
npm run db:validate   # validar schema
npm run db:seed       # seed persistente
```

## Multiempresa e segurança

`User` é a identidade global e `Membership` liga essa identidade ao `Tenant`. Toda entidade operacional contém `tenantId`. Consultas de produção devem receber um `TenantContext` derivado da sessão e nunca aceitar um tenant arbitrário do navegador. O teste `assertTenant` demonstra a barreira de aplicação; a evolução recomendada adiciona Row Level Security no PostgreSQL usando uma variável de transação.

O painel é protegido no layout do servidor. A interface pode ocultar ações por papel, mas a autorização decisiva pertence ao servidor. Valores monetários são armazenados em centavos inteiros. Ações sensíveis têm destino em `AuditLog`.

## Integrações

`PaymentGateway` separa a reserva do provedor de pagamentos. `MockPaymentGateway` confirma o sinal localmente. Uma implementação Stripe deve:

1. criar PaymentIntent com idempotency key igual ao ID do agendamento;
2. armazenar apenas IDs e status, nunca dados do cartão;
3. confirmar mudanças por webhook assinado;
4. usar Stripe Connect quando houver repasse aos tenants.

E-mail e WhatsApp seguem `MessageProvider`. Os adapters atuais retornam IDs simulados. Provedores reais devem ser chamados por uma fila e registrar entrega em `Notification`.

## Testes

Vitest cobre:

- disponibilidade e conflitos;
- sinal fixo e percentual;
- crédito ou retenção no cancelamento;
- ranking da fila;
- fidelidade, ticket médio e ocupação;
- isolamento de tenant e RBAC;
- autenticação das personas.

Playwright está instalado para a evolução do smoke E2E. O caminho prioritário é login → painel → agenda e página pública → reserva → sinal → confirmação.

## Decisões e limitações do MVP

- O banco é PostgreSQL, mas a UI usa seletores demonstrativos para iniciar sem Docker.
- O login demonstrativo é próprio e substituível por Auth.js; Google/Apple não são chamados.
- Stripe, e-mail e WhatsApp são mocks atrás de interfaces.
- A agenda prioriza a visualização diária por profissional; semana e drag-and-drop ficam para V2.
- Campanhas e insights usam regras determinísticas, sem IA real.
- Não há cobrança recorrente nem marketplace neste ciclo.

Consulte [booking](docs/booking.md), [sinal](docs/deposits.md), [fila de espera](docs/waitlist.md) e [permissões](docs/permissions.md).

