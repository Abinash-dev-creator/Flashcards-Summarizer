const express = require('express');
const path = require('path');
const cors = require('cors'); // Import cors
const { getSubtitle } = require('./yt.js');
const { run } = require('./ai.js');
const app = express();
const PORT = process.env.PORT || 5000; // You can change the port if needed

// Enable CORS
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.json())

// Serve index.html at the root endpoint
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/ai', async (req, res) => {
  console.log(req.body)
  const { url } = req.body
  console.log(url);
  
  // const url = "https://youtu.be/AdBzzpq3xV4?si=WGeMpFfsesY1uIg9"

  const subtitle = await getSubtitle(url);  // subtitle is an array of sentences
  console.log(subtitle);

  const response = await run(subtitle);    // generating flashcards
  res.send(response)                       // sending the response
})

app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
