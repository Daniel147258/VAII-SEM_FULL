const express = require('express');
const app = express();
const cors = require('cors');
const port = 3008; 
const database = require('./database.js');


app.use(cors());

app.get('/api/pohlavie', async (req, res) => {
    try {
      const pohlavie = await database.getPohlavie();
      res.json(pohlavie);
    } catch (error) {
      console.error('Chyba při získávání pohlaví:', error);
      res.status(500).send('Chyba při získávání pohlaví');
    }
  });

  app.get('/api/pouzivatel', async (req, res) => {
    try {
      const pouzivatel = await database.getPouzivatel();
      res.json(pouzivatel);
    } catch (error) {
      console.error('Chyba při získávání pohlaví:', error);
      res.status(500).send('Chyba při získávání pohlaví');
    }
  });

app.listen(port, () => {
  console.log(`Server běží na portu ${port}`);
});