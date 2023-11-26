import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router';

const Registracia = ({ }) => {
    const [email, setEmail] = useState('');
    const [heslo, setHeslo] = useState('');
    const [heslo2, setHeslo2] = useState('');
    const [meno, setMeno] = useState('');
    const [adresa, setAdresa] = useState('');
    const [mesto, setMesto] = useState('');
    const [psc, setPsc] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [isRegistrationSuccess, setRegistrationSuccess] = useState(false);
    const[emailError, setEmailError] = useState(null);
    const[emailDostupny, setEmailDostupny] = useState(null);
    const[hesloPoziadavkyNesplnene, setHesloPoziadavkyNesplnene] = useState(null);
    const[hesloPoziadavkySplnene, setHesloPoziadavkySplnene] = useState(null);
    const[heslaNezhodne, setHeslaNezhodne] = useState(null);
    const[fromOk, setFormOk] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:3008/api/pridajPouzivatela', {
          email,
          heslo,
          meno,
          adresa,
          mesto,
          psc,
        });
        setRegistrationSuccess(true);
      } catch (error) {
    
          setError(error.response?.data?.error || 'Nieco se pokazilo');
      }
    };

    const handleEmailChange = async (e) => {
      const newEmail = e.target.value;
      setEmail(newEmail);
      try {
        const response = await axios.post('http://localhost:3008/api/checkEmail', {
          email: newEmail,
        });
        setEmailError(response.data.exists ? 'Tento email už je registrovaný' : null);
        setEmailDostupny(response.data.exists ? null : "Email je dostupný");
        if(response.data.exists){
            setFormOk(true);
        }
      } catch (error) {
        console.error('Chyba pri kontrole e-mailu:', error);
      }
    };

   
    const handleHeslo = async (e) =>{
      setFormOk(false);
      const heslo = e.target.value;
      var splneneZakladneHeslo = false;
      var stredneHeslo = false;
      setHeslo(heslo);
      setHesloPoziadavkyNesplnene(heslo.length < 8 ? "Heslo musí mať minimálne 8 znakov a je dobré aby obsahovalo aj veľké písmena a čísla" : null);
      const obshaujeVelkePismeno = /[A-Z]/.test(heslo);
      const obshaujeMalePismeno = /[a-z]/.test(heslo);
      const obshaujeCislo = /[1-9]/.test(heslo);
      splneneZakladneHeslo = (heslo.length >= 8 ? true : false);
      stredneHeslo = ((heslo.length >= 8 && obshaujeVelkePismeno && obshaujeMalePismeno) || (heslo.length >= 8 && obshaujeCislo && obshaujeMalePismeno) 
      || (heslo.length >= 8 && obshaujeCislo && obshaujeVelkePismeno) ? true: false);
      setHesloPoziadavkySplnene(heslo.length >= 8 ? "Požiadavky splnené" : null);
      if (splneneZakladneHeslo) {
        setFormOk(true);
        if (heslo.length >= 8 && obshaujeVelkePismeno && obshaujeMalePismeno) {
          setHesloPoziadavkySplnene("Stredne silné heslo");
        } else if (heslo.length >= 8 && obshaujeCislo && obshaujeMalePismeno) {
          setHesloPoziadavkySplnene("Stredne silné heslo");
        } else if (heslo.length >= 8 && obshaujeCislo && obshaujeVelkePismeno) {
          setHesloPoziadavkySplnene("Stredne silné heslo");
        } else {
          setHesloPoziadavkySplnene("Požiadavky splnené");
        }
      }
      if(stredneHeslo){
        setHesloPoziadavkySplnene((heslo.length >= 8 && obshaujeVelkePismeno && obshaujeMalePismeno && obshaujeCislo) ? "Silné heslo" : "Stredne silné heslo");
      
      }
    };

    const handleHeslo2 = async (e) => {
      setFormOk(false);
      const heslo2 = e.target.value;
      setHeslo2(heslo2);
      if(heslo2 === heslo ){
        setFormOk(true);
      }
      setHeslaNezhodne(heslo2 === heslo ? null : "Heslá sa nezhodujú");
    };

  
    return (
      <div>
        <h2>Registrovanie sa</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input type="email" value={email} onChange={handleEmailChange} required />
          </label>
          <br/>
          {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
          {emailDostupny && <div style={{ color: 'green' }}>{emailDostupny}</div>}
          <label>
            Heslo:
            <input type="password" value={heslo} onChange={handleHeslo} required />
          </label>
          <br />
          {hesloPoziadavkyNesplnene && <div style={{ color: 'red' }}>{hesloPoziadavkyNesplnene}</div>}
          {hesloPoziadavkySplnene && <div style={{ color: 'green' }}>{hesloPoziadavkySplnene}</div>}
          <label>
            Zopakuj heslo:
            <input type="password" value={heslo2} onChange={handleHeslo2} required />
          </label>
          <br />
          {heslaNezhodne && <div style={{ color: 'red' }}>{heslaNezhodne}</div>}
          <label>
            Meno a priezvisko:
            <input type="text" value={meno} onChange={(e) => setMeno(e.target.value)} required />
          </label>
          <br />
          <label>
            Adresa:
            <input type="text" value={adresa} onChange={(e) => setAdresa(e.target.value)} required />
          </label>
          <br />
          <label>
            Mesto:
            <input type="text" value={mesto} onChange={(e) => setMesto(e.target.value)} required />
          </label>
          <br />
          <label>
            PSČ:
            <input type="text" value={psc} onChange={(e) => setPsc(e.target.value)}  required/>
          </label>
          <br />
          {fromOk ? (
              <button type="submit" >Registrovat</button>
            ) : (
              <button  >Registrovat</button>
            )}
          
        </form>
        {error && <div style={{ color: 'red' }}>{error}</div>}


        {isRegistrationSuccess && (
        <div className="losd" style={{marginTop: '150px'}}>
          <div className="s">
            <p>Byli jste úspěšně zaregistrováni!</p>
            <button onClick={() => {
            navigate('/');
          }}>Super</button>
          </div>
        </div>
      )}

    </div>
  );
  };

export default Registracia