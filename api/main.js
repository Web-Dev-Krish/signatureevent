import supabase from './db-client.js';

const tableMap = {
  'venues': 'venues',
  'events': 'events',
  'catering': 'catering_items',
  'blogs': 'blogs',
  'testimonials': 'testimonials',
  'contact': 'contact_messages',
  'bookings': 'bookings',
  'signature-events': 'signature_events',
  'gallery': 'gallery',
  'videos': 'videos',
  'faqs': 'faqs'
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  const endpoint = req.query.table;
  const table = tableMap[endpoint];

  if (!table) {
    return res.status(404).json({ error: 'Endpoint not found' });
  }

  try {
    if (req.method === 'GET') {
      let query = supabase.from(table).select('*');
      
      if (endpoint === 'venues') {
        if (req.query.id) {
          const { data, error } = await query.eq('id', req.query.id).single();
          if (error) throw error;
          return res.status(200).json(data);
        }
        if (req.query.limit) query = query.limit(parseInt(req.query.limit));
        query = query.order('rating', { ascending: false });
      } else if (endpoint === 'events') {
        query = query.order('date', { ascending: false });
      } else if (endpoint === 'blogs') {
        query = query.order('published_at', { ascending: false });
      } else if (endpoint === 'bookings') {
        query = query.order('created_at', { ascending: false });
      } else if (endpoint === 'testimonials' || endpoint === 'faqs') {
        query = query.order('id', { ascending: true });
      } else if (endpoint === 'gallery' || endpoint === 'videos') {
        query = query.order('created_at', { ascending: false });
      }

      const { data, error } = await query;
      if (error) throw error;
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      let payload = { ...req.body };
      
      if (endpoint === 'bookings') {
        payload.guests = parseInt(payload.guests || 0);
        payload.status = 'pending';
      } else if (endpoint === 'contact') {
        payload.status = 'new';
      } else if (endpoint === 'gallery' || endpoint === 'videos' || endpoint === 'faqs') {
        if (!payload.created_at) payload.created_at = new Date().toISOString();
      }

      const { data, error } = await supabase.from(table).insert(payload).select().single();
      if (error) throw error;
      return res.status(201).json(data);
    }

    if (req.method === 'PUT') {
      const { id, ...updates } = req.body;
      const { data, error } = await supabase.from(table).update(updates).eq('id', id).select().single();
      if (error) throw error;
      return res.status(200).json(data);
    }

    if (req.method === 'DELETE') {
      const { id } = req.body;
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) throw error;
      return res.status(200).json({ ok: true });
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
