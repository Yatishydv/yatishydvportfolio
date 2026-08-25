export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Image ID is required' });
  }

  try {
    const url = `https://drive.google.com/thumbnail?id=${id}&sz=w1200`;
    const imageRes = await fetch(url);
    
    if (!imageRes.ok) {
      return res.status(imageRes.status).json({ error: 'Failed to fetch image from Google Drive' });
    }

    // Set standard image headers
    res.setHeader('Content-Type', imageRes.headers.get('content-type') || 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400'); // Cache for 1 day
    
    // Convert array buffer to buffer and send
    const arrayBuffer = await imageRes.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    res.status(200).send(buffer);
  } catch (error) {
    console.error('Image proxy error:', error);
    res.status(500).json({ error: 'Failed to proxy image' });
  }
}
