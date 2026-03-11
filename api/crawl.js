export default async function handler(req, res) {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;

  if (!accountId || !apiToken) {
    return res.status(401).json({ error: { message: "Faltan credenciales de Cloudflare en Vercel." } });
  }

  // Si recibimos GET, verificamos el estatus de un Job ID.
  if (req.method === 'GET') {
    const { jobId } = req.query;
    if (!jobId) return res.status(400).json({ error: { message: "Falta el jobId." } });

    try {
      const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/browser-rendering/crawl/${jobId}`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${apiToken}` }
      });
      const data = await response.json();
      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ error: { message: err.message } });
    }
  }

  // Si recibimos POST, iniciamos un nuevo escaneo (Crawler).
  if (req.method === 'POST') {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: { message: "Falta la URL oficial." } });

    try {
      const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/browser-rendering/crawl`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ url })
      });
      const data = await response.json();
      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ error: { message: err.message } });
    }
  }

  return res.status(405).json({ error: { message: 'Method Not Allowed' } });
}
