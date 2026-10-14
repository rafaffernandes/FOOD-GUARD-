// Fonte única das mensagens do SDR. WhatsApp e e-mail saem daqui, então o
// texto é idêntico nos dois canais. Muda só a embalagem: no e-mail entram
// assunto, assinatura com logo e rodapé.
//
// Campos entre colchetes são preenchidos à mão, lead a lead:
//   [Nome]              só se o nome do dono estiver confirmado; sem nome, use `semNome`
//   [Estabelecimento]   nome limpo, como o dono fala ("Sabor da Vila"). Ajuste o
//                       artigo em toda mensagem: do/da, no/na, o/a, ao/à
//                       ("da Padaria Estrela", "na Padaria Estrela")
//   [origem]            onde o contato foi achado de fato: Google Maps,
//                       Instagram, site, "com a [nome] da equipe de vocês"
//   [dia] [hora]        o dia e o horário combinados com a pessoa
//   [endereço]          endereço da operação, confirmado com a pessoa na mensagem 5

export const WA_NUMERO = "5511976466553";
export const WA_EXIBICAO = "(11) 97646-6553";
export const SITE = "foodguardassessoria.com.br";
export const CNPJ = "60.833.961/0001-73";
export const DIAGNOSTICO = "foodguardassessoria.com.br/diagnostico";
export const PLANOS = "foodguardassessoria.com.br/planos";

// Quem a Food Guard é. Consultoria nutricional para serviços de alimentação
// (food service). Nunca "empresa de nutricionistas" nem "assessoria de
// nutricionistas": o gerar.mjs recusa gerar se alguma dessas aparecer.
export const QUEM_SOMOS = "Food Guard, consultoria nutricional para serviços de alimentação";

// Fechamento padrão: pergunta aberta pelo melhor dia e horário.
const CTA = "Que dia e horário ficam melhores para a visita?";

// ---- Cadência: no máximo três mensagens sem resposta -----------------------
export const cadencia = [
  {
    id: "1-primeiro-contato",
    numero: 1,
    nome: "Primeiro contato",
    quando: "Terça · 14h30 às 17h",
    regra: "A pergunta abre a mensagem, porque é a única parte que aparece na notificação. Depois vêm quem é a Food Guard, o que ela faz e o link do diagnóstico gratuito, para quem quiser conhecer antes de responder.",
    texto:
      "Boa tarde, [Nome]! O Manual de Boas Práticas do [Estabelecimento] está em dia?\n\n" +
      "Pergunto porque ele é um dos primeiros documentos que a Vigilância Sanitária pede numa fiscalização.\n\n" +
      `Aqui é da ${QUEM_SOMOS} em São Paulo. Nosso nutricionista acompanha a operação de perto, mantém a documentação sanitária em dia (Manual de Boas Práticas, POPs e registros) e orienta a equipe, para o [Estabelecimento] estar sempre pronto para a fiscalização.\n\n` +
      `Quer saber como está a sua operação hoje? Faça o diagnóstico gratuito no nosso site: ${DIAGNOSTICO}\n\n` +
      "Achamos o contato de vocês no [origem]. Se preferir não receber mensagens, é só avisar.",
    semNome: "Boa tarde! O Manual de Boas Práticas do [Estabelecimento] está em dia?",
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
    regra: "Uma pergunta nova, sobre um ponto que pega muita operação, e a visita gratuita já oferecida. Nada de \"de novo\" nem de cobrar a resposta anterior.",
    texto:
      "Oi, [Nome]! A temperatura das geladeiras e freezers do [Estabelecimento] é anotada todo dia?\n\n" +
      "Na fiscalização, o que não está registrado conta como não feito.\n\n" +
      "Um nutricionista da Food Guard pode conferir isso e o resto da operação com você numa visita gratuita, sem compromisso. Se fizer sentido, é só me dizer o melhor dia e horário.",
    semNome: "Oi! A temperatura das geladeiras e freezers do [Estabelecimento] é anotada todo dia?",
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
    regra: "Avisa que é a última, oferece a visita e o diagnóstico do site como alternativa, e encerra com educação. Depois dela, o lead sai da lista.",
    texto:
      "[Nome], esta é a última mensagem, para não incomodar.\n\n" +
      "Quer saber como o [Estabelecimento] se sairia numa fiscalização hoje? Um nutricionista da Food Guard vai até aí, conhece a operação com você e mostra o que está em ordem e o que precisa de atenção. A visita é gratuita, e o que ele vê fica entre você e a Food Guard.\n\n" +
      `Se preferir começar pelo site, o diagnóstico gratuito está aqui: ${DIAGNOSTICO}\n\n` +
      "Para a visita, é só me dizer o melhor dia e horário. Obrigado pela atenção e bom trabalho!",
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
      "Sem problema, [Nome], isso acontece bastante! Por isso o primeiro passo é uma visita gratuita: um nutricionista da Food Guard vai até o [Estabelecimento], conhece a operação com você e mostra o que já está em ordem e o que precisa de atenção. O que ele vê fica entre você e a Food Guard.\n\n" +
      "Se depois vocês quiserem ajuda para acertar o que faltar, a gente apresenta o plano que faz sentido para a operação. Se não, vocês já saem sabendo o que ajustar.\n\n" +
      `E se preferir conhecer a gente antes, dá para fazer o diagnóstico gratuito no site: ${DIAGNOSTICO}\n\n` +
      CTA,
  },
  {
    id: "4b-respondeu-sim",
    letra: "4b",
    nome: "Respondeu \"sim\" à pergunta do Manual ou da temperatura",
    quando: "Em até 5 minutos",
    texto:
      "Ótimo, [Nome]! Na fiscalização, o que costuma pegar é a rotina não bater com o que está no Manual: temperatura anotada, higienização, treinamento da equipe.\n\n" +
      "Por isso a gente começa com uma visita gratuita: um nutricionista da Food Guard vai até o [Estabelecimento], confere com você se o dia a dia está igual ao papel e mostra o que vale ajustar.\n\n" +
      CTA,
  },
  {
    id: "4c-quer-marcar",
    letra: "4c",
    nome: "Já quer marcar (\"sim\" à mensagem 2 ou à 3)",
    quando: "Em até 5 minutos",
    texto:
      "Que bom, [Nome]! O nutricionista da Food Guard vai até o [Estabelecimento], conhece a operação com você e mostra o que está em ordem e o que precisa de atenção. A visita é gratuita e sem compromisso.\n\n" +
      CTA,
  },
  {
    id: "5-marcando",
    letra: "5",
    nome: "Escolheu o dia",
    quando: "Assim que a pessoa escolher",
    texto:
      "Combinado: [dia], às [hora].\n\n" +
      "Só para confirmar: o endereço é [endereço] e quem recebe o nutricionista é você mesmo? Ele chega identificado como Food Guard. Na véspera a gente manda um lembrete.",
    nota: "Se quem recebe for outra pessoa, anotar o nome na planilha e usar esse nome na confirmação.",
  },
];

// ---- Depois de marcada -----------------------------------------------------
export const posAgendamento = [
  {
    id: "confirmacao",
    nome: "Confirmação",
    quando: "Assim que o endereço for confirmado",
    texto:
      "Visita agendada, [Nome]!\n\n" +
      "Data: [dia], às [hora]\nEndereço: [endereço]\nQuem vai: um nutricionista da Food Guard\n\n" +
      "Se precisar remarcar, é só avisar por aqui. Até lá!\n\nEquipe Food Guard",
    semNome: "Visita agendada!",
  },
  {
    id: "lembrete",
    nome: "Lembrete",
    quando: "Véspera da visita, de manhã",
    texto:
      "Oi, [Nome]! Passando para lembrar da visita do nutricionista da Food Guard amanhã, [dia] às [hora], no [Estabelecimento].\n\n" +
      "Está tudo certo? Se surgir algum imprevisto, é só avisar que a gente remarca.\n\nEquipe Food Guard",
    semNome: "Oi! Passando para lembrar da visita do nutricionista da Food Guard amanhã, [dia] às [hora], no [Estabelecimento].",
    nota: "Sem resposta até o fim do dia: na manhã da visita, mandar \"Bom dia, [Nome]! O nutricionista da Food Guard passa hoje às [hora] no [Estabelecimento]. Segue de pé?\". Sem resposta até duas horas antes, ligar para o estabelecimento antes de o nutricionista sair.",
  },
  {
    id: "nao-aconteceu",
    nome: "A visita não aconteceu",
    quando: "No mesmo dia",
    texto:
      "Oi, [Nome]! O nutricionista da Food Guard passou hoje às [hora] no [Estabelecimento], mas não deu para fazer a visita. Imagino que tenha surgido algum imprevisto.\n\n" +
      "Vamos remarcar? Me diz o dia e o horário que ficam melhores para você.\n\nEquipe Food Guard",
    nota: "Sem resposta, uma retomada em 30 dias. Segunda falta: encerrar.",
  },
];

// ---- Roteiro do SDR --------------------------------------------------------
// Toda resposta fecha puxando a visita, menos a recusa e os pedidos que mudam
// o caminho (ligar, mandar por e-mail, falar com o responsável, voltar depois).
export const respostas = [
  {
    gatilho: "Quanto custa?",
    texto: `Depende da operação, [Nome]. A visita é gratuita, e os planos são montados para cada modelo de negócio: o que um restaurante precisa é diferente do que uma padaria ou uma cozinha de delivery precisa. Na visita, o nutricionista conhece a operação e a gente apresenta o plano que faz sentido, sem compromisso. ${CTA}`,
  },
  {
    gatilho: "Quais são os planos? Qual a diferença?",
    texto: `Temos planos com frequências de visita e níveis de acompanhamento diferentes, e você vê todos em ${PLANOS}. O jeito mais certeiro de saber qual serve para o [Estabelecimento] é a visita gratuita: o nutricionista conhece a operação e a gente indica o plano ideal. Quer agendar? Me diz o melhor dia e horário.`,
  },
  {
    gatilho: "Isso é obrigatório?",
    texto: `O Manual de Boas Práticas e os POPs são, sim. A RDC 216/2004 da Anvisa exige os dois em todo serviço de alimentação, e na cidade de São Paulo a Portaria 2.619/2011 cobra o mesmo. A boa notícia é que dá para resolver sem dor de cabeça: na visita gratuita, o nutricionista mostra exatamente o que se aplica ao [Estabelecimento]. ${CTA}`,
    nota: "Só para quando a dúvida for o Manual. Ter nutricionista não é obrigatório em todo serviço, e a visita é opcional. Fora da capital, corte a frase da Portaria.",
  },
  {
    gatilho: "Quem é? De onde tirou meu número? É da Vigilância?",
    texto: `Somos a ${QUEM_SOMOS} aqui de São Paulo. Não temos nenhuma ligação com a Vigilância Sanitária: o nosso trabalho é deixar a operação pronta para ela. Achamos o contato do [Estabelecimento] no [origem], e você pode conhecer a gente em ${SITE}. Se fizer sentido, um nutricionista nosso faz uma visita gratuita para conhecer a operação. Quer agendar? E se preferir que a gente não escreva mais, é só avisar.`,
  },
  {
    gatilho: "O que vocês fazem exatamente?",
    texto: `A Food Guard é uma consultoria nutricional para serviços de alimentação. Na prática, um nutricionista acompanha a operação com visitas regulares, mantém a documentação sanitária em dia (POPs, registros e, conforme o plano, o Manual de Boas Práticas), orienta a equipe e deixa tudo pronto para a fiscalização. O melhor começo é a visita gratuita, em que o nutricionista mostra o que se aplica ao [Estabelecimento]. ${CTA}`,
  },
  {
    gatilho: "Quem vai vir?",
    texto: `Vai um nutricionista da Food Guard, com registro no CRN, o conselho dos nutricionistas. Ele chega identificado como Food Guard e conhece a operação junto com você. ${CTA}`,
    nota: "Se você aprovar o nome e o CRN na confirmação (seção 11), acrescentar antes da pergunta: \"O nome dele vai na confirmação.\"",
  },
  {
    gatilho: "Com quem eu falo? É robô?",
    texto: "Não é robô, não! Aqui é do atendimento da Food Guard, a gente cuida da agenda das visitas. Pode perguntar o que quiser. E se a visita gratuita fizer sentido, é só me dizer o melhor dia e horário.",
    nota: "Não dar nome próprio: quem assina é a empresa.",
  },
  {
    gatilho: "Já tenho nutricionista",
    texto: "Que bom, isso já ajuda muito! A ideia não é substituir ninguém. A visita gratuita da Food Guard funciona como uma segunda opinião antes da próxima fiscalização: um nutricionista confere se a rotina está batendo com o papel. Quer agendar? Me diz o melhor dia e horário.",
  },
  {
    gatilho: "Aqui é só delivery, isso vale para mim?",
    texto: `Vale, sim! Cozinha que só entrega segue as mesmas regras de boas práticas de um restaurante, inclusive o Manual. E o delivery tem pontos próprios, como embalagem e transporte, que o nutricionista olha na visita gratuita. ${CTA}`,
  },
  {
    gatilho: "Vocês atendem na minha região?",
    texto: `Atendemos, sim! A Food Guard atende a cidade de São Paulo e a Grande SP, e [bairro ou cidade] está dentro. A visita gratuita é feita no próprio [Estabelecimento]. ${CTA}`,
    nota: "Fora da área: \"Por enquanto a Food Guard atende só a cidade de São Paulo e a Grande SP, então não conseguimos levar o nutricionista até aí. Obrigado pela atenção e bom trabalho!\" Status encerrado.",
  },
  {
    gatilho: "Fui autuado / tenho prazo para regularizar",
    texto: "Entendi, [Nome]. Nesse caso vale agir rápido, e a gente pode ajudar. Dá para priorizar uma visita gratuita: o nutricionista vai até aí, entende o que foi apontado e mostra os próximos passos para regularizar. Se puder, deixa separado o documento que a fiscalização deixou. Qual é o primeiro dia e horário que você consegue?",
    nota: "Encaixe nos primeiros horários livres da agenda, mesmo que tirem outra visita do lugar.",
  },
  {
    gatilho: "Me manda mais informações",
    texto: `Claro! No nosso site você conhece o trabalho da Food Guard e pode fazer um diagnóstico gratuito da operação: ${DIAGNOSTICO}. Mas o que mais ajuda mesmo é a visita gratuita, porque cada operação tem uma realidade e o nutricionista mostra o que vale para o [Estabelecimento]. Quer agendar? Me diz o melhor dia e horário.`,
  },
  {
    gatilho: "Manda por e-mail",
    texto: "Mando, sim! Qual é o seu e-mail? Vou te mandar como funciona a visita gratuita e o link do nosso diagnóstico, e você pode responder por lá mesmo.",
    nota: "Mandar por e-mail o texto da 4a, com a assinatura, assunto \"[Estabelecimento]: visita gratuita do nutricionista\". Trocar o canal na planilha.",
  },
  {
    gatilho: "Me liga",
    texto: "Ligo, sim! Pode ser agora ou prefere outro horário hoje?",
    nota: "Na ligação, apresentar-se como atendimento da Food Guard, sem nome próprio, responder a dúvida e fechar dia e hora da visita gratuita. Depois, mandar a mensagem 5 por escrito para o combinado ficar registrado.",
  },
  {
    gatilho: "Atendente: o dono não está",
    texto: "Tudo bem! E quem é o responsável pela operação aí? É para oferecer uma visita gratuita de um nutricionista da Food Guard. Pode me passar o contato ou o melhor horário para falar com ele?",
    nota: "Recebeu o contato: começar a cadência com o responsável pela mensagem 1, citando quem passou (\"Boa tarde, [Nome]! A [quem passou] do [Estabelecimento] passou seu contato: o Manual de Boas Práticas está em dia?\"). Recebeu só um horário: escrever de novo neste número nesse horário. Sem retorno, segue a cadência neste número.",
  },
  {
    gatilho: "Esses dias não dá / preciso remarcar",
    texto: "Sem problema, [Nome]! Me diz o dia e o período que ficam melhores para você que a gente se ajusta.",
    nota: "Se a visita já estava marcada, mandar a confirmação de novo com a nova data. Segunda remarcação sem data definida: tratar como \"agora não\".",
  },
  {
    gatilho: "Respondeu e sumiu",
    texto: "Oi, [Nome]! Conseguiu ver um dia para a visita gratuita do nutricionista? É só me dizer o dia e o horário que ficam melhores para o [Estabelecimento] que a gente agenda.",
    nota: "Uma única retomada, dois dias úteis depois, no horário de envio. Sem resposta, encerra. Nunca reenviar a cadência.",
  },
  {
    gatilho: "Agora não / vou pensar",
    texto: "Sem problema! Posso voltar a falar com você daqui a um mês?",
    nota: "Só volte se a pessoa topar: status \"retorno em [data]\" na planilha. Na data, uma mensagem só, fora da cadência: \"Oi, [Nome]! Como combinamos, voltando a falar da visita gratuita do nutricionista no [Estabelecimento]. Que dia e horário ficam melhores para você?\" Sem resposta, encerra. Se ela disser que não precisa voltar, trate como recusa.",
  },
  {
    gatilho: "Não tenho interesse / sair / resposta grosseira",
    texto: "Tudo bem, não vamos mais mandar mensagem. Se um dia precisar, é só chamar aqui. Bom trabalho!\n\nEquipe Food Guard",
    nota: "Encerrar na hora e marcar como descadastrado. Convite de agenda para quem recusou vira denúncia e derruba o número.",
  },
];

// Mensagem automática do WhatsApp Business (saudação, cardápio) não conta
// como resposta: o lead segue na cadência. Áudio do lead conta: ouvir,
// responder por texto começando pelo que a pessoa disse e anotar na planilha.
// O SDR não manda áudio.
