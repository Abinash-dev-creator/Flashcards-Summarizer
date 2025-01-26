const express = require('express');
const path = require('path');
const {getSubtitle}= require('./yt.js');
const app = express();
const PORT = 3000; // You can change the port if needed

// Serve static files from the 'public' directory
app.post('/ai/talking',(req,res)=>{
    console.log(req.body)
    const url ="https://youtu.be/AdBzzpq3xV4?si=WGeMpFfsesY1uIg9"
    getSubtitle(url) 
    res.send('Hello from server')
})
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
