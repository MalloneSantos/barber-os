# Fila de espera inteligente

Uma entrada guarda serviço, profissional opcional, data, intervalo disponível, antecedência mínima, quantidade de pessoas e pontos de prioridade. Quando uma vaga é liberada:

1. filtrar mesmo tenant, data, serviço, janela e duração;
2. remover clientes sem antecedência mínima;
3. ordenar por compatibilidade, fidelidade e entrada;
4. criar `WaitlistOffer` com expiração de 5, 10 ou 15 minutos;
5. enviar notificação interna e mensagem pelo adapter;
6. o primeiro aceite válido confirma a reserva em transação;
7. expiração oferece a vaga ao próximo candidato.

O MVP simula a oferta e exibe o ranking. A evolução usa fila de jobs com bloqueio `SKIP LOCKED` para impedir duas ofertas concorrentes sobre a mesma vaga.

