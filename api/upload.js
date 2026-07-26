import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fileName, fileBase64, contentType } = req.body;

    if (!fileName || !fileBase64 || !contentType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Convert base64 to buffer
    const buffer = Buffer.from(fileBase64, 'base64');

    // Upload to Supabase storage bucket named "media"
    const { data, error } = await supabase.storage
      .from('media')
      .upload(fileName, buffer, {
        contentType,
        upsert: true
      });

    if (error) throw error;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('media')
      .getPublicUrl(fileName);

    return res.status(200).json({ url: publicUrl });
  } catch (err) {
    console.error('Upload error:', err);
    return res.status(500).json({ error: err.message });
  }
}
