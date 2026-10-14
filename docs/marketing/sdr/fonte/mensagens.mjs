// Fonte única das mensagens do SDR. WhatsApp e e-mail saem daqui,
// então o texto é idêntico nos dois canais — muda só a embalagem.
// **trecho** vira *negrito* no WhatsApp e <strong> no e-mail.

export const WA_NUMERO = "5511976466553";
export const WA_TEXTO = "Olá! Quero agendar a visita gratuita da Food Guard.";

export const mensagens = [
  {
    id: "1-primeiro-contato",
    numero: 1,
    nome: "Primeiro contato",
    quando: "Dia 0",
    regra: "Primeira abordagem. Apresenta a Food Guard, explica como funciona e oferece a visita.",
    assunto: "Uma visita gratuita para o [Estabelecimento]",
    preheader: "Um nutricionista vai até a sua cozinha e mostra onde a operação está exposta. Sem custo.",
    titulo: "Uma visita gratuita para o [Estabelecimento]",
    blocos: [
      { t: "p", x: "Olá, [Nome]! Tudo bem?" },
      { t: "p", x: "Somos a Food Guard, assessoria de segurança alimentar para restaurantes e serviços de alimentação em São Paulo." },
      { t: "p", x: "Funciona assim: um nutricionista da nossa equipe acompanha a operação de perto, mantém em dia a documentação sanitária (Manual de Boas Práticas, POPs e registros), orienta a equipe e deixa a cozinha pronta para a fiscalização. Você cuida do negócio e a parte sanitária fica com a gente." },
      { t: "destaque", rotulo: "Visita gratuita", x: "Para começar, oferecemos uma **visita gratuita**: um nutricionista vai até o [Estabelecimento], conhece a cozinha e mostra o que hoje deixa a operação exposta. Sem custo e sem compromisso." },
      { t: "p", x: "Podemos agendar? Qual dia da semana fica melhor para você?" },
    ],
    cta: "Agendar a visita gratuita",
  },
  {
    id: "2-segundo-contato",
    numero: 2,
    nome: "Segundo contato",
    quando: "Dia 3 · só se não respondeu",
    regra: "Retoma sem cobrar. Mais curta, reforça que é gratuita e que não para a cozinha.",
    assunto: "Sobre a visita gratuita no [Estabelecimento]",
    preheader: "Leva cerca de uma hora e não precisa parar a cozinha.",
    titulo: "A visita gratuita continua disponível",
    blocos: [
      { t: "p", x: "Oi, [Nome]! Voltando aqui, caso a mensagem tenha se perdido na correria." },
      { t: "destaque", rotulo: "Visita gratuita", x: "A **visita gratuita** continua disponível para o [Estabelecimento]: um nutricionista da Food Guard vai até aí, olha a operação com você e aponta os pontos que a vigilância costuma cobrar primeiro. Leva cerca de uma hora e não precisa parar a cozinha." },
      { t: "p", x: "Quer que a gente reserve um horário nesta semana?" },
    ],
    cta: "Reservar um horário",
  },
  {
    id: "3-follow-up-final",
    numero: 3,
    nome: "Follow-up final",
    quando: "Dia 7 · só se não respondeu",
    regra: "Última tentativa. Avisa que é a última, deixa a porta aberta e encerra a cadência.",
    assunto: "Última mensagem, [Nome]",
    preheader: "A visita gratuita continua de pé quando fizer sentido para você.",
    titulo: "A porta continua aberta",
    blocos: [
      { t: "p", x: "[Nome], esta é a nossa última mensagem, para não incomodar." },
      { t: "destaque", rotulo: "Quando fizer sentido", x: "Se em algum momento você quiser saber como o [Estabelecimento] se sairia numa fiscalização hoje, a visita gratuita do nosso nutricionista continua de pé." },
      { t: "p", x: "É só responder esta mensagem que a gente agenda. Bom trabalho por aí!" },
    ],
    cta: "Quero agendar a visita",
  },
  {
    id: "4-agendamento",
    numero: 4,
    nome: "Agendamento",
    quando: "Respondeu · em até 5 minutos",
    regra: "Qualquer resposta tira o lead da cadência e cai aqui. Objetivo único: sair com data e hora.",
    assunto: "Vamos agendar a sua visita gratuita",
    preheader: "Escolha o melhor horário. Leva cerca de uma hora e não tem custo.",
    titulo: "Vamos agendar a sua visita",
    blocos: [
      { t: "p", x: "Que bom, [Nome]! Vamos marcar." },
      { t: "destaque", rotulo: "Como é a visita", x: "Um nutricionista da Food Guard vai até o [Estabelecimento], conhece a cozinha e a rotina da equipe e, no final, conversa com você sobre o que encontrou e o que vale priorizar. Leva cerca de uma hora, não precisa parar a operação e não tem custo." },
      { t: "opcoes", x: "Temos estes horários:", itens: ["[dia], às [hora]", "[dia], às [hora]", "[dia], às [hora]"] },
      { t: "p", x: "Qual fica melhor? Se nenhum servir, é só nos dizer o melhor dia e horário que a gente ajusta. Costuma funcionar melhor fora do horário de pico, entre 14h30 e 17h." },
      { t: "p", x: "Para confirmar, o endereço é [endereço]?" },
    ],
    cta: "Escolher horário pelo WhatsApp",
  },
];

// Depois que a pessoa escolhe o horário. Só WhatsApp.
export const posAgendamento = [
  {
    nome: "Confirmação",
    quando: "Assim que a pessoa escolher o horário",
    texto: "Combinado, [Nome]! Visita agendada.\n\nData: [dia], às [hora]\nEndereço: [endereço]\n\nO nutricionista da Food Guard chega no horário. Se precisar remarcar, é só avisar por aqui.\n\nEquipe Food Guard",
  },
  {
    nome: "Lembrete",
    quando: "Véspera da visita, de manhã",
    texto: "Oi, [Nome]! Confirmando a visita do nutricionista da Food Guard amanhã, [dia] às [hora], no [Estabelecimento].\n\nEstá tudo certo? Se surgir algum imprevisto, é só avisar que a gente remarca.\n\nEquipe Food Guard",
  },
];

// Respostas do SDR. Toda resposta, menos a recusa, termina puxando a visita.
export const respostas = [
  {
    gatilho: "Quanto custa?",
    texto: "A visita é gratuita, [Nome]. Os planos de acompanhamento começam em R$ 1.200 por mês, mas o valor certo depende do que a sua operação precisa, e isso o nutricionista vê na visita. Vamos marcar para você ter esse retrato sem compromisso?",
  },
  {
    gatilho: "Já tenho nutricionista",
    texto: "Ótimo, isso já ajuda bastante. Nesse caso a visita funciona como uma segunda opinião, sem custo: o nosso nutricionista olha a operação com outros olhos e você fica com um retrato independente. Muita cozinha bem acompanhada ainda tem pontos que passam despercebidos. Podemos agendar?",
  },
  {
    gatilho: "Não tenho tempo",
    texto: "Entendo, a rotina de cozinha não para. Por isso a visita é feita com a operação funcionando, sem precisar parar nada, e leva cerca de uma hora. A gente se adapta ao seu horário. Qual dia costuma ser mais tranquilo?",
  },
  {
    gatilho: "Me manda mais informações",
    texto: "Mandamos sim! Qual é o seu e-mail? Adiantando: o que mais ajuda é a visita, porque cada cozinha tem uma realidade diferente. Já aproveito e sugiro um horário junto?",
  },
  {
    gatilho: "O que vocês fazem exatamente?",
    texto: "A Food Guard cuida da parte sanitária da operação: um nutricionista acompanha a cozinha, mantém o Manual de Boas Práticas, os POPs e os registros em dia, orienta a equipe e prepara tudo para a fiscalização. A melhor forma de entender na prática é a visita gratuita, em que o nutricionista mostra o que se aplica ao [Estabelecimento]. Qual dia fica bom?",
  },
  {
    gatilho: "Fui autuado / a vigilância esteve aqui",
    texto: "Obrigado por contar, [Nome]. Nesse caso vale agir rápido, porque o prazo para responder costuma ser curto. Conseguimos priorizar a visita: o nutricionista vai até aí, entende o que foi apontado e orienta os próximos passos. Hoje ou amanhã funciona para você?",
  },
  {
    gatilho: "Agora não / vou pensar",
    texto: "Sem problema, [Nome]. Podemos voltar a falar daqui a 30 dias? Assim a gente não perde o contato e você decide com calma.",
    nota: "Registrar a data de retorno na planilha e voltar com a mensagem de segundo contato.",
  },
  {
    gatilho: "Não tenho interesse / pare de mandar",
    texto: "Tudo bem, [Nome], obrigado pelo retorno. Não vamos mais enviar mensagens. Se um dia precisar, estamos por aqui.",
    nota: "Encerrar na hora e marcar como descadastrado. Não é não: nunca insistir.",
  },
];
