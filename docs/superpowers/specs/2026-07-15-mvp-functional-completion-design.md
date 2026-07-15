# Barber OS — conclusão funcional do MVP

## Objetivo

Concluir a implementação existente sem recriar o projeto, substituindo os mocks operacionais por fluxos persistidos no PostgreSQL e preservando o design atual. O MVP deve demonstrar, de ponta a ponta, autenticação, isolamento multiempresa, permissões, cadastros essenciais, disponibilidade, agendamento sem conflito, sinal simulado, cancelamento, fila de espera e indicadores derivados dos dados reais.

## Estado inicial auditado

- TypeScript, lint e os 15 testes existentes passam, mas cobrem principalmente funções puras.
- Login usa contas definidas em código, senha compartilhada e `tenantId` fixo no JWT.
- As páginas operacionais importam dados de `src/data/demo.ts`.
- Botões de criação, configuração, busca, notificação e fila exibem toasts sem persistência.
- O agendamento público usa datas e horários fixos e confirma por `setTimeout`.
- O schema Prisma possui as entidades necessárias, porém não impede sobreposição de horários no banco.
- O seed não é idempotente para agendamentos, fila, notificações e despesas.
- O PostgreSQL local está acessível, mas o `.env` aponta para uma credencial fictícia.

## Arquitetura aprovada

### Aplicação e dados

- Next.js App Router continua sendo a única aplicação.
- Leituras autenticadas serão feitas em Server Components por serviços server-side.
- Mutações usarão Server Actions, com Zod na fronteira, autenticação, autorização e `tenantId` obtido exclusivamente da sessão.
- Prisma continuará como camada de acesso ao PostgreSQL.
- Componentes client-side receberão apenas dados serializáveis necessários à interação.
- `src/data/demo.ts` ficará restrito à landing page institucional; nenhum fluxo operacional dependerá dele.

### Autenticação

- Login por e-mail e senha consultará `User.passwordHash` e validará com bcrypt.
- A sessão será opaca, aleatória e persistida na tabela `Session`, em cookie `httpOnly`, `sameSite=lax` e `secure` em produção.
- `Session` identificará usuário e tenant ativo; a associação ativa será validada em cada leitura de sessão.
- Logout removerá a sessão do banco e expirará o cookie.
- Cadastro criará, em transação, usuário, tenant, membership `OWNER`, unidade, categoria inicial e configurações padrão.
- Recuperação de senha continuará simulada porque envio de e-mail e token externo não fazem parte do MVP; a resposta será neutra para não revelar se o e-mail existe.

### Isolamento multiempresa

- Toda consulta autenticada exigirá `tenantId` da sessão.
- IDs recebidos do cliente nunca serão suficientes: atualização e remoção usarão filtros que incluam tenant.
- Relações críticas serão validadas antes de mutações para impedir associação de recursos de tenants diferentes.
- Serviços públicos resolverão o tenant pelo `slug` da URL e carregarão apenas dados ativos daquele tenant.
- Testes cobrirão leitura e mutação cruzada entre dois tenants.
- O MVP terá uma empresa ativa por sessão; alternância entre memberships fica fora do escopo.

### Permissões

- `OWNER`: acesso total.
- `MANAGER`: operação, clientes, equipe, serviços, fila, produtos e leitura financeira.
- `RECEPTIONIST`: clientes, agenda, agendamentos e fila.
- `PROFESSIONAL`: própria agenda, leitura limitada de clientes e comissões.
- Rotas, navegação e Server Actions aplicarão a mesma matriz de permissões.
- Negação de acesso retornará erro controlado ou página de acesso negado, nunca dados parciais.

## Escopo funcional por prioridade

### 1–3. Autenticação, multiempresa e permissões

Entregues conforme as regras acima. Contas seedadas continuam disponíveis, mas são registros reais no banco e não constantes de código.

### 4. Equipe, clientes e serviços

- Listas carregadas do banco, com busca no cliente sobre dados já isolados por tenant.
- Criação e edição de equipe, cliente e serviço via formulário validado.
- Exclusão será lógica (`deletedAt`) para registros que participam do histórico.
- Telefone de cliente e nome de serviço continuarão únicos dentro do tenant.
- Associação entre profissionais e serviços será persistida em `StaffService`.

### 5. Disponibilidade

- Cada profissional terá disponibilidade semanal com dia, início, fim e intervalo opcional.
- Bloqueios pontuais usarão `TimeOff`.
- Slots públicos considerarão duração do serviço, intervalo, bloqueios e agendamentos ativos.
- Horários serão calculados no timezone do tenant e persistidos como `timestamptz`.

### 6–7. Agendamento e conflitos

- O fluxo público carregará serviços e profissionais reais.
- Datas e slots serão consultados no servidor.
- Ao confirmar, o servidor criará ou localizará o cliente pelo telefone dentro do tenant.
- Agendamento, serviço, histórico, pagamento e depósito serão gravados em uma transação.
- Uma constraint PostgreSQL de exclusão baseada em intervalo impedirá agendamentos ativos sobrepostos para o mesmo profissional, inclusive sob concorrência.
- Conflito retornará mensagem para escolher outro horário sem criar registros parciais.

### 8. Sinal simulado

- `MockPaymentGateway` continuará sendo o adaptador padrão.
- O gateway retornará identificador externo e estado pago, sem armazenar dados de cartão.
- O valor virá da política do tenant e nunca excederá o valor do serviço.
- Pagamento e depósito ficarão registrados e o agendamento terminará confirmado.
- Falha simulada abortará a transação e deixará o horário disponível.

### 9. Cancelamento

- Cancelamento autorizado gravará histórico de status.
- Dentro do prazo configurado, o sinal será convertido em crédito do cliente.
- Fora do prazo, o sinal será retido.
- A política usará horário do agendamento, instante de cancelamento e `cancellationNoticeHours` do tenant.
- O mesmo agendamento não poderá ser cancelado duas vezes.

### 10. Fila de espera

- Lista virá de `WaitlistEntry` com cliente, serviço, janela e pontuação.
- Nova entrada será persistida.
- Oferta criará `WaitlistOffer`, atualizará o estado da entrada e registrará notificação.
- O envio por WhatsApp/e-mail continuará simulado pelos providers existentes; o estado persistido indicará a simulação.

### 11. Dashboard

- Receita, atendimentos, ticket médio, ocupação, agenda próxima, impacto de sinais e profissionais serão derivados de consultas do tenant.
- Nenhum indicador operacional usará números estáticos.
- Consultas independentes serão executadas em paralelo.

### 12. Fidelidade

- Página listará saldo de pontos, programa e recompensas reais.
- Conclusão de agendamento poderá gerar transação de pontos.
- Resgate básico validará saldo e criará `RewardRedemption` em transação.

### 13. Produtos

- Página listará produtos, estoque e alerta de mínimo.
- Cadastro e ajuste de estoque serão persistidos.
- Ajuste criará `InventoryMovement`, mantendo trilha de auditoria.

### 14. Financeiro básico

- Página exibirá receita de serviços/produtos, sinais, despesas, saldo e ticket médio do período.
- Cadastro de despesa será persistido.
- Exportação CSV gerará arquivo real a partir dos dados isolados do tenant.
- Contabilidade, conciliação bancária e impostos ficam fora do escopo.

### 15. Testes

- Testes unitários para sessão, permissões, tenant, slots, conflitos e cancelamento.
- Testes de serviço para criação de agendamento e mutações críticas com dependências controladas.
- E2E para login real, bloqueio por permissão, CRUD essencial, reserva pública, conflito e cancelamento.
- O banco E2E será preparado por migration e seed antes da execução.

### 16. Documentação

- README com pré-requisitos e comandos exatos.
- `.env.example` coerente com PostgreSQL local.
- Documento de arquitetura multiempresa e matriz de permissões.
- Lista explícita de integrações simuladas e pontos de substituição.

## Alterações de banco

- Adicionar tenant ativo à sessão e índices de expiração.
- Adicionar constraint de exclusão para intervalos de agendamentos ativos, usando `btree_gist` e `tstzrange`.
- Adicionar os índices necessários às consultas de tenant, disponibilidade, agenda, fila e financeiro.
- Tornar o seed repetível por meio de IDs determinísticos, upserts e limpeza controlada apenas do tenant demo.
- Criar o banco local `barber_os` com o usuário PostgreSQL já existente e atualizar apenas o `.env` local; nenhum segredo será versionado.

## Tratamento de erros

- Erros de validação retornam mensagens de campo.
- Falta de sessão redireciona para login.
- Falta de permissão retorna acesso negado.
- Recurso de outro tenant é tratado como inexistente.
- Conflito de agenda retorna código funcional específico.
- Falha do gateway simulado não persiste agendamento parcial.
- Erros inesperados são registrados no servidor sem expor detalhes internos ao navegador.

## Critérios de aceite

1. Um usuário seedado entra com sua senha real e recebe sessão persistida.
2. Um usuário não lê nem altera dados de outro tenant.
3. Um perfil sem permissão não acessa a rota nem executa a ação correspondente.
4. Equipe, clientes e serviços criados aparecem após recarregar a página.
5. Disponibilidade altera os slots públicos.
6. Uma reserva pública persiste cliente, agendamento, serviço, pagamento e depósito.
7. Duas reservas sobrepostas para o mesmo profissional não podem coexistir.
8. Cancelamento no prazo cria crédito; cancelamento tardio retém o sinal.
9. Oferta de fila persiste estado e notificação simulada.
10. Dashboard, fidelidade, produtos e financeiro usam somente dados do banco.
11. Instalação, Prisma Client, migrations, seed, lint, typecheck, testes e build terminam sem erros.

## Fora do escopo

- Stripe ou outro adquirente real.
- Entrega real de e-mail, WhatsApp, SMS ou push.
- OAuth social.
- Alternância de tenant na mesma sessão.
- Drag-and-drop de agenda.
- Contabilidade, impostos, folha e conciliação bancária.
- Campanhas automáticas e assinaturas recorrentes.
