// api/proxy.js — Vercel Serverless Function
// Proxies requests from the browser to Google Apps Script
// Runs server-side so there is no CORS issue

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const params = new URLSearchParams(req.query);
  const scriptUrl = params.get('scriptUrl');

  if (!scriptUrl) {
    res.status(400).json({ error: 'missing scriptUrl parameter' });
    return;
  }

  params.delete('scriptUrl');

  const targetUrl = `${scriptUrl}?${params.toString()}`;

  try {
    const response = await fetch(targetUrl, {
      method: 'GET',
      redirect: 'follow',
      headers: { 'Accept': 'application/json' }
    });

    const text = await response.text();

    try {
      const json = JSON.parse(text);
      res.status(200).json(json);
    } catch {
      res.status(200).send(text);
    }

  } catch (error) {
    res.status(500).json({ error: 'proxy_error', message: error.message });
  }
};
