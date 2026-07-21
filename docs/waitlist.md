# Fila de espera

Uma entrada persistida referencia tenant, cliente, serviço, profissional opcional, data, janela, antecedência mínima e prioridade.

- criar entrada valida que todos os recursos pertencem ao tenant da sessão;
- oferecer vaga consulta a disponibilidade real dentro da janela;
- a oferta cria `WaitlistOffer`, muda a entrada para `OFFERED` e grava uma `Notification` de WhatsApp simulada;
- ofertas expiram em dez minutos no modelo.

O MVP ainda não executa automaticamente expiração/aceite em background. Essa evolução requer fila de jobs e locking para garantir uma oferta ativa por vaga.
