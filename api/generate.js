export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Server missing GEMINI_API_KEY environment variable. Sila hubungi Admin." });
  }

  const { modelType, payload } = req.body;

  // List of candidate models in priority order with graceful fallback
  const candidateModels = modelType === 'pro' 
    ? ['gemini-2.0-flash', 'gemini-1.5-pro', 'gemini-1.5-flash']
    : ['gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-2.5-flash'];

  let lastError = null;

  for (const model of candidateModels) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        return res.status(200).json(data);
      }

      const errText = await response.text();
      lastError = `Model ${model} returned HTTP ${response.status}: ${errText}`;
      console.warn(lastError);
    } catch (error) {
      lastError = `Model ${model} fetch failed: ${error.message}`;
      console.warn(lastError);
    }
  }

  return res.status(500).json({ error: lastError || "Gagal menghubungi layanan AI." });
}
