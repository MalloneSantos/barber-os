export const business = {
  id: "tenant_as_barber",
  name: "AS Barber Club",
  slug: "as-barber-club",
  city: "Bruxelas",
  address: "Rue Antoine Dansaert 74, 1000 Bruxelles",
  phone: "+32 2 555 01 84",
  rating: 4.9,
  reviews: 328,
  timezone: "Europe/Brussels",
};

export const dashboardMetrics = [
  { label: "Faturamento hoje", value: "€ 1.248", change: "+18%", tone: "positive" },
  { label: "Atendimentos", value: "32", change: "7 próximos", tone: "neutral" },
  { label: "Ticket médio", value: "€ 31,20", change: "+€ 2,40", tone: "positive" },
  { label: "Ocupação", value: "87%", change: "+9 p.p.", tone: "positive" },
] as const;

export const impactMetrics = [
  { label: "Fila de espera", value: 620, detail: "18 horários recuperados" },
  { label: "Sinais protegidos", value: 310, detail: "62 reservas protegidas" },
  { label: "Campanhas", value: 480, detail: "15 novas reservas" },
  { label: "Vendas adicionais", value: 190, detail: "12 ofertas aceitas" },
] as const;

export const weeklyOccupancy = [
  { day: "Seg", occupancy: 38, revenue: 740 },
  { day: "Ter", occupancy: 46, revenue: 890 },
  { day: "Qua", occupancy: 68, revenue: 1280 },
  { day: "Qui", occupancy: 81, revenue: 1540 },
  { day: "Sex", occupancy: 96, revenue: 1940 },
  { day: "Sáb", occupancy: 100, revenue: 2260 },
] as const;

export const revenueTrend = [
  { label: "1 Jul", revenue: 920, forecast: 980 },
  { label: "3 Jul", revenue: 1380, forecast: 1250 },
  { label: "5 Jul", revenue: 1760, forecast: 1680 },
  { label: "7 Jul", revenue: 1120, forecast: 1310 },
  { label: "9 Jul", revenue: 1590, forecast: 1510 },
  { label: "11 Jul", revenue: 2040, forecast: 1860 },
  { label: "13 Jul", revenue: 2180, forecast: 2100 },
] as const;

export const staff = [
  { id: "lucas", name: "Lucas Moreira", role: "Barbeiro sênior", initials: "LM", color: "#8B5CF6", revenue: 6420, occupancy: 94 },
  { id: "diego", name: "Diego Santos", role: "Barbeiro", initials: "DS", color: "#C4B5FD", revenue: 5840, occupancy: 88 },
  { id: "marco", name: "Marco Almeida", role: "Barbeiro", initials: "MA", color: "#B7F34A", revenue: 4920, occupancy: 81 },
  { id: "andre", name: "André Costa", role: "Barbeiro", initials: "AC", color: "#F59E0B", revenue: 4380, occupancy: 74 },
] as const;

export const appointments = [
  { id: "apt-1", time: "09:00", end: "09:45", customer: "Henrique Lima", service: "Corte Signature", staff: "Lucas", status: "Concluído", price: 32 },
  { id: "apt-2", time: "09:30", end: "10:30", customer: "Thomas Peeters", service: "Corte + Barba", staff: "Diego", status: "Em atendimento", price: 48 },
  { id: "apt-3", time: "10:15", end: "11:00", customer: "Rafael Martins", service: "Corte Signature", staff: "Lucas", status: "Confirmado", price: 32 },
  { id: "apt-4", time: "11:00", end: "11:30", customer: "Victor Hugo", service: "Barba Premium", staff: "Marco", status: "Confirmado", price: 24 },
  { id: "apt-5", time: "12:00", end: "13:00", customer: "Noah Jacobs", service: "Corte + Barba", staff: "André", status: "Sinal pendente", price: 48 },
  { id: "apt-6", time: "14:00", end: "14:45", customer: "Gabriel Souza", service: "Corte Signature", staff: "Diego", status: "Confirmado", price: 32 },
  { id: "apt-7", time: "15:30", end: "16:15", customer: "Matteo Rossi", service: "Corte Signature", staff: "Lucas", status: "Confirmado", price: 32 },
] as const;

export const freeSlots = [
  { time: "13:15", staff: "Lucas", duration: "45 min", fit: "Corte ou barba" },
  { time: "14:45", staff: "Marco", duration: "60 min", fit: "Qualquer serviço" },
  { time: "16:30", staff: "André", duration: "45 min", fit: "Corte ou barba" },
] as const;

export const services = [
  { id: "cut", name: "Corte Signature", description: "Consultoria, corte, acabamento e finalização.", duration: 45, price: 32, category: "Cabelo", popular: true },
  { id: "beard", name: "Barba Premium", description: "Toalha quente, desenho, navalha e hidratação.", duration: 30, price: 24, category: "Barba", popular: false },
  { id: "combo", name: "Ritual Club", description: "Corte Signature + Barba Premium em um só ritual.", duration: 75, price: 52, category: "Combos", popular: true },
  { id: "buzz", name: "Corte Máquina", description: "Corte uniforme, contorno e acabamento preciso.", duration: 30, price: 22, category: "Cabelo", popular: false },
  { id: "brows", name: "Sobrancelha", description: "Design masculino e acabamento com navalha.", duration: 15, price: 12, category: "Extras", popular: false },
] as const;

export const customers = [
  { id: "c1", name: "Henrique Lima", email: "henrique@exemplo.com", phone: "+32 470 12 34 56", segment: "VIP", visits: 28, spent: 1120, lastVisit: "Hoje", nextVisit: "28 jul", points: 1280 },
  { id: "c2", name: "Thomas Peeters", email: "thomas@exemplo.be", phone: "+32 485 23 11 90", segment: "Recorrente", visits: 16, spent: 684, lastVisit: "Hoje", nextVisit: "—", points: 740 },
  { id: "c3", name: "Rafael Martins", email: "rafael@exemplo.com", phone: "+32 466 72 18 02", segment: "Retorno provável", visits: 11, spent: 392, lastVisit: "22 dias", nextVisit: "Hoje", points: 430 },
  { id: "c4", name: "Victor Hugo", email: "victor@exemplo.com", phone: "+32 474 81 50 77", segment: "Novo", visits: 1, spent: 32, lastVisit: "14 dias", nextVisit: "Hoje", points: 42 },
  { id: "c5", name: "Noah Jacobs", email: "noah@exemplo.be", phone: "+32 489 33 20 12", segment: "Risco de abandono", visits: 9, spent: 318, lastVisit: "41 dias", nextVisit: "—", points: 362 },
  { id: "c6", name: "Gabriel Souza", email: "gabriel@exemplo.com", phone: "+32 468 10 92 41", segment: "Alto valor", visits: 22, spent: 986, lastVisit: "18 dias", nextVisit: "Hoje", points: 1104 },
] as const;

export const waitlist = [
  { id: "w1", customer: "Rafael Martins", service: "Corte Signature", window: "Hoje, 16h–19h", notice: "40 min", compatibility: 98, points: 430, status: "Compatível" },
  { id: "w2", customer: "Noah Jacobs", service: "Ritual Club", window: "Hoje, 14h–18h", notice: "60 min", compatibility: 91, points: 362, status: "Aguardando" },
  { id: "w3", customer: "Matteo Rossi", service: "Barba Premium", window: "Amanhã, 10h–14h", notice: "30 min", compatibility: 86, points: 580, status: "Aguardando" },
] as const;

export const products = [
  { id: "p1", name: "Pomada Matte Club", brand: "AS Lab", sku: "AS-PM-01", price: 22, cost: 8, stock: 4, minimum: 5, category: "Finalização" },
  { id: "p2", name: "Óleo de Barba Nº 7", brand: "AS Lab", sku: "AS-OB-07", price: 26, cost: 9, stock: 12, minimum: 4, category: "Barba" },
  { id: "p3", name: "Shampoo Daily Clean", brand: "Reuzel", sku: "RZ-SH-12", price: 19, cost: 10, stock: 8, minimum: 4, category: "Cabelo" },
  { id: "p4", name: "Pente Carbon Pro", brand: "Uppercut", sku: "UP-PC-02", price: 14, cost: 5, stock: 2, minimum: 3, category: "Acessórios" },
] as const;

export const campaigns = [
  { name: "Terça Club", audience: "Retorno provável", sent: 84, viewed: 61, bookings: 12, revenue: 310, status: "Ativa" },
  { name: "Volta pra cadeira", audience: "Inativos 45+ dias", sent: 126, viewed: 72, bookings: 9, revenue: 284, status: "Concluída" },
  { name: "Último horário", audience: "Disponível hoje", sent: 42, viewed: 34, bookings: 7, revenue: 226, status: "Ativa" },
] as const;

export const insights = [
  { title: "Segunda pede um empurrão", detail: "Ocupação 38% abaixo da média. Ofereça pontos em dobro entre 10h e 14h.", impact: "+€ 290 estimados", kind: "opportunity" },
  { title: "27 clientes no momento de voltar", detail: "Eles ultrapassaram a frequência média em até 8 dias.", impact: "+€ 465 potenciais", kind: "growth" },
  { title: "Estoque merece atenção", detail: "Pomada Matte Club e Pente Carbon Pro estão abaixo do mínimo.", impact: "2 alertas", kind: "warning" },
] as const;

export const moduleDefinitions = {
  agendamentos: { title: "Agendamentos", description: "Acompanhe reservas, sinais e status em um só lugar.", columns: ["Horário", "Cliente", "Serviço", "Profissional", "Status"], rows: appointments.map((item) => [item.time, item.customer, item.service, item.staff, item.status]), action: "Novo agendamento" },
  clientes: { title: "Clientes", description: "Relacionamentos que crescem a cada atendimento.", columns: ["Cliente", "Segmento", "Visitas", "Total gasto", "Próximo"], rows: customers.map((item) => [item.name, item.segment, String(item.visits), `€ ${item.spent}`, item.nextVisit]), action: "Adicionar cliente" },
  equipe: { title: "Equipe", description: "Desempenho, ocupação e disponibilidade dos profissionais.", columns: ["Profissional", "Função", "Ocupação", "Faturamento"], rows: staff.map((item) => [item.name, item.role, `${item.occupancy}%`, `€ ${item.revenue}`]), action: "Adicionar profissional" },
  servicos: { title: "Serviços e combos", description: "Organize preços, duração e quem pode executar cada serviço.", columns: ["Serviço", "Categoria", "Duração", "Preço", "Status"], rows: services.map((item) => [item.name, item.category, `${item.duration} min`, `€ ${item.price}`, "Ativo"]), action: "Criar serviço" },
  produtos: { title: "Produtos e estoque", description: "Venda mais sem perder o controle do inventário.", columns: ["Produto", "SKU", "Preço", "Estoque", "Situação"], rows: products.map((item) => [item.name, item.sku, `€ ${item.price}`, String(item.stock), item.stock <= item.minimum ? "Estoque baixo" : "Em dia"]), action: "Adicionar produto" },
  campanhas: { title: "Campanhas", description: "Preencha horários e traga clientes de volta com contexto.", columns: ["Campanha", "Público", "Enviados", "Reservas", "Receita"], rows: campaigns.map((item) => [item.name, item.audience, String(item.sent), String(item.bookings), `€ ${item.revenue}`]), action: "Nova campanha" },
  fidelidade: { title: "Fidelidade", description: "Recompense frequência, valor e indicações.", columns: ["Cliente", "Nível", "Pontos", "Visitas", "Total gasto"], rows: customers.slice(0, 5).map((item, index) => [item.name, ["Black", "Gold", "Silver", "Bronze", "Silver"][index], String(item.points), String(item.visits), `€ ${item.spent}`]), action: "Nova recompensa" },
  financeiro: { title: "Financeiro", description: "Receita, custos e margem para decidir com confiança.", columns: ["Categoria", "Hoje", "Mês", "Variação", "Status"], rows: [["Serviços", "€ 1.024", "€ 18.420", "+12%", "Em alta"], ["Produtos", "€ 224", "€ 3.280", "+24%", "Em alta"], ["Sinais", "€ 155", "€ 2.140", "+8%", "Protegido"], ["Despesas", "€ 186", "€ 8.740", "+3%", "Previsto"]], action: "Registrar despesa" },
  relatorios: { title: "Relatórios", description: "Indicadores claros do período e exportação pronta.", columns: ["Relatório", "Período", "Resultado", "Variação", "Atualizado"], rows: [["Faturamento", "Julho", "€ 21.700", "+14%", "Agora"], ["Ocupação", "Julho", "78,4%", "+6 p.p.", "Agora"], ["Retenção", "90 dias", "72%", "+4 p.p.", "Hoje"], ["No-show", "Julho", "2,8%", "-1,2 p.p.", "Hoje"]], action: "Exportar CSV" },
} as const;

export type ModuleSlug = keyof typeof moduleDefinitions;

export const demoAccounts = [
  { email: "owner@asbarber.be", name: "Alexandre Silva", role: "OWNER", label: "Proprietário" },
  { email: "gerente@asbarber.be", name: "Camila Rocha", role: "MANAGER", label: "Gerente" },
  { email: "recepcao@asbarber.be", name: "Mariana Alves", role: "RECEPTIONIST", label: "Recepcionista" },
  { email: "lucas@asbarber.be", name: "Lucas Moreira", role: "PROFESSIONAL", label: "Profissional" },
] as const;

export const formatEuro = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value);

