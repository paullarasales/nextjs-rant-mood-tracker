import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  try {
    if(req.method === 'GET') {
      const query = 'SELECT * FROM rants ORDER BY date DESC';
      const result = await pool.query(query);
      console.log(result);
      return res.status(200).json(result.rows);
    } else if (req.method === 'POST') {
      const { title, mood, content, gifUrl, date} = req.body;
      
      if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required' });
      }

      const query = `
          INSERT INTO rants (title, mood, content, gifUrl, date)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING id, title, mood, gifUrl, date
      `;

      const values = [title, mood, content, gifUrl, date];
      const result = await pool.query(query, values);

      return res.status(201).json(result.rows[0]);
    } else if (req.method === 'DELETE') {
      const { id } = req.query;
      const deleteQuery = 'DELETE FROM rants WHERE id = $1';
      await pool.query(deleteQuery, [id]);
      return res.status(204).end(); 
    }
  } catch (error) {
    console.error('Error handling request:', error);
    return res.status(500).json({ message: 'Interval server error' });
  }
}