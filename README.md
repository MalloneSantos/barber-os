# Barber OS — MVP multiempresa

SaaS para operação de barbearias com página pública, agenda, clientes, equipe, serviços, fila de espera, sinal, fidelidade, estoque e financeiro básico. As rotas operacionais usam PostgreSQL via Prisma; `src/data/demo.ts` permanece apenas na landing institucional.

## O que funciona

- login por e-mail/senha com bcrypt e sessão opaca persistida no banco;
- cadastro que cria usuário, tenant, membership `OWNER`, unidade e categoria inicial em transação;
- isolamento por `tenantId` derivado da sessão e autorização repetida nas Server Actions;
- criação e edição persistidas de clientes, equipe, serviços e produtos, além de campanhas, recompensas e despesas;
- arquivamento lógico de clientes, equipe, serviços e produtos;
- gestão de jornada semanal e bloqueios (`TimeOff`), usados em tempo real na disponibilidade pública;
- reserva pública transacional com cliente, agendamento, serviço, histórico, pagamento, sinal e notificação;
- prevenção de conflito no PostgreSQL com `btree_gist` + `tstzrange`;
- cancelamento com crédito dentro do prazo ou retenção tardia;
- fila de espera persistida e oferta com notificação simulada;
- dashboard, busca, notificações, fidelidade, estoque, financeiro e CSV calculados do banco;
- seed repetível com dois tenants e testes unitários, integração e navegador.

## Instalação

Requisitos: Node.js 22+, npm e PostgreSQL 17 (local ou Docker).

Com Docker:

```bash
cd /Users/gverdonck/Documents/barber
npm install
cp .env.example .env
docker compose up -d
npm run db:generate
npx prisma migrate deploy
npm run db:seed
npm run dev
```

Com PostgreSQL instalado no macOS, crie o banco e ajuste apenas o usuário da URL no `.env`:

```bash
createdb barber_os
cp .env.example .env
# Exemplo sem senha local: postgresql://SEU_USUARIO@localhost:5432/barber_os?schema=public
npm install
npm run db:generate
npx prisma migrate deploy
npm run db:seed
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) e a página pública em [http://localhost:3000/barbearia/as-barber-club](http://localhost:3000/barbearia/as-barber-club).

> `npm run db:seed` reconstrói somente o tenant `tenant_as_barber`. Use esse seed apenas no ambiente de desenvolvimento/demonstração.

## Contas seedadas

Senha: `demo123`.

| Papel | E-mail | Tenant |
|---|---|---|
| OWNER | `owner@asbarber.be` | AS Barber Club |
| MANAGER | `gerente@asbarber.be` | AS Barber Club |
| RECEPTIONIST | `recepcao@asbarber.be` | AS Barber Club |
| PROFESSIONAL | `lucas@asbarber.be` | AS Barber Club |
| OWNER | `owner@northcut.be` | North Cut Demo |

## Comandos de verificação

```bash
npm install
npm run db:generate
npm run db:validate
npx prisma migrate deploy
npm run db:seed
npm run lint
npm run typecheck
npm test -- --run
npm run build
npm run test:e2e
```

## Arquitetura e segurança

- Server Components fazem leituras; Server Actions fazem mutações com Zod.
- A sessão contém apenas um token aleatório no cookie `httpOnly`; o estado e o tenant ativo ficam em `Session`.
- Toda busca por recurso autenticado combina ID e `tenantId` da sessão.
- A navegação oculta módulos sem permissão, mas a decisão final sempre acontece no servidor.
- Valores monetários são inteiros em centavos e alterações sensíveis geram `AuditLog`.
- O banco impede sobreposição ativa para o mesmo profissional, inclusive sob concorrência.

Veja [arquitetura](docs/architecture.md), [permissões](docs/permissions.md), [agendamento](docs/booking.md), [fila](docs/waitlist.md) e [sinal](docs/deposits.md).

## Simulações e integrações externas

O MVP persiste o fluxo, mas não movimenta dinheiro nem envia mensagens reais:

- `MockPaymentGateway` retorna pagamento aprovado e um ID externo simulado;
- e-mail e WhatsApp retornam IDs simulados e gravam `Notification` como envio simulado;
- recuperação de senha responde de forma neutra, sem gerar token ou enviar e-mail;
- campanhas são cadastradas, mas não possuem automação de disparo.

Stripe/adquirente, WhatsApp Business, provedor de e-mail, OAuth, filas de jobs, observabilidade e armazenamento de imagens continuam dependendo de integrações externas.
