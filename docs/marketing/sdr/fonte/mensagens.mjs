// Fonte única das mensagens do SDR. WhatsApp e e-mail saem daqui, então o
// texto é idêntico nos dois canais. Muda só a embalagem: no e-mail entram
// assunto, assinatura com logo e rodapé.
//
// Campos entre colchetes são preenchidos à mão, lead a lead:
//   [Nome]              só se o nome do dono estiver confirmado; sem nome, use `semNome`
//   [Estabelecimento]   nome limpo, como o dono fala ("Sabor da Vila"). Ajuste o
//                       artigo em toda mensagem: do/da, no/na, o/a, ao/à
//                       ("da Padaria Estrela", "na Padaria Estrela")
//   [tipo de operação]  categoria ampla, no plural: restaurantes, padarias,
//                       lanchonetes, cozinhas de delivery
//   [origem]            onde o contato foi achado de fato: Google Maps,
//                       Instagram, site, "com a [nome] da equipe de vocês"
//   [dia] [hora]        os dois primeiros horários livres da agenda do nutricionista
//   [endereço]          endereço da operação, confirmado com a pessoa na mensagem 5

export const WA_NUMERO = "5511976466553";
export const WA_EXIBICAO = "(11) 97646-6553";
export const SITE = "foodguardassessoria.com.br";
export const CNPJ = "60.833.961/0001-73";

// ---- Cadência: no máximo três mensagens sem resposta -----------------------
export const cadencia = [
  {
    id: "1-primeiro-contato",
    numero: 1,
    nome: "Primeiro contato",
    quando: "Terça · 14h30 às 17h",
    regra: "A pergunta vai na primeira linha, porque é a única parte que aparece na notificação. Depois, quem é a Food Guard e de onde veio o contato, que é a primeira dúvida de quem recebe.",
    texto:
      "Boa tarde, [Nome]. O Manual de Boas Práticas do [Estabelecimento] está em dia?\n\n" +
      "Aqui é da Food Guard, nutricionistas que cuidam da parte sanitária de [tipo de operação] em São Paulo. Pergunto porque o Manual é um dos primeiros documentos que a Vigilância Sanitária pede.\n\n" +
      "Achamos o contato de vocês no [origem]. Se preferir não receber mensagens, é só avisar.",
    semNome: "Boa tarde. O Manual de Boas Práticas do [Estabelecimento] está em dia?",
    email: {
      assunto: "[Estabelecimento]: o Manual de Boas Práticas está em dia?",
      fio: "novo",
    },
  },
  {
    id: "2-segundo-contato",
    numero: 2,
    nome: "Segundo contato",
    quando: "Sexta · só se não respondeu",
    regra: "Uma pergunta nova, sobre um ponto que pega muita cozinha, e a visita gratuita já oferecida. Nada de \"de novo\" nem de cobrar a resposta anterior.",
    texto:
      "[Nome], a temperatura das geladeiras e freezers do [Estabelecimento] é anotada todo dia?\n\n" +
      "Na fiscalização, o que não está registrado conta como não feito.\n\n" +
      "Um nutricionista da Food Guard confere isso e o resto da cozinha numa visita gratuita, sem compromisso. Quer que a gente marque um horário?",
    semNome: "A temperatura das geladeiras e freezers do [Estabelecimento] é anotada todo dia?",
    email: {
      assunto: "Re: [Estabelecimento]: o Manual de Boas Práticas está em dia?",
      fio: "resposta",
    },
  },
  {
    id: "3-ultima-tentativa",
    numero: 3,
    nome: "Última tentativa",
    quando: "Terça seguinte · só se não respondeu",
    regra: "Avisa que é a última, oferece a visita com um pedido simples e encerra com educação. Depois dela, o lead sai da lista.",
    texto:
      "[Nome], esta é a última mensagem, para não incomodar.\n\n" +
      "Quer saber como o [Estabelecimento] se sairia numa fiscalização hoje? A gente manda um nutricionista até a sua cozinha para uma visita gratuita. Leva cerca de uma hora, não precisa parar a operação e o que ele vê fica entre você e a Food Guard.\n\n" +
      "Se quiser marcar, é só responder que sim e a gente combina o dia. Se não for o momento, obrigado e bom trabalho.",
    semNome: "Esta é a última mensagem, para não incomodar.",
    email: {
      assunto: "Re: [Estabelecimento]: o Manual de Boas Práticas está em dia?",
      fio: "resposta",
    },
  },
];

// ---- Respondeu: sai da cadência e cai aqui ---------------------------------
// Antes do texto-base, uma ou duas frases respondem o que a pessoa perguntou
// ou contou. Resposta que ignora a pergunta soa robô e derruba a visita.
export const agendamento = [
  {
    id: "4a-respondeu-nao",
    letra: "4a",
    nome: "Respondeu \"não\" ou \"não sei\"",
    quando: "Em até 5 minutos",
    texto:
      "Tranquilo, isso é bem comum. O primeiro passo é uma visita gratuita: um nutricionista da Food Guard vai até o [Estabelecimento], olha a cozinha com você e mostra o que está em ordem e o que falta. Leva cerca de uma hora, não precisa parar a operação e o que ele vê fica entre você e a Food Guard.\n\n" +
      "Se depois vocês quiserem ajuda para acertar o que faltar, a gente apresenta os planos. Se não, já saem sabendo o que ajustar.\n\n" +
      "Fica melhor [dia] ou [dia], por volta das [hora]?",
  },
  {
    id: "4b-respondeu-sim",
    letra: "4b",
    nome: "Respondeu \"sim\" (o Manual está em dia)",
    quando: "Em até 5 minutos",
    texto:
      "Ótimo. Na fiscalização, o que costuma pegar é a rotina não bater com o que está no Manual: temperatura anotada, higienização, treinamento da equipe.\n\n" +
      "Por isso a gente começa com uma visita gratuita: um nutricionista da Food Guard vai até o [Estabelecimento], confere com você se o dia a dia está igual ao papel e mostra o que ajustar. Leva cerca de uma hora e não precisa parar a operação.\n\n" +
      "Fica melhor [dia] ou [dia], por volta das [hora]?",
  },
  {
    id: "4c-quer-marcar",
    letra: "4c",
    nome: "Já quer marcar (\"sim\" à mensagem 2 ou à 3)",
    quando: "Em até 5 minutos",
    texto:
      "Ótimo! O nutricionista da Food Guard vai até o [Estabelecimento], olha a cozinha com você e mostra o que está em ordem e o que falta. A visita é gratuita, leva cerca de uma hora e não precisa parar a operação.\n\n" +
      "Fica melhor [dia] ou [dia], por volta das [hora]?",
  },
  {
    id: "5-marcando",
    letra: "5",
    nome: "Escolheu o dia",
    quando: "Assim que a pessoa escolher",
    texto:
      "Combinado: [dia], às [hora].\n\n" +
      "Só para confirmar o endereço: é [endereço]? O nutricionista chega identificado como Food Guard e a visita leva cerca de uma hora. Na véspera a gente manda um lembrete.",
  },
];

// ---- Depois de marcada -----------------------------------------------------
export const posAgendamento = [
  {
    id: "confirmacao",
    nome: "Confirmação",
    quando: "Assim que o endereço for confirmado",
    texto:
      "Visita agendada, [Nome].\n\n" +
      "Data: [dia], às [hora]\nEndereço: [endereço]\nQuem vai: um nutricionista da Food Guard\n\n" +
      "Se precisar remarcar, é só avisar por aqui.\n\nEquipe Food Guard",
    semNome: "Visita agendada.",
  },
  {
    id: "lembrete",
    nome: "Lembrete",
    quando: "Véspera da visita, de manhã",
    texto:
      "Oi, [Nome]! Confirmando a visita do nutricionista da Food Guard amanhã, [dia] às [hora], no [Estabelecimento].\n\n" +
      "Está tudo certo? Se surgir algum imprevisto, é só avisar que a gente remarca.\n\nEquipe Food Guard",
    semNome: "Oi! Confirmando a visita do nutricionista da Food Guard amanhã, [dia] às [hora], no [Estabelecimento].",
  },
];

// ---- Roteiro do SDR --------------------------------------------------------
// Toda resposta termina com duas opções de horário, menos a recusa, o "agora
// não" e a do atendente, que pede o contato de quem decide.
export const respostas = [
  {
    gatilho: "Quanto custa?",
    texto: "A visita é gratuita mesmo, sem compromisso. Os planos são mensais e vão de R$ 1.200 a R$ 3.400; o Manual de Boas Práticas entra a partir do Essencial, de R$ 2.300. Qual faz sentido depende do que o nutricionista vir na cozinha. Fica melhor [dia] ou [dia], por volta das [hora]?",
  },
  {
    gatilho: "Isso é obrigatório?",
    texto: "O Manual de Boas Práticas e os POPs são, sim. A RDC 216/2004 da Anvisa pede os dois em todo serviço de alimentação, e na cidade de São Paulo a Portaria 2.619/2011 cobra o mesmo. Na visita gratuita, o nutricionista mostra o que se aplica ao [Estabelecimento]. Fica melhor [dia] ou [dia], por volta das [hora]?",
    nota: "Só para quando a dúvida for o Manual. Ter nutricionista não é obrigatório em todo serviço, e a visita é opcional. Fora da capital, corte a frase da Portaria.",
  },
  {
    gatilho: "Quem é? De onde tirou meu número? É da Vigilância?",
    texto: "Somos uma empresa particular de nutricionistas, sem ligação com a Vigilância Sanitária. Achamos o contato do [Estabelecimento] no [origem], e dá para conhecer a gente em foodguardassessoria.com.br. A visita do nutricionista é gratuita e leva cerca de uma hora. Fica melhor [dia] ou [dia], por volta das [hora]? Se preferir que a gente não escreva mais, é só avisar.",
  },
  {
    gatilho: "O que vocês fazem exatamente?",
    texto: "A Food Guard cuida da parte sanitária da operação: um nutricionista visita a cozinha com frequência, mantém em dia os POPs e os registros e prepara tudo para a fiscalização. Conforme o plano, entram também o Manual de Boas Práticas e o treinamento da equipe. A melhor forma de ver o que se aplica ao [Estabelecimento] é a visita gratuita. Fica melhor [dia] ou [dia], por volta das [hora]?",
  },
  {
    gatilho: "Já tenho nutricionista",
    texto: "Ótimo, a ideia não é substituir ninguém. A visita gratuita da Food Guard funciona como segunda opinião antes da próxima fiscalização: um nutricionista confere se a rotina está batendo com o papel. Fica melhor [dia] ou [dia], por volta das [hora]?",
  },
  {
    gatilho: "Aqui é só delivery, isso vale para mim?",
    texto: "Vale, sim. Cozinha que só entrega segue as mesmas regras de boas práticas de um restaurante, inclusive o Manual. Na visita gratuita, o nutricionista olha o que pesa numa operação de delivery. Fica melhor [dia] ou [dia], por volta das [hora]?",
  },
  {
    gatilho: "Fui autuado / tenho prazo para regularizar",
    texto: "Entendi, [Nome]. Então vale agir rápido. Dá para priorizar uma visita gratuita: o nutricionista vai até aí, entende o que foi apontado e mostra os próximos passos. Fica melhor [dia] ou [dia], por volta das [hora]?",
    nota: "Ofereça os dois primeiros horários livres da agenda, mesmo que tirem outra visita do lugar.",
  },
  {
    gatilho: "Me manda mais informações",
    texto: "Mando, sim: foodguardassessoria.com.br. Mas o que mais ajuda é uma visita gratuita do nutricionista, porque cada cozinha tem uma realidade diferente e ele mostra o que vale para o [Estabelecimento]. Fica melhor [dia] ou [dia], por volta das [hora]?",
  },
  {
    gatilho: "Atendente: o dono não está",
    texto: "Tudo bem! E quem cuida da cozinha aí? É para oferecer uma visita gratuita de um nutricionista. Pode me passar o contato ou o melhor horário para falar?",
  },
  {
    gatilho: "Agora não / vou pensar",
    texto: "Sem problema. Posso voltar a falar com você daqui a um mês?",
    nota: "Só volte se a pessoa topar. Na data, uma mensagem só, fora da cadência: \"Oi, [Nome]. Como combinamos, voltando a falar da visita gratuita do nutricionista no [Estabelecimento]. Fica melhor [dia] ou [dia], por volta das [hora]?\" Sem resposta, encerra. Se ela disser que não precisa voltar, trate como recusa.",
  },
  {
    gatilho: "Não tenho interesse / sair / resposta grosseira",
    texto: "Tudo bem, não vamos mais mandar mensagem. Se um dia quiser a visita gratuita, é só chamar aqui.\n\nEquipe Food Guard",
    nota: "Encerrar na hora e marcar como descadastrado. Convite de agenda para quem recusou vira denúncia e derruba o número.",
  },
];

// Mensagem automática do WhatsApp Business (saudação, cardápio) não conta
// como resposta: o lead segue na cadência.
