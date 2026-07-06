export default async function handler(req, res) {
  // Add CORS headers for safety
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    let bodyParams;
    if (typeof req.body === 'object') {
      bodyParams = new URLSearchParams(req.body);
    } else {
      bodyParams = new URLSearchParams(req.body);
    }

    const response = await fetch('https://sandbox.sslcommerz.com/gwprocess/v4/api.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: bodyParams.toString(),
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error('SSLCommerz Proxy Error:', err);
    return res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
}
