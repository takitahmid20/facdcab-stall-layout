import { parse } from 'querystring';

// Helper to parse urlencoded body on Vercel Node runtime if not auto-parsed
const getRawBody = async (req) => {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      resolve(parse(body));
    });
  });
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  try {
    const { status } = req.query; // success, fail, cancel
    
    // Parse urlencoded parameters from the body
    let params = req.body;
    if (typeof req.body === 'string' || !req.body) {
      params = await getRawBody(req);
    }

    const proto = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers['host'];
    const origin = `${proto}://${host}`;

    const redirectUrl = `${origin}/?payment_status=${status || 'success'}&tran_id=${params.tran_id || ''}&amount=${params.amount || ''}&bank_tran_id=${params.bank_tran_id || ''}`;

    res.writeHead(302, { Location: redirectUrl });
    res.end();
  } catch (err) {
    console.error('SSLCommerz Callback Redirect Error:', err);
    return res.status(500).send('Callback Redirection Error');
  }
}
