import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useUser } from '../../Kontext/User';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import './UserInterFace.css'
import logo from '../../Subory/images/logo.jpg';
import ui from '../../Subory/images/ui.jpg';
import axios from 'axios';


//Styl pre modalne okna
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

const UserInterFace = () => {
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const { loggedInUser, logoutUser } = useUser();
  
    if(!loggedInUser){
        return <Navigate to='/'/>
    }

    const email = loggedInUser.email;

      const handleOdhlasenie = () =>{
       setIsModalOpen(true);
      }

      const handleZrusenieUctu = () =>{
        setIsModalOpen2(true);
      }

      const confirmLogout = () => {
        logoutUser();
        setIsModalOpen(false);
      };

      const confirmLogout2 = () => {
        setIsModalOpen(false);
        setIsModalOpen2(false);
        logoutUser();
        zrusUcet();
      };
    
      const cancelLogout = () => {
        setIsModalOpen(false);
        setIsModalOpen2(false);
      };

      const zrusUcet = async () => {
      try {
        const response = await axios.post('http://localhost:3008/api/zrusUcet', {
          email,
        });
      } catch (error) {
        console.error('Chyba pri komunikácii so serverom:', error);
      }
      }


  return (
            <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-md-8">
            <div className="card">
                <div className="card-body">
                <div className='text-end'>
                    <img src={logo} alt="logo" id="logo" width="72" height="72" className="float-end" 
                    style={{ marginRight: '0px', marginTop: '-9px' }} />
                </div>
                <h2 className="card-title mb-4">Profil používateľa</h2>
                <div>
                    <div className="mb-3">
                    <strong>Meno:</strong> {loggedInUser.meno}
                    </div>
                    <div className="mb-3">
                    <strong>Email:</strong> {loggedInUser.email}
                    </div>
                    <div className='mb-3' style={{ position: 'absolute', bottom: 0, left: 0 }}>
                    <img src={ui} alt="ui" id="ui" width="250" height="180" />
                    </div>
                    <div className='text-end'>
                    <Link className='alink' to="/zmenaHesla">
                        <button className='zmenaHesla'>Zmeniť heslo </button>
                    </Link>
                    </div>
                </div>
                <div className='text-end'>
                    <button className='odhlasenie' onClick={handleOdhlasenie}>
                    Odhlásiť sa
                    </button>
                </div>
                <div className='text-end'>
                    <button className='odhlasenie' onClick={handleZrusenieUctu}>
                    Zrušiť účet
                    </button>
                </div>
                {loggedInUser.admin === 1 && (
                  <div>
                    <div className='text-end'>
                        <Link className='addlink' to="/pridajProdukt">
                          <button className='butonas'>Pridať produkt</button>
                        </Link>
                    </div>
                    <div className='text-end'>
                      <Link className='addlink' to="/upravProdukt">
                            <button className='butonas'>Upraviť produkt</button>
                      </Link>
                      </div>
                      <div className='text-end'>
                      <Link className='addlink' to="/vymazProdukt">
                            <button className='butonas'>Vymazať produkt</button>
                      </Link>
                      </div>
                    </div>
                    )}
                </div>
            </div>
            </div>
        </div>
            <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            contentLabel="Potvrdiť odhlásenie"
            style={customStyles} 
        >
            <h2 style={{fontSize: '20px'}}>Naozaj si prajete odhlásiť sa?</h2>
            <div className='text-end'> 
                <button onClick={confirmLogout} className='odhlasenie2'>Odhlásiť sa</button>
            </div>
            <div className='text-end'> 
                <button onClick={cancelLogout} className='odhlasenie2'>Zrušiť</button>
            </div>
        </Modal>

        <Modal
            isOpen={isModalOpen2}
            onRequestClose={() => setIsModalOpen2(false)}
            contentLabel="Potvrdiť zrusenie"
            style={customStyles} 
        >
            <h2 style={{fontSize: '20px'}}>Naozaj si prajete u nás zrušiť účet?</h2>
            <div className='text-end'> 
                <button onClick={confirmLogout2} className='odhlasenie2'>Zrušiť účet</button>
            </div>
            <div className='text-end'> 
                <button onClick={cancelLogout} className='odhlasenie2'>Ponechať účet</button>
            </div>
        </Modal>

        </div>
  );
};

export default UserInterFace;