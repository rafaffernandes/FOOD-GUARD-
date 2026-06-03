const docusign = require('docusign-esign');

const PLANS = {
  essencial:    { name: 'Plano Essencial',    price: 'R$ 1.500,00', templateId: () => process.env.DOCUSIGN_TEMPLATE_ID_ESSENCIAL },
  conformidade: { name: 'Plano Conformidade', price: 'R$ 2.700,00', templateId: () => process.env.DOCUSIGN_TEMPLATE_ID_CONFORMIDADE },
  premium:      { name: 'Plano Premium',      price: 'R$ 3.800,00', templateId: () => process.env.DOCUSIGN_TEMPLATE_ID_PREMIUM },
};

async function getAccessToken() {
  const apiClient = new docusign.ApiClient();
  apiClient.setBasePath(process.env.DOCUSIGN_BASE_URL || 'https://www.docusign.net/restapi');

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

async function sendContract(nome, email, empresa, plano) {
  const planData = PLANS[plano];
  if (!planData) throw new Error('Plano inválido: ' + plano);

  const templateId = planData.templateId();
  if (!templateId) throw new Error('Template DocuSign não configurado para ' + plano);

  const accessToken = await getAccessToken();
  const apiClient = new docusign.ApiClient();
  apiClient.setBasePath(process.env.DOCUSIGN_BASE_URL || 'https://www.docusign.net/restapi');
  apiClient.addDefaultHeader('Authorization', 'Bearer ' + accessToken);

  const envelopesApi = new docusign.EnvelopesApi(apiClient);

  const envelopeDefinition = new docusign.EnvelopeDefinition();
  envelopeDefinition.templateId = templateId;
  envelopeDefinition.status = 'sent';
  envelopeDefinition.emailSubject = `Food Guard — Contrato ${planData.name} · ${empresa}`;

  const signer = new docusign.TemplateRole();
  signer.roleName = 'Cliente';
  signer.name = nome;
  signer.email = email;

  const today = new Date().toLocaleDateString('pt-BR');
  signer.tabs = new docusign.Tabs();
  signer.tabs.textTabs = [
    { tabLabel: 'cliente_nome',    value: nome },
    { tabLabel: 'cliente_empresa', value: empresa },
    { tabLabel: 'plano_nome',      value: planData.name },
    { tabLabel: 'plano_valor',     value: planData.price },
    { tabLabel: 'data_contrato',   value: today },
  ];

  envelopeDefinition.templateRoles = [signer];

  const result = await envelopesApi.createEnvelope(
    process.env.DOCUSIGN_ACCOUNT_ID,
    { envelopeDefinition }
  );

  return result.envelopeId;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const event = req.body;

  // Só processa pagamentos confirmados
  if (event?.event !== 'PAYMENT_CONFIRMED' && event?.event !== 'PAYMENT_RECEIVED') {
    return res.status(200).json({ ignored: true });
  }

  const payment = event.payment;
  if (!payment?.externalReference) return res.status(200).json({ ignored: true });

  let customerData;
  try {
    customerData = JSON.parse(payment.externalReference);
  } catch {
    return res.status(200).json({ ignored: true });
  }

  const { nome, email, empresa, plano } = customerData;
  if (!nome || !email || !empresa || !plano) return res.status(200).json({ ignored: true });

  try {
    const envelopeId = await sendContract(nome, email, empresa, plano);
    console.log('[payment-webhook] Contrato enviado:', envelopeId, 'para', email);
    return res.status(200).json({ ok: true, envelopeId });
  } catch (err) {
    console.error('[payment-webhook] Erro ao enviar contrato:', err.message);
    return res.status(500).json({ error: err.message });
  }
};
