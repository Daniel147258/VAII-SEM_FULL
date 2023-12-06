import React, { useEffect, useState } from 'react';
import { useUser } from '../../Kontext/User';
import { Navigate } from 'react-router';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const ZmenaHesla = () => {

  const { loggedInUser, loginUser } = useUser();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const[hesloPoziadavkyNesplnene, setHesloPoziadavkyNesplnene] = useState(null);
  const[hesloPoziadavkySplnene, setHesloPoziadavkySplnene] = useState(null);
  const[heslaNezhodne, setHeslaNezhodne] = useState(null);
  const[fromOk, setFormOk] = useState(false);
  const[errorZleStareHeslo, setErrorZleStareHeslo] = useState(null);
  const[isModalOpen, setIsModal] = useState(false);
  const navigate = useNavigate();
  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '20px',
      borderRadius: '8px',
    },
  };

  useEffect(() => {
    if(heslaNezhodne === null && hesloPoziadavkyNesplnene === null && errorZleStareHeslo === null){
      setFormOk(true);
    }
    else{
      setFormOk(false);
    }
  }, [heslaNezhodne, hesloPoziadavkyNesplnene]);

  if(!loggedInUser){
    return <Navigate to='/'/>
  }

  const oldPassword2 = loggedInUser.heslo;
  const id = loggedInUser.idPouzivatel;


  const handleHeslo = async (e) => {
    setFormOk(false);
    const heslo2 = e.target.value;
    setOldPassword(heslo2);
    setErrorZleStareHeslo(heslo2 === oldPassword2 ? null : "Nesprávne staré heslo");
  };

  const handleNoveHeslo = async (e) =>{
    setFormOk(false);
    const heslo = e.target.value;
    var splneneZakladneHeslo = false;
    var stredneHeslo = false;
    setNewPassword(heslo);
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
      setHesloPoziadavkySplnene((heslo.length >= 8 && obshaujeVelkePismeno 
        && obshaujeMalePismeno && obshaujeCislo) ? "Silné heslo" : "Stredne silné heslo");
    }
    if(heslo === oldPassword2){
        setHesloPoziadavkyNesplnene("Nové heslo je zhodné z starým");
    }

  };

  const handleHeslo2 = async (e) => {
    setFormOk(false);
    const heslo2 = e.target.value;
    setConfirmPassword(heslo2);
    if(heslo2 === newPassword ){
    }
    setHeslaNezhodne(heslo2 === newPassword ? null : "Heslá sa nezhodujú");
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const response = await axios.post('http://localhost:3008/api/zmenHeslo', {
        newPassword,
        id,
      });

      if(response.data.success){
        console.log("Uspesna zmena hesla");
        loggedInUser.heslo = newPassword;
        localStorage.setItem('loginUser', JSON.stringify(loggedInUser));
        setIsModal(true);
      }
    } catch (error) {
      console.error('Chyba pri zmenení hesla:', error);
    };
  };

  const confirmPresmerovanie = () => {
    setIsModal(false);
    navigate('/pouzivatel');
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title mb-4">Zmena hesla</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="oldPassword" className="form-label">
                      Staré heslo
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="oldPassword"
                      value={oldPassword}
                      onChange={handleHeslo}
                      required
                    />
                      {errorZleStareHeslo && <p style={{ color: 'red' }}>{errorZleStareHeslo}</p>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">
                      Nové heslo
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="newPassword"
                      value={newPassword}
                      onChange={handleNoveHeslo}
                      required
                    />
                     {hesloPoziadavkyNesplnene && <p style={{ color: 'red' }}>{hesloPoziadavkyNesplnene}</p>}
                     {hesloPoziadavkySplnene && <p style={{ color: 'green' }}>{hesloPoziadavkySplnene}</p>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                      Potvrdenie hesla
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={handleHeslo2}
                      required
                    />
                    {heslaNezhodne && <p style={{ color: 'red' }}>{heslaNezhodne}</p>}
                  </div>
                  <div className='text-end'>
                  {fromOk===true ? (
                  <button style={{backgroundColor: 'black'}}  type="submit" className="btn btn-primary" >
                    Zmeniť heslo
                  </button>
                  ): (
                    <button style={{backgroundColor: 'black'}}   type="submit" className="btn btn-primary" disabled>
                    Zmeniť heslo
                  </button>
                  )}
                  </div>
                </form>
            </div>
          </div>
        </div>
        <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModal(false)}
            contentLabel="Potvrdiť zrusenie"
            style={customStyles} 
        >
            <h2 style={{fontSize: '20px'}}>Heslo úspešne zmenené</h2>
            <div className='text-end'> 
                <button onClick={confirmPresmerovanie} className='odhlasenie2'>OK</button>
            </div>
        </Modal>
      </div>
    </div>
  );
};

export default ZmenaHesla;