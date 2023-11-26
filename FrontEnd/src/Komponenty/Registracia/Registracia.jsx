import React, { useState } from 'react'
import axios from 'axios'

const Registracia = () => {
    const [email, setEmail] = useState('');
    const [heslo, setHeslo] = useState('');
    const [meno, setMeno] = useState('');
    const [adresa, setAdresa] = useState('');
    const [mesto, setMesto] = useState('');
    const [psc, setPsc] = useState('');
    const [error, setError] = useState(null);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        // Volání serverové procedury přes Axios
        const response = await axios.post('http://localhost:3008/api/pridajPouzivatela', {
          email,
          heslo,
          meno,
          adresa,
          mesto,
          psc,
        });
  
        // Zpracování odpovědi (můžete např. přesměrovat uživatele nebo zobrazit úspěšnou zprávu)
        console.log('Úspěšně zaregistrováno:', response.data);
      } catch (error) {
        // Zpracování chyby
        setError(error.response?.data?.error || 'Něco se pokazilo');
      }
    };
  
    return (
      <div>
        <h2>Registrace</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <br />
          <label>
            Heslo:
            <input type="password" value={heslo} onChange={(e) => setHeslo(e.target.value)} required />
          </label>
          <br />
          <label>
            Jméno:
            <input type="text" value={meno} onChange={(e) => setMeno(e.target.value)} required />
          </label>
          <br />
          <label>
            Adresa:
            <input type="text" value={adresa} onChange={(e) => setAdresa(e.target.value)} required />
          </label>
          <br />
          <label>
            Město:
            <input type="text" value={mesto} onChange={(e) => setMesto(e.target.value)} required />
          </label>
          <br />
          <label>
            PSČ:
            <input type="text" value={psc} onChange={(e) => setPsc(e.target.value)} required />
          </label>
          <br />
          <button type="submit">Registrovat</button>
        </form>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>
    );
  };

export default Registracia