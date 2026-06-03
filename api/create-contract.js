const docusign = require('docusign-esign');

// Serviços e dados de cada plano — refletem os contratos reais
const PLANS = {
  essencial: {
    name: 'Plano Essencial',
    price: 'R$ 1.500,00',
    priceRaw: 1500,
    services: [
      'Responsabilidade Técnica (RT) no CNPJ junto ao CRN',
      '1 visita técnica presencial por mês',
      'Elaboração do Manual de Boas Práticas de Fabricação (BPF)',
      'Elaboração dos Procedimentos Operacionais Padrão (POPs)',
      'Treinamento semestral da equipe com emissão de ata',
      'Canal direto de comunicação com a nutricionista RT',
    ],
    templateId: process.env.DOCUSIGN_TEMPLATE_ID_ESSENCIAL,
  },
  conformidade: {
    name: 'Plano Conformidade',
    price: 'R$ 2.700,00',
    priceRaw: 2700,
    services: [
      'Responsabilidade Técnica (RT) no CNPJ junto ao CRN',
      '2 visitas técnicas presenciais por mês',
      'Elaboração e manutenção do Manual BPF e POPs',
      'Plano APPCC (Análise de Perigos e Pontos Críticos de Controle)',
      'Auditoria preventiva periódica com relatório de conformidade',
      'Acompanhamento presencial em fiscalizações da vigilância sanitária',
      'Treinamento trimestral da equipe com emissão de ata',
      'Canal direto de comunicação com a nutricionista RT',
    ],
    templateId: process.env.DOCUSIGN_TEMPLATE_ID_CONFORMIDADE,
  },
  premium: {
    name: 'Plano Premium',
    price: 'R$ 3.800,00',
    priceRaw: 3800,
    services: [
      'Responsabilidade Técnica (RT) sênior no CNPJ junto ao CRN',
      'Visitas técnicas presenciais semanais',
      'Plantão de suporte técnico 24/7 via WhatsApp',
      'Manual BPF + APPCC + POPs completos e customizados',
      'Auditoria interna trimestral com relatório executivo',
      'Acompanhamento integral em qualquer fiscalização da vigilância',
      'Treinamento mensal da equipe com emissão de ata e certificado',
      'Relatórios mensais de indicadores de conformidade',
    ],
    templateId: process.env.DOCUSIGN_TEMPLATE_ID_PREMIUM,
  },
};

async function getAccessToken() {
  const apiClient = new docusign.ApiClient();
  apiClient.setBasePath(
    process.env.DOCUSIGN_BASE_URL || 'https://www.docusign.net/restapi'
  );

  // A chave privada vem como variável de ambiente com \n literal — converte de volta para quebras
  const privateKey = (process.env.DOCUSIGN_PRIVATE_KEY || '').replace(/\\n/g, '\n');

  const result = await apiClient.requestJWTUserToken(
    process.env.DOCUSIGN_INTEGRATION_KEY,
    process.env.DOCUSIGN_USER_ID,
    ['signature', 'impersonation'],
    Buffer.from(privateKey),
    3600
  );

  return result.body.access_token;
}

module.exports = async function handler(req, res) {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  res.setHeader('Access-Control-Allow-Origin', '*');

  const { nome, email, empresa, plano } = req.body || {};

  if (!nome || !email || !empresa || !plano || !PLANS[plano]) {
    return res.status(400).json({ error: 'Dados obrigatórios ausentes ou plano inválido' });
  }

  const planData = PLANS[plano];

  if (!planData.templateId) {
    return res
      .status(500)
      .json({ error: `Template DocuSign não configurado para o plano "${plano}"` });
  }

  try {
    const accessToken = await getAccessToken();

    const apiClient = new docusign.ApiClient();
    apiClient.setBasePath(
      process.env.DOCUSIGN_BASE_URL || 'https://www.docusign.net/restapi'
    );
    apiClient.addDefaultHeader('Authorization', 'Bearer ' + accessToken);

    const envelopesApi = new docusign.EnvelopesApi(apiClient);

    // Monta o envelope a partir do template do plano
    const envelopeDefinition = new docusign.EnvelopeDefinition();
    envelopeDefinition.templateId = planData.templateId;
    envelopeDefinition.status = 'sent';
    envelopeDefinition.emailSubject = `Food Guard — Contrato ${planData.name} · ${empresa}`;

    // Signatário: o cliente
    const signer = new docusign.TemplateRole();
    signer.roleName = 'Cliente';  // deve bater com o nome do role no template DocuSign
    signer.name = nome;
    signer.email = email;
    signer.clientUserId = email; // necessário para embedded signing

    // Preenche as variáveis do template
    const today = new Date().toLocaleDateString('pt-BR');
    signer.tabs = new docusign.Tabs();
    signer.tabs.textTabs = [
      { tabLabel: 'cliente_nome',     value: nome },
      { tabLabel: 'cliente_empresa',  value: empresa },
      { tabLabel: 'plano_nome',       value: planData.name },
      { tabLabel: 'plano_valor',      value: planData.price },
      { tabLabel: 'data_contrato',    value: today },
    ];

    envelopeDefinition.templateRoles = [signer];

    const envelopeResult = await envelopesApi.createEnvelope(
      process.env.DOCUSIGN_ACCOUNT_ID,
      { envelopeDefinition }
    );

    const envelopeId = envelopeResult.envelopeId;

    // Gera a URL de assinatura embedded (abre direto no DocuSign)
    const viewRequest = new docusign.RecipientViewRequest();
    viewRequest.returnUrl =
      (process.env.SITE_URL || 'https://foodguard.com.br') +
      '/contrato-assinado.html?plano=' + plano + '&nome=' + encodeURIComponent(nome);
    viewRequest.authenticationMethod = 'none';
    viewRequest.email = email;
    viewRequest.userName = nome;
    viewRequest.clientUserId = email;

    const viewResult = await envelopesApi.createRecipientView(
      process.env.DOCUSIGN_ACCOUNT_ID,
      envelopeId,
      { recipientViewRequest: viewRequest }
    );

    return res.status(200).json({
      ok: true,
      envelopeId,
      signingUrl: viewResult.url,
      plan: {
        name: planData.name,
        price: planData.price,
        services: planData.services,
      },
    });
  } catch (err) {
    console.error('[create-contract] DocuSign error:', err?.response?.body || err.message);
    return res.status(500).json({
      error: 'Erro ao criar contrato. Tente novamente ou fale com a equipe.',
    });
  }
};
