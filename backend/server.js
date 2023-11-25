const express = require('express');
const app = express();
const port = 3007; 
const database = require('./database');

app.get('/pohlavie', async (req, res) => {
    try {
      const pohlavie = await database.getPohlavie();
      res.json(pohlavie);
    } catch (error) {
      console.error('Chyba při získávání pohlaví:', error);
      res.status(500).send('Chyba při získávání pohlaví');
    }
  });

app.listen(port, () => {
  console.log(`Server běží na portu ${port}`);
});