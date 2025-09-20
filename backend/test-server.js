const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 45001;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  console.log('Health check requested');
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/test', (req, res) => {
  console.log('Test endpoint requested');
  res.send('Server is working!');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Test server running on port ${PORT}`);
});