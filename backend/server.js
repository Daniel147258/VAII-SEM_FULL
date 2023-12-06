const express = require('express');
const app = express();
const cors = require('cors');
const port = 3008; 
const database = require('./database.js');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.get('/api/pohlavie', async (req, res) => {
    try {
      const pohlavie = await database.getPohlavie();
      res.json(pohlavie);
    } catch (error) {
      console.error('Chyba pri dostavani pohlavia:', error);
      res.status(500).send('Chyba pri dostavani pohlavia');
    }
  });

  app.post('/api/prihlasenie', async(req, res)=>{
    const { email, heslo } = req.body;
  
    try {
      const user = await database.getPrihlasovacieUdajePouzivatela(email, heslo);

      if (user) {
        res.json(user);

      } else {
        es.json(null);
      }

    } catch (error) {
      res.json(null);
    }
  });

  app.get('/api/pouzivatelia', async (req, res) => {
    try {
      const pouzivatel = await database.getPouzivatel();
      res.json(pouzivatel);
    } catch (error) {
      console.error('Chyba pri dostavani pohlavia pouzivatelov:', error);
      res.status(500).send('Chyba pri dostavani pohlavia pouzivatelov');
    }
  });

  app.post('/api/pridajPouzivatela', async (req, res) => {
    const { email, heslo, meno, adresa, mesto, psc } = req.body;

    try {
        // Kontrola, zda e-mail již existuje v databázi
        const emailExists = await database.kontrolaExistencieEmailu(email);

        if (emailExists) {
            return res.status(400).json({ success: false, error: 'Email už existuje !!' });
        }

        // Pokud e-mail neexistuje, provede se vložení do databáze
        const result = await database.pridajPouzivatela(email, heslo, meno, adresa, mesto, psc);
        res.json({ success: true, result });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/api/checkEmail', async (req, res) => {
  const { email } = req.body;

  try {
    const exists = await database.kontrolaExistencieEmailu(email);
    res.json({ exists });
  } catch (error) {
    console.error('Chyba pri kontrole e-mailu:', error);
    res.status(500).json({ error: 'Nieco sa pokazilo pri kontrole e-mailu.' });
  }
});


app.g
app.listen(port, () => {
  console.log(`Server běží na portu ${port}`);
});