import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router';

const Registracia = ({ }) => {
    const [email, setEmail] = useState('');
    const [heslo, setHeslo] = useState('');
    const [meno, setMeno] = useState('');
    const [adresa, setAdresa] = useState('');
    const [mesto, setMesto] = useState('');
    const [psc, setPsc] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [isRegistrationSuccess, setRegistrationSuccess] = useState(false);
    const[emailError, setEmailError] = useState(null);  
    const [isEditingEmail, setIsEditingEmail] = useState(false);
  
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
        if(error.response?.data?.error === "Email už existuje !!"){
          setEmailError("Tento email už je registrovaný");
        }
        else{
          setEmailError(null);
          setError(error.response?.data?.error || 'Nieco se pokazilo');
        }
      }
    };

    const handleEmailChange = (e) => {
      setEmail(e.target.value);
      setIsEditingEmail(true);
    };

    useEffect(() => {
      const handleFocusChange = () => {
        setIsEditingEmail(false);
      };
      
    document.addEventListener('focusout', handleFocusChange);

    return () => {
      document.removeEventListener('focusout', handleFocusChange);
    };
  }, []);
  
    useEffect(() => {
      if (isEditingEmail) {
        setEmailError(' ');
      }
    }, [isEditingEmail]);

    return (
      <div>
        <h2>Registracia</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input type="email" value={email} onChange={handleEmailChange} required />
          </label>
          <br />
          {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
          <label>
            Heslo:
            <input type="password" value={heslo} onChange={(e) => setHeslo(e.target.value)} required />
          </label>
          <br />
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
          <button type="submit">Registrovat</button>
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