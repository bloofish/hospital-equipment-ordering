const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT

// basic get request response at the root url
app.get('/', (req, res) => {
    res.send('test');
  });

//running the server on localhost
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  })