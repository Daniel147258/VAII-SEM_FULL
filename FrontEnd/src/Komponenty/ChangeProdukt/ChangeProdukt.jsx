import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useUser } from '../../Kontext/User';
import { Link, useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Vec from '../Vec/Vec';
import xButton from '../../Subory/images/x-button.png';
import  './ChangeProdukt.css'
import { useNavigate } from 'react-router-dom';


// Styl pre modalne okna
const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
      top: '45%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '20px',
      borderRadius: '7px',
      width: '70%',
      borderColor: 'wheat',
      borderWidth: '2px',
    },
};

const ChangeProdukt = () => {
    const { id } = useParams();
    const { loggedInUser } = useUser();
    const [zmenCenu, setZmenCenu] = useState(false);
    const [produkt, setProdukt] = useState([]);
    const [prize, setPrize] = useState(null);
    const [errorPrize, setErrorPrize] = useState(null);
    const [sprava, setSprava] = useState("");
    const navigate = useNavigate();
    const [modalSprava, setModalSprava] = useState(false);
    const [nacitaj, setNacitaj] = useState(0);
    const [nazov, setNazov] = useState("");
    const [modalZmenNazov, setModalZmenNazov] = useState(false);
    const [vymazProduktModal, setVymazProduktModal] = useState(false);

    //Nacitanie produktu
    useEffect(() => {
        setNacitaj(0);
        axios.get('http://localhost:3008/api/getProdukt' , {
            params: {
            pisd: id
            }
            
        })
        .then(response => {
            setProdukt(response.data)
        })
        .catch(error => {
            console.error('Error fetching categries:', error);
        });
    }, [id,nacitaj]);

    useEffect(() => {
        setPrize(null);
        setNazov(null);
    }, [zmenCenu, modalZmenNazov]);

    const handleChangeCenu = () =>{
        setZmenCenu(true);
    };

    const handleCloseZmenaCeny = () => {
        setZmenCenu(false);
    };

    const handlePrizeChange = async (e) => {
        const newValue = e.target.value;

        const isValid = /^\d+(\.\d{1,3})?$/.test(newValue);

        if(isValid){
            setErrorPrize(null);
        }else if(/^\d+(\,\d{1,3})?$/.test(newValue)){
            setErrorPrize("Takýto formát nie je povolený");
        } 
        else if(/^\d+(\.\d{1,99})?$/.test(newValue)){
            setErrorPrize("Maximálny počet desatinných miest je 3");
        }
        else{
            setErrorPrize("Toto nie je číslo");
        }
        setPrize(newValue);
    };

    const handleZmenenieCeny = async (e) =>{
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:3008/api/zmenCenuProduktu', {
            id,
            prize,
          });
    
          if(response.data.success){
            setSprava("Cena úspešne zmenená");
            setModalSprava(true);
          } 
        } catch (error) {
            setSprava("Pri zmene ceny nastal niekde problém");
            setModalSprava(true);
        };
    }

    if (!loggedInUser || loggedInUser.admin !== 1) {
        return <Navigate to='/' />;
    }

    const handleSpat = () =>{
        navigate(-1);
    }

    const handleZavriSpravu = () =>{
        setModalSprava(false);
        if(sprava.includes("úspešne odstránený") ){
            setZmenCenu(false);
            setModalZmenNazov(false);
            navigate(-1);
        }
        else if(sprava.includes("úspešne")){
            setNacitaj(1);
            setZmenCenu(false);
            setModalZmenNazov(false);
        }
    }

    const handleZobrazModalNazov = () => {
        setModalZmenNazov(true);
    }

    
    const handleZavriModalNazov = () => {
        setModalZmenNazov(false);
    }

    const handleZmenaNazvuInput = (e) => {
        setNazov(e.target.value);
    }

    const handleChangeNazov = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:3008/api/zmenNazovProduktu', {
            id,
            nazov,
          });
    
          if(response.data.success){
            setSprava("Názov úspešne zmenený");
            setModalSprava(true);
          } 
        } catch (error) {
            setSprava("Pri zmene názvu nastal niekde problém");
            setModalSprava(true);
        };
    }

    const handleVymazProduktModal = () => {
        setVymazProduktModal(true);
    }

    const handleZavriModalVymaz = () =>{
        setVymazProduktModal(false);
    }

    const handleVymazProdukt = async (e) =>{
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:3008/api/vymazProdukt', {
            id,
          });
    
          if(response.data.success){
            setSprava("Produkt bol úspešne odstránený");
            setModalSprava(true);
          } 
        } catch (error) {
            setSprava("Pri odstranovaní produktu nastal niekde problém");
            setModalSprava(true);
        };
    } 

    return (
      <div>
        {produkt.map((vec, i) => {
            return (
                <div className='card mx-auto' style={{ marginTop: '15px', width: '60%'}}>
                    <div className='card-body'>
                        <div className='text-end'>
                            <Button style={{background: 'none', border: 'none', marginTop: '-25px', 
                            marginRight: '-18px'}} onClick={handleSpat}>
                            <img style={{mixBlendMode: 'multiply'}} src={xButton} height="25" alt="" />
                            </Button>
                        </div>
                        <h2 style={{marginLeft: '-8px', marginTop: '-30px'}}>Popis produktu</h2>
                        <Row style={{marginTop: '25px'}}>
                        <Col xs={5}>
                            {vec.obrazok && (
                            <img style={{ maxHeight: '45vh'}} src={URL.createObjectURL(new Blob([new Uint8Array(vec.obrazok.data)], 
                                { type: 'image/jpeg' }))} alt="" className="img-fluid"/>
                            )}
                        </Col>
                            <Col xs={7} >
                                <p><strong>Názov produktu: </strong>{vec.nazov}</p>
                                <p><strong>ID produktu: </strong>{vec.id}</p>
                                <p><strong>Kategória produktu: </strong>{vec.kategoria}</p>
                                <p><strong>Cena produktu: </strong>{vec.cena}€</p>
                            </Col>
                        </Row>
                        <div className='text-end' style={{marginTop: '-18px'}}>
                            <Button  style={{height: '35px', width: '180px'}} 
                            onClick={handleChangeCenu} className="my-3" id="ShowMore">Zmeniť cenu</Button>
                        </div>    
                        <div className='text-end' style={{marginTop: '-18px'}}>
                            <Button  style={{marginBottom: '-15px',height: '35px',  width: '180px'}} 
                            onClick={handleZobrazModalNazov} className="my-3" id="ShowMore">Zmeniť názov</Button>
                        </div>
                        <div className='text-end' style={{marginTop: '-18px'}}>
                            <Button  style={{marginBottom: '-15px',height: '35px',  width: '180px'}} 
                            onClick={handleVymazProduktModal} className="my-3" id="ShowMore">Vymazať produkt</Button>
                        </div>
                    </div>
                </div>
            );
                    
        })}
            <Modal
                isOpen={zmenCenu}
                onRequestClose={() => setZmenCenu(false)}
                contentLabel="Potvrdiť odhlásenie"
                style={customStyles}>
                <h2 style={{marginLeft: '-8px'}}>Zmena ceny</h2>
                <div className='text-end'>
                    <Button style={{background: 'none', border: 'none', marginTop: '-120px', 
                    marginRight: '-19px'}} onClick={handleCloseZmenaCeny}>
                        <img style={{mixBlendMode: 'multiply'}} src={xButton} height="25" alt="" />
                    </Button>
                </div>
                <div>
                    <p style={{marginBottom: '3px', fontWeight: 'bold'}}>Nová cena</p>
                    <input style={{width: '60%', height: '40px'}}type="text" placeholder="Zadajte novú cenu" value={prize} 
                    onChange={handlePrizeChange} />
                </div>
                <p style={{color: 'red'}}>{errorPrize}</p> 
                <div style={{ marginTop: '15px', marginBottom: '-15px'}} className='text-end'>
                    <Button style={{height: '35px'}} id='ShowMore' onClick={handleZmenenieCeny} className="my-3">Potvrdiť zmenu</Button>
                </div>
            </Modal>

            <Modal
                isOpen={modalZmenNazov}
                onRequestClose={() => setModalZmenNazov(false)}
                style={customStyles}>
                <h2 style={{marginLeft: '-8px'}}>Zmena názvu</h2>
                <div className='text-end'>
                    <Button style={{background: 'none', border: 'none', marginTop: '-120px', 
                    marginRight: '-19px'}} onClick={handleZavriModalNazov}>
                        <img style={{mixBlendMode: 'multiply'}} src={xButton} height="25" alt="" />
                    </Button>
                </div>
                <div>
                    <p style={{marginBottom: '3px', fontWeight: 'bold'}}>Nový názov</p>
                    <input style={{width: '60%', height: '40px'}}type="text" placeholder="Zadajte nový názov" value={prize} 
                    onChange={handleZmenaNazvuInput} />
                </div>
                <p style={{color: 'red'}}>{errorPrize}</p> 
                <div style={{ marginTop: '15px', marginBottom: '-15px'}} className='text-end'>
                    <Button style={{height: '35px'}} id='ShowMore' onClick={handleChangeNazov} className="my-3">Potvrdiť zmenu</Button>
                </div>
            </Modal>

            <Modal
                isOpen={vymazProduktModal}
                onRequestClose={() => setVymazProduktModal(false)}
                style={customStyles}>
                <h2 style={{marginLeft: '-8px'}}>Vymazanie produktu</h2>
                <div className='text-end'>
                    <Button style={{background: 'none', border: 'none', marginTop: '-120px', 
                    marginRight: '-19px'}} onClick={handleZavriModalVymaz}>
                        <img style={{mixBlendMode: 'multiply'}} src={xButton} height="25" alt="" />
                    </Button>
                </div>
                <div>
                    <p style={{marginBottom: '3px', fontWeight: 'bold'}}>Naozaj si prajete vymazať tento produkt ?</p>
                </div>
                <div style={{ marginTop: '28px', marginBottom: '-20px'}} className='text-end'>
                    <Button style={{height: '35px', width: '175px'}} id='ShowMore' onClick={handleVymazProdukt} className="my-3">Vymazať Produkt</Button>
                </div>
                <div style={{ marginBottom: '-15px',  }} className='text-end'>
                    <Button style={{height: '35px',width: '175px'}} id='ShowMore' onClick={handleZavriModalVymaz} className="my-3">Zrušiť</Button>
                </div>
            </Modal>

            <Modal
                isOpen={modalSprava}
              
                contentLabel="Potvrdiť odhlásenie"
                style={customStyles}>
                 <h2 style={{marginLeft: '-8px'}}>{sprava}</h2>
                <div className='text-end'>
                    <Button style={{background: 'none', border: 'none', marginTop: '-120px', 
                    marginRight: '-19px'}} onClick={handleZavriSpravu}>
                        <img style={{mixBlendMode: 'multiply'}} src={xButton} height="25" alt="" />
                    </Button>
                </div>
                <div className='text-end'>
                    <Button style={{height: '35px', width: '15%', marginTop: '38px'}} id='ShowMore' onClick={handleZavriSpravu}>
                        Ok
                    </Button>
                </div>
            </Modal>


    </div>
     
    );
};

export default ChangeProdukt;