const https = require('https');

const PLANS = {
  essencial:    { name: 'Plano Essencial',    price: 'R$ 1.500,00', value: 1500.00 },
  conformidade: { name: 'Plano Conformidade', price: 'R$ 2.700,00', value: 2700.00 },
  premium:      { name: 'Plano Premium',      price: 'R$ 3.800,00', value: 3800.00 },
};

function asaasRequest(method, path, body) {
  const isProduction = process.env.ASAAS_ENV === 'production';
  const baseHost = isProduction ? 'api.asaas.com' : 'sandbox.asaas.com';

  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;
    const options = {
      hostname: baseHost,
      path: '/api/v3' + path,
      method,
      headers: {
        'Content-Type': 'application/json',
        'access_token': process.env.ASAAS_API_KEY,
      },
    };
    if (payload) options.headers['Content-Length'] = Buffer.byteLength(payload);

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch (e) { reject(new Error('Resposta inválida do Asaas')); }
      });
    });
    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

async function findOrCreateCustomer(nome, email, empresa) {
  const search = await asaasRequest('GET', `/customers?email=${encodeURIComponent(email)}&limit=1`);
  if (search.body?.data?.length > 0) return search.body.data[0].id;

  const result = await asaasRequest('POST', '/customers', {
    name: nome,
    email,
    company: empresa,
    notificationDisabled: false,
  });

  if (!result.body?.id) throw new Error('Falha ao criar cliente no Asaas');
  return result.body.id;
}

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido' });

  res.setHeader('Access-Control-Allow-Origin', '*');

  const { nome, email, empresa, plano } = req.body || {};

  if (!nome || !email || !empresa || !plano || !PLANS[plano]) {
    return res.status(400).json({ error: 'Dados obrigatórios ausentes ou plano inválido' });
  }

  if (!process.env.ASAAS_API_KEY) {
    return res.status(500).json({ error: 'Integração de pagamento não configurada' });
  }

  const planData = PLANS[plano];

  try {
    const customerId = await findOrCreateCustomer(nome, email, empresa);

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 3);
    const nextDueDate = dueDate.toISOString().split('T')[0];

    // externalReference guarda os dados do cliente para o webhook acionar o DocuSign
    const externalReference = JSON.stringify({ nome, email, empresa, plano });

    const subscription = await asaasRequest('POST', '/subscriptions', {
      customer: customerId,
      billingType: 'UNDEFINED', // cliente escolhe PIX, boleto ou cartão
      value: planData.value,
      nextDueDate,
      cycle: 'MONTHLY',
      description: planData.name,
      externalReference,
    });

    if (!subscription.body?.id) {
      throw new Error(subscription.body?.errors?.[0]?.description || 'Falha ao criar assinatura');
    }

    // Busca a primeira cobrança gerada para obter o link de pagamento
    const payments = await asaasRequest('GET', `/subscriptions/${subscription.body.id}/payments?limit=1`);
    const firstPayment = payments.body?.data?.[0];
    const paymentUrl = firstPayment?.invoiceUrl || null;

    return res.status(200).json({
      ok: true,
      subscriptionId: subscription.body.id,
      paymentUrl,
      plan: { name: planData.name, price: planData.price },
    });
  } catch (err) {
    console.error('[create-payment] Asaas error:', err.message);
    return res.status(500).json({ error: 'Erro ao configurar pagamento. Entre em contato com a equipe.' });
  }
};
