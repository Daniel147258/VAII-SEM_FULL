import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';

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
      }
      setHeslaNezhodne(heslo2 === heslo ? null : "Heslá sa nezhodujú");
    };

  
    useEffect(() => {
      if(heslaNezhodne === null && hesloPoziadavkyNesplnene === null && heslaNezhodne == null){
        setFormOk(true);
      }
      else{
        setFormOk(false);
      }
    }, [heslaNezhodne, hesloPoziadavkyNesplnene, emailError]);

    return (
      <div className='bg-dark' style={{maxHeight: '100%', minHeight: '100vh'}}>
      <div className='container bg-dark text-white'style={{maxWidth: '70%', margin: '0 auto', marginTop: '0px', marginBottom: '50px'}}>
      <h2>Registrovanie sa</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Form.Label>Email:</Form.Label>
          <FormControl type="email" value={email} onChange={handleEmailChange} required />
          {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
          {emailDostupny && <div style={{ color: 'green' }}>{emailDostupny}</div>}
        </FormGroup>

        <FormGroup>
          <Form.Label>Heslo:</Form.Label>
          <FormControl type="password" value={heslo} onChange={handleHeslo} required />
          {hesloPoziadavkyNesplnene && <div style={{ color: 'red' }}>{hesloPoziadavkyNesplnene}</div>}
          {hesloPoziadavkySplnene && <div style={{ color: 'green' }}>{hesloPoziadavkySplnene}</div>}
        </FormGroup>

        <FormGroup>
          <Form.Label>Zopakuj heslo:</Form.Label>
          <FormControl type="password" value={heslo2} onChange={handleHeslo2} required />
          {heslaNezhodne && <div style={{ color: 'red' }}>{heslaNezhodne}</div>}
        </FormGroup>

        <FormGroup>
          <Form.Label>Meno a priezvisko:</Form.Label>
          <FormControl type="text" value={meno} onChange={(e) => setMeno(e.target.value)} required />
        </FormGroup>

        <FormGroup>
          <Form.Label>Adresa:</Form.Label>
          <FormControl type="text" value={adresa} onChange={(e) => setAdresa(e.target.value)} required />
        </FormGroup>

        <FormGroup>
          <Form.Label>Mesto:</Form.Label>
          <FormControl type="text" value={mesto} onChange={(e) => setMesto(e.target.value)} required />
        </FormGroup>

        <FormGroup>
          <Form.Label>PSČ:</Form.Label>
          <FormControl type="text" value={psc} onChange={(e) => setPsc(e.target.value)} required />
        </FormGroup>

        <div className='text-end'>
        {fromOk ? (
            <Button style={{marginTop: '25px',marginBottom: '200px', width: '30%', 
            backgroundColor: 'black', borderColor: 'white'}} type="submit">Registrovať sa</Button>
          ) : (
            <Button style={{marginTop: '25px',marginBottom: '200px', width: '30%', 
            backgroundColor: 'black', borderColor: 'white'}} disabled>Registrovať sa</Button>
          )}
          </div>
      </Form>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      {isRegistrationSuccess && (
        <div className="losd" style={{ marginTop: '150px' }}>
          <div className="s">
            <p>Byli jste úspěšně zaregistrováni!</p>
            <Button onClick={() => navigate('/')}>Super</Button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
  };

export default Registracia