export default function handler(req, res) {
    if (req.method === 'POST') {
      const { pin } = req.body;
  
      const validPin = process.env.PIN_SECRET || '1234';
  
      if (pin === validPin) {
        return res.status(200).json({ success: true });
      } else {
        return res.status(401).json({ success: false, message: 'Invalid PIN' });
      }
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  