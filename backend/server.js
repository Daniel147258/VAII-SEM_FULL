const express = require('express');
const app = express();
const cors = require('cors');
const port = 3008; 
const database = require('./database.js');
const bodyParser = require('body-parser');
const multer = require('multer');
const storage = multer.memoryStorage(); // Ukladam subor do pamati nie na disk
const upload = multer({ storage: storage });
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
       
        const emailExists = await database.kontrolaExistencieEmailu(email);

        if (emailExists) {
            return res.status(400).json({ success: false, error: 'Email už existuje !!' });
        }

        
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

app.post('/api/zrusUcet', async(req,res) => {
    const { email } = req.body;
    try {
      const exists = await database.odstranUcet(email);
    } catch (error) {
      console.error('Nieco sa pokazilo pri odstranovani', error);
      res.status(500).json({ error: 'Nieco sa pokazilo pri odstranovani' });
    }
});


app.post('/api/zmenHeslo', async (req, res) => {
  const { newPassword, id } = req.body; // tu musi byt nazov premennych rovnaky ako ktore sa odosielaju z frontendu
  console.log('Prijaté dáta:', newPassword, id);

  try {
    const result = await database.zmenHeslo(newPassword, id);
    res.json({ success: true });
  } catch (error) {
    console.error('Nieco sa pokazilo pri odstranovani', error);
    res.status(500).json({ error: 'Nieco sa pokazilo pri odstranovani' });
  }
});


app.listen(port, () => {
  console.log(`Server běží na portu ${port}`);
});

app.get('/api/getFarby', async (req, res) => {
  try {
    const farby = await database.getFarby();
    res.json(farby);
  } catch (error) {
    console.error('Chyba pri dostavani pohlavia:', error);
    res.status(500).send('Chyba pri dostavani pohlavia');
  }
});


app.post('/api/pridajProdukt', upload.single('image'), async (req, res) => {
  const { selectedPohlavie, selectedCategory, sub, name, prize, popis } = req.body;
  const image = req.file.buffer;
  if(sub === "null"){
      try {
        const result = await database.pridajProdukt(selectedPohlavie, selectedCategory, null, name, image, prize, popis);
        res.json({ success: true, result });
      } catch (error) {
          res.status(500).json({ success: false, error: error.message });
      }
  } else{
    try {
      const result = await database.pridajProdukt(selectedPohlavie, selectedCategory, sub, name, image, prize, popis);
      res.json({ success: true, result });
      } catch (error) {
          res.status(500).json({ success: false, error: error.message });
      }
  }

});

app.get('/api/getKategorie', async (req, res) => {
  try {
    const kategorie = await database.getKategorie();
    res.json(kategorie);
  } catch (error) {
    console.error('Chyba pri dostavani pohlavia:', error);
    res.status(500).send('Chyba pri dostavani pohlavia');
  }
});

app.get('/api/getProdukty', async (req, res) => {
  try {
    const kategorie = await database.getProdukty();
    res.json(kategorie);
  } catch (error) {
    console.error('Chyba pri dostavani produktov:', error);
    res.status(500).send('Chyba pri dostavani produktov');
  }
});

app.get('/api/getProduktyFiltrovane', async (req, res) => {
  try {
    const { text } = req.query; // Získame parameter 'filter' z query reťazca v URL adrese
    const produkty = await database.getProdutkyFiltrovane(text); 
    res.json(produkty);
  } catch (error) {
    console.error('Chyba pri dostavani produktov:', error);
    res.status(500).send('Chyba pri dostavani produktov');
  }
});

app.get('/api/getProdukt', async (req, res) => {
  try {
    const { pisd } = req.query;
    const produkt = await database.getProdukt(pisd); 
    res.json(produkt);
  } catch (error) {
    console.error('Chyba pri dostavani produktov:', error);
    res.status(500).send('Chyba pri dostavani produktov');
  }
});

app.post('/api/zmenCenuProduktu', async (req, res) => {
  const { id, prize } = req.body; 
  try {
    const result = await database.zmenCenuProduktu(id, prize);
    res.json({ success: true });
  } catch (error) {
    console.error('Nieco sa pokazilo pri zmene', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/zmenNazovProduktu', async (req, res) => {
  const { id, nazov } = req.body;
  try {
    const result = await database.zmenNazovProduktu(id, nazov);
    res.json({ success: true });
  } catch (error) {
    console.error('Nieco sa pokazilo pri zmene', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/vymazProdukt', async (req, res) => {
  const { id } = req.body;
  try {
    const result = await database.vymazProdukt(id);
    res.json({ success: true });
  } catch (error) {
    console.error('Nieco sa pokazilo pri zmene', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/getProduktyPohlavieKategoria', async (req, res) => {
  try {
    const { pohlavie, kategoria } = req.query;
    const produkt = await database.getProduktyPohlavieKategoria(pohlavie, kategoria); 
    res.json(produkt);
  } catch (error) {
    console.error('Chyba pri dostavani produktov:', error);
    res.status(500).send('Chyba pri dostavani produktov');
  }
});

app.get('/api/getProduktyKategoria', async (req, res) => {
  try {
    const { kategoria } = req.query;
    const produkt = await database.getProduktyKategoria(kategoria); 
    res.json(produkt);
  } catch (error) {
    console.error('Chyba pri dostavani produktov:', error);
    res.status(500).send('Chyba pri dostavani produktov');
  }
});

app.get('/api/getProduktyPohlavie', async (req, res) => {
  try {
    const { pohlavie } = req.query;
    const produkt = await database.getProduktyPohlavie(pohlavie); 
    res.json(produkt);
  } catch (error) {
    console.error('Chyba pri dostavani produktov:', error);
    res.status(500).send('Chyba pri dostavani produktov');
  }
});