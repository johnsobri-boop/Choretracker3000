// api/proxy.js — Vercel Serverless Function
// Proxies requests from the browser to Google Apps Script
// Runs on Vercel's servers so there is no CORS issue

export default async function handler(req, res) {
  // Allow requests from the Vercel frontend
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Build the Google Apps Script URL from query params
  const params = new URLSearchParams(req.query);
  const scriptUrl = params.get('scriptUrl');

  if (!scriptUrl) {
    res.status(400).json({ error: 'missing scriptUrl parameter' });
    return;
  }

  // Remove scriptUrl from params before forwarding
  params.delete('scriptUrl');

  const targetUrl = `${scriptUrl}?${params.toString()}`;

  try {
    const response = await fetch(targetUrl, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'ChoreTracker-Proxy/1.0'
      }
    });

    const text = await response.text();

    // Try to parse as JSON
    try {
      const json = JSON.parse(text);
      res.status(200).json(json);
    } catch {
      // Return raw text if not JSON
      res.status(200).send(text);
    }

  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'proxy_error', message: error.message });
  }
}
