import db from './db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
      try {
        const [rants] = await db.query('SELECT * FROM rants ORDER BY id DESC');
        
        res.setHeader('Cache-Control', 'no-store');
        
        res.status(200).json(rants);
      } catch (error) {
        console.error('Error fetching rants:', error);
        res.status(500).json({ error: 'Error fetching rants' });
      }
    } else if (req.method === 'POST') {
      const { title, mood, content, gifUrl, date } = req.body;
  
      try {
        const [result] = await db.query(
          'INSERT INTO rants (title, mood, content, gifUrl, date) VALUES (?, ?, ?, ?, ?)',
          [title, mood, content, gifUrl, date]
        );
        res.status(200).json({ message: 'Rant saved successfully', rantId: result.insertId });
      } catch (error) {
        console.error('Error saving rant:', error);
        res.status(500).json({ error: 'Error saving rant' });
      }
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
}
  