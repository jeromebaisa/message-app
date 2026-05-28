const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

let messages = [];

// Home
app.get('/', (req, res) => {
  res.send('Server is running');
});

// About
app.get('/about', (req, res) => {
  res.send(`
    <h1>About Page</h1>
    <p>This app lets you send messages.</p>
  `);
});

// Get messages
app.get('/api/messages', (req, res) => {
  res.json(messages);
});

// Add message
app.post('/api/messages', (req, res) => {
  const text = req.body.text;

  if (!text) {
    return res.status(400).json({ error: 'Text required' });
  }

  messages.push(text);

  res.json({
    success: true,
    messages
  });
});

// Serve frontend 
app.use(express.static(path.join(__dirname, 'dist')));

// React fallback
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});