# Barber OS MVP — Design técnico

## Objetivo

Entregar um micro SaaS multiempresa, em português do Brasil, para a operação e o crescimento de barbearias. A demonstração deve permitir entrar em perfis diferentes, consultar dados realistas, operar agenda e clientes, simular sinal, fila de espera, fidelidade, estoque e financeiro, além de evidenciar o impacto gerado pela plataforma.

## Recorte do primeiro ciclo

O primeiro ciclo implementa uma experiência completa de demonstração e regras de negócio reais para os fluxos críticos. Integrações externas ficam atrás de contratos e adapters simulados. O banco de produção é PostgreSQL via Prisma; a experiência visual local também pode ser navegada com o dataset tipado do seed quando não houver servidor PostgreSQL disponível.

O escopo funcional do ciclo inclui:

- landing page, autenticação demonstrativa e recuperação de senha;
- dashboard administrativo e navegação para agenda, clientes, equipe, serviços, fila de espera, produtos, campanhas, fidelidade e financeiro;
- página pública da AS Barber Club e fluxo de agendamento;
- cálculo de disponibilidade, conflito, sinal, cancelamento e ocupação;
- RBAC e isolamento de tenant nas interfaces de repositório;
- notificações internas e mocks de e-mail, WhatsApp e pagamento;
- schema Prisma multiempresa, seed realista e documentação de evolução.

## Arquitetura

O produto é um monólito modular em Next.js App Router. Server Components são o padrão; Client Components aparecem apenas em pontos interativos. A interface nunca contém regras de negócio nem dados literais: consome seletores do dataset de demonstração ou serviços de aplicação.

As camadas são:

1. `src/domain`: tipos, políticas e funções puras.
2. `src/server`: contexto autenticado, RBAC, repositórios, serviços e integrações.
3. `src/data`: seed de demonstração tipado e seletores.
4. `src/components`: primitives e composição visual por domínio.
5. `src/app`: rotas, layouts e orquestração de dados.
6. `prisma`: schema, migration inicial e seed persistente.

## Multiempresa e segurança

`User` representa identidade. `Membership` liga o usuário a um `Tenant` e guarda o papel. Toda consulta operacional recebe `tenantId` explicitamente. Permissões são avaliadas no servidor e rotas financeiras não confiam apenas na ocultação visual. IDs públicos usam CUID. Senhas de demonstração são documentadas, mas a persistência usa hash. Segredos vivem em variáveis de ambiente.

O MVP usa sessão demonstrativa assinada por cookie para funcionar sem serviço externo, deixando um adapter de autenticação preparado para Auth.js. O acesso público nunca recebe dados internos. Repositórios Prisma sempre incluem o filtro de tenant; funções de teste rejeitam ausência ou divergência de escopo.

## Modelo de dados

O agregado de identidade contém `User`, `Account`, `Session`, `Tenant`, `BusinessUnit`, `Membership`, `Role` e `Permission`. Operação contém `Customer`, `Staff`, `ProfessionalProfile`, `ServiceCategory`, `Service`, `StaffService`, `Availability`, `TimeOff`, `Appointment`, `AppointmentService` e histórico de status.

Crescimento e receita usam `Payment`, `Deposit`, `Credit`, `Refund`, `WaitlistEntry`, `WaitlistOffer`, `Notification`, `Campaign`, `LoyaltyProgram`, `LoyaltyTransaction`, `Reward`, `Product`, `InventoryMovement`, `Sale`, `Expense`, `CommissionEntry`, `Review` e `AuditLog`. Índices começam por `tenantId`, chaves naturais relevantes são únicas dentro do tenant e exclusões recuperáveis usam `deletedAt`.

## Fluxos críticos

### Reserva

O cliente escolhe serviço, profissional ou “qualquer profissional”, data e horário. O serviço de disponibilidade combina jornada, pausas, folgas, duração e agendamentos não cancelados. A confirmação recalcula disponibilidade, cria agendamento, calcula sinal e registra pagamento simulado. O saldo restante é o total menos o sinal.

### Cancelamento e fila de espera

O cancelamento registra histórico. Se estiver dentro da janela configurada, o sinal vira crédito; fora dela, fica retido. A vaga liberada consulta entradas compatíveis da fila, ordena por compatibilidade, fidelidade e ordem de entrada, e cria uma oferta temporária com expiração.

### Fidelidade e impacto

Atendimento concluído gera pontos e movimentação financeira. Produtos vendidos reduzem estoque. As métricas agregam ocupação, ticket médio, sinais protegidos, receita recuperada por fila, campanhas e upsell. Insights são regras determinísticas sobre o mesmo dataset.

## Experiência visual

A direção é “atelier digital noturno”: carvão profundo, superfícies quentes, roxo elétrico como cor de ação e verde-lima apenas para sinais positivos. A tipografia combina uma sans geométrica forte em títulos com uma sans altamente legível no corpo. Cartões possuem bordas discretas, profundidade por luz e pouco glassmorphism. O dashboard evita grade genérica: usa um hero operacional, linha do tempo do dia e um painel de impacto visualmente distinto.

O layout é responsivo em três faixas: navegação lateral no desktop, header compacto em tablet e barra inferior no mobile. Tabelas viram cartões densos em telas estreitas. Estados vazios e loading preservam o contexto da ação.

## Tratamento de erros

Entradas passam por Zod nos limites. Erros de domínio têm códigos estáveis (`SLOT_CONFLICT`, `FORBIDDEN`, `TENANT_MISMATCH`, `DEPOSIT_REQUIRED`). A interface traduz códigos em mensagens claras. Integrações simuladas retornam o mesmo formato dos adapters futuros e registram tentativas, evitando caminhos condicionais espalhados.

## Testes e aceite

Vitest cobre disponibilidade, conflito, sinal, cancelamento, fila, fidelidade, tenant, permissões, ticket médio e ocupação. Playwright cobre login demonstrativo, navegação do dashboard e o caminho público até a confirmação de reserva. O aceite final exige testes, lint, typecheck e build sem erros.

## Limitações deliberadas

- Stripe Connect, WhatsApp, SMS, push, Google OAuth e envio transacional não são chamados de verdade.
- A agenda visual do MVP prioriza dia e profissional; semana completa é uma evolução documentada.
- Campanhas, assinaturas e múltiplas unidades têm modelo e telas demonstrativas, mas não executam cobrança recorrente nem automações externas.
- Consultas analíticas usam agregações de aplicação no dataset demonstrativo; materialized views são opção futura.

## Estrutura de pastas

```text
src/
  app/
    (auth)/
    (dashboard)/
    (public)/
    api/
  components/
    ui/
    dashboard/
    booking/
    layout/
  data/
  domain/
    appointments/
    auth/
    finance/
    loyalty/
    waitlist/
  server/
    auth/
    integrations/
    repositories/
    services/
prisma/
tests/
docs/
```

