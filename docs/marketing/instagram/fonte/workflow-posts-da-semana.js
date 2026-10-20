export const meta = {
  name: 'dois-posts-da-semana',
  description: 'Escreve, revisa tecnicamente e finaliza dois posts de blog com carrossel de Instagram que levam ao artigo (quarta 21/10 e sábado 24/10)',
  phases: [
    { title: 'Redação', detail: 'pesquisa com fonte e texto do post' },
    { title: 'Revisão', detail: 'revisor tenta derrubar cada afirmação técnica' },
    { title: 'Final', detail: 'post final, carrossel, legenda, stories e ficha do Renan' },
  ],
}

const A = args
const BASE = `Contexto: Food Guard, consultoria nutricional para serviços de alimentação (food service) em São Paulo e Grande SP. Site foodguardassessoria.com.br. Público: dono e gerente de restaurante, padaria, self-service e cozinha de delivery. Instagram @foodguardassessoria. Blog em MDX em /home/user/FOOD-GUARD-/content/blog/. Leia o-que-a-vigilancia-sanitaria-fiscaliza-em-restaurantes.mdx e manual-de-boas-praticas-e-pops-obrigatorios.mdx para pegar o formato e o tom (abertura curta, "## A resposta curta", seções em forma de pergunta, tabela, "## Perguntas frequentes" com ### por pergunta, "## Por onde começar?" e fecho com o diagnóstico).

Ativos de captura, descritos EXATAMENTE como são (leia /home/user/FOOD-GUARD-/lib/diagnostic/questions.ts e /home/user/FOOD-GUARD-/docs/marketing/checklist-80-itens.html antes de escrever qualquer chamada):
- Diagnóstico gratuito, 5 perguntas (foodguardassessoria.com.br/diagnostico): leia as perguntas reais e descreva só o que elas medem.
- Checklist de 80 itens em PDF (foodguardassessoria.com.br/checklist-vigilancia), liberado depois de um cadastro com nome, e-mail, telefone e empresa. Cite só blocos e itens que existem no arquivo.
- Visita de avaliação sem custo com nutricionista.

Regras de marca e de verdade (não negociáveis):
- Posicionamento: "consultoria nutricional para serviços de alimentação". Nunca "empresa de nutricionistas" nem "assessoria de nutricionistas".
- Legislação citada só RDC 216/2004 (Anvisa) e Portaria 2.619/2011 (SMS São Paulo, vale na capital). Nunca "CFN 600", "RT" (use "nutricionista responsável"), "carência", "dinheiro de volta". Não cite norma estadual.
- A RDC 216/2004 exige Manual de Boas Práticas e POPs; não exige nutricionista em todo serviço de alimentação.
- A Food Guard ainda não tem clientes: proibido caso, depoimento, "ajudamos", "avaliamos operações", número de clientes, estatística ou valor de multa sem fonte.
- Nada de número de temperatura, tempo ou frequência que você não tenha conferido em fonte que cite o texto da norma. O texto oficial da norma NÃO abre neste ambiente (WebFetch e curl falham). Use WebSearch e anote, para cada afirmação, o trecho que a fonte cita e a URL. Se não achar fonte que cite o texto, não afirme: escreva como "sugestão de rotina" ou corte.
- Distinga sempre o que é da norma do que é sugestão da Food Guard.
- Links internos permitidos: /blog/manual-de-boas-praticas-e-pops-obrigatorios e /blog/o-que-a-vigilancia-sanitaria-fiscaliza-em-restaurantes. Não linke os posts antigos (usam RT e CFN 600).
- Português do Brasil, natural, sem cara de IA: sem aspas tipográficas, sem travessão longo, sem frase de efeito, sem "não é só X, é Y", sem trio forçado, títulos em sentence case, sem ponto e vírgula em legenda.`

const POST = {
  type: 'object',
  properties: {
    slug: { type: 'string' }, title: { type: 'string', description: 'até 65 caracteres' }, description: { type: 'string', description: 'até 160 caracteres' },
    tag: { type: 'string' }, readingTime: { type: 'string' },
    corpo_mdx: { type: 'string', description: 'corpo em markdown, sem frontmatter, 1.600 a 2.200 palavras, mesmo formato dos posts existentes, com uma tabela e a seção ## Perguntas frequentes com 5 a 7 perguntas em ###' },
    afirmacoes: {
      type: 'array',
      description: 'TODA afirmação técnica do texto (norma, prazo, frequência, obrigação), uma por linha',
      items: { type: 'object', properties: {
        afirmacao: { type: 'string' }, norma: { type: 'string', description: 'RDC 216/2004, Portaria 2.619/2011 ou sugestão da Food Guard' },
        trecho_da_fonte: { type: 'string', description: 'o trecho que a fonte cita, entre aspas simples' }, url: { type: 'string' },
        confianca: { type: 'string', enum: ['alta', 'media', 'baixa'] },
      }, required: ['afirmacao', 'norma', 'trecho_da_fonte', 'url', 'confianca'] },
    },
    incertezas: { type: 'array', items: { type: 'string' } },
  },
  required: ['slug', 'title', 'description', 'tag', 'readingTime', 'corpo_mdx', 'afirmacoes', 'incertezas'],
}
const REV = {
  type: 'object',
  properties: {
    veredito: { type: 'string' },
    problemas: { type: 'array', items: { type: 'object', properties: {
      onde: { type: 'string' }, trecho: { type: 'string', description: 'trecho exato do post' }, problema: { type: 'string' },
      correcao: { type: 'string', description: 'texto substituto pronto, ou "remover"' }, gravidade: { type: 'string', enum: ['alta', 'media', 'baixa'] },
    }, required: ['onde', 'trecho', 'problema', 'correcao', 'gravidade'] } },
  },
  required: ['veredito', 'problemas'],
}
const FINAL = {
  type: 'object',
  properties: {
    post: POST,
    carrossel: {
      type: 'object',
      properties: {
        slides: { type: 'array', description: '8 slides. Slide 1 é a capa (só título, uma pergunta). Do 2 ao 7, um ponto por slide. Slide 8 é o fechamento que leva ao artigo.', items: { type: 'object', properties: {
          titulo: { type: 'string', description: 'até 8 palavras' }, texto: { type: 'string', description: 'até 28 palavras; no fechamento, chama para ler a matéria completa pelo link da bio' },
          destaque: { type: 'string', description: 'palavra ou número curto que vira o elemento visual, opcional' },
          origem: { type: 'string', description: 'Norma (RDC 216) ou Sugestão da Food Guard, opcional' },
        }, required: ['titulo', 'texto'] } },
        legenda: { type: 'string', description: 'até 900 caracteres. Primeira linha segura o leitor. Diz que a matéria completa, com a tabela e as perguntas frequentes, está no link da bio. Termina com uma pergunta para comentário. Sem ponto e vírgula.' },
        hashtags: { type: 'array', items: { type: 'string' } },
        textos_alternativos: { type: 'array', items: { type: 'string' }, description: 'um por slide' },
        stories: { type: 'array', items: { type: 'string' }, description: 'três ideias de stories que levam ao artigo' },
      },
      required: ['slides', 'legenda', 'hashtags', 'textos_alternativos', 'stories'],
    },
    ficha_renan: { type: 'array', description: 'o que o Renan precisa conferir no texto oficial, em ordem de importância', items: { type: 'object', properties: { afirmacao: { type: 'string' }, onde: { type: 'string' }, o_que_conferir: { type: 'string' } }, required: ['afirmacao', 'onde', 'o_que_conferir'] } },
    decisoes: { type: 'array', items: { type: 'string' } },
  },
  required: ['post', 'carrossel', 'ficha_renan', 'decisoes'],
}

phase('Redação')
const resultados = await pipeline(
  A.posts,
  (p, _o, i) => agent(`${BASE}\n\nTarefa: escreva o post do blog para ${p.dia}. Tema: ${p.tema}. Ângulo: ${p.angulo}. Não repita: ${A.existentes.join('; ')}.\nUse WebSearch (máximo de 14 buscas) para ancorar cada afirmação técnica, preencha "afirmacoes" com todas e deixe fora do texto o que não achar fonte. Feche com chamadas honestas para o diagnóstico e o checklist, e para a visita de avaliação sem custo.`, { label: `redação: ${p.chave}`, phase: 'Redação', schema: POST }).then((w) => { if (!w) throw new Error('redação falhou'); return w }),
  (w, p) => agent(`${BASE}\n\nVocê é nutricionista e auditor técnico, e faz a curadoria que o Renan faria. Revise o post abaixo tentando DERRUBAR cada item de "afirmacoes": faça buscas independentes (máximo de 14), procure contradição, atribuição trocada entre RDC 216 e norma estadual, número que varia entre fontes e promessa exagerada. Confira também: a descrição do diagnóstico e do checklist bate com os arquivos reais? Há "RT", "CFN 600", caso inventado, alarmismo, frase de IA? Aponte só problemas reais, com o trecho exato e a correção pronta.\n\nPOST:\n${JSON.stringify(w)}`, { label: `revisão: ${p.chave}`, phase: 'Revisão', schema: REV }).then((r) => { if (!r) throw new Error('revisão falhou'); return { w, r } }),
  ({ w, r }, p) => agent(`${BASE}\n\nAplique as correções procedentes ao post e devolva a versão final completa. O post de blog e o carrossel de Instagram são a MESMA publicação: o carrossel apresenta o essencial em 8 slides e todo o seu objetivo é levar quem vê ao artigo completo pelo link da bio (slide 8, legenda e stories). Cada slide marca se o ponto é da norma ou sugestão da Food Guard. Em "ficha_renan" liste o que o Renan precisa conferir no texto oficial, do mais importante ao menos. Em "decisoes", só o que depende do Rafael.\n\nPOST:\n${JSON.stringify(w)}\n\nREVISÃO:\n${JSON.stringify(r)}`, { label: `final: ${p.chave}`, phase: 'Final', schema: FINAL }).then((f) => f ? { ...f, revisao: r } : null),
)
return resultados
