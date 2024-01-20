import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useUser } from '../../Kontext/User';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import './PridajProdukt.css'
import axios from 'axios';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import Vec from "../Vec/Vec";
// Styl pre modalne okna
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

const PridajProdukt = () => {
    const { loggedInUser, logoutUser } = useUser();
    const [category, setCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [pohlavia, setPohlavia] = useState([]);
    const [selectedPohlavie, setSelectedPohlavie] = useState('');
    const [colors, setColors] = useState([]);
    const [selectedColor, setSelectedColor] = useState('');
    const [name, setName] = useState(null);
    const [image, setImage] = useState(null);  
    const [images, setImages] = useState([]);
    const [prize, setPrize] = useState(null);
    const [errorPrize, setErrorPrize] = useState(null);
    const [popis, setPopis] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const[modalMessage, setModalMessage] = useState("");

    const[products, setProducts] = useState([]);

     useEffect(() => {
        axios.get('http://localhost:3008/api/getProdukty') 
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching categries:', error);
            });
    }, []);

    //Nacitanie farieb
    useEffect(() => {
        axios.get('http://localhost:3008/api/getFarby') 
            .then(response => {
                setColors(response.data);
            })
            .catch(error => {
                console.error('Error fetching colors:', error);
            });
    }, []);
    

    //Nacitanie kategorii
    useEffect(() => {
        axios.get('http://localhost:3008/api/getKategorie') 
            .then(response => {
                setCategory(response.data);
            })
            .catch(error => {
                console.error('Error fetching categries:', error);
            });
    }, []);

    //Nacitanie pohlavi
    useEffect(() => {
        axios.get('http://localhost:3008/api/pohlavie') 
            .then(response => {
                setPohlavia(response.data);
            })
            .catch(error => {
                console.error('Error fetching pohlavie:', error);
            });
    }, []);

    if (!loggedInUser || loggedInUser.admin !== 1) {
        return <Navigate to='/' />;
    }

    const handleNameChange = async (e) => {
        const name = e.target.value;
        setName(name);
    };

      const handleImageUpload = (e) => {
        const file = e.target.files[0]; 
        if (file) {
            setImage(file);  
        }
    };

    const handleRemoveImage2 = () => {
        setImage(null);
    };

    const handleImagesUpload = (e) => {
        const file = e.target.files[0];

        if (file && images.length < 5) {
            setImages(prevImages => [...prevImages, file]);
        }
    };

    const handleRemoveImage = (index) => {
        setImages(prevImages => prevImages.filter((image, i) => i !== index));
    };

    const handlePrizeChange = async (e) => {
        const newValue = e.target.value;

      
        const isValid = /^\d+(\.\d{1,2})?$|^\d+(,\d{1,2})?$/.test(newValue);

        if(isValid){
            setErrorPrize(null);
        } else{
            setErrorPrize("Toto nie je cislo");
        }
        setPrize(newValue);
    };

    const handlePopisChange = async (e) => {
        setPopis(e.target.value);

    };



    const handleForm = async (e) => {
        e.preventDefault();
    
        if (
            selectedCategory !== "Zvoľ kategóriu" &&
            name != null &&
            name !== "" &&
            selectedColor !== "Zvoľ farbu" &&
            selectedPohlavie !== "Zvoľ pohlavie" &&
            image != null &&
            images.length > 0 &&
            prize != null &&
            errorPrize === null &&
            popis != null
        ) {
            try {
                const sub = null;
                const formData = new FormData();
                formData.append('selectedPohlavie', selectedPohlavie);
                formData.append('selectedCategory', selectedCategory);
                formData.append('sub', sub);
                formData.append('name', name);
    
                formData.append('image', image);
    
                formData.append('prize', prize);
                formData.append('popis', popis);
    
                const response = await axios.post('http://localhost:3008/api/pridajProdukt', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data', 
                    },
                });
    
                setModalMessage("Produkt bol pridaný");
                setIsModalOpen(true);
            } catch (error) {
                setModalMessage("Produkt nebol pridaný, niečo sa pokazilo");
                setIsModalOpen(true);
            }
        } else {
            setModalMessage("Produkt nemôže byť pridaný, formulár nie je správne vyplnený");
            setIsModalOpen(true);
        }
    };
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    
      
    return (
        <div className='container mt-5'>
        <div className='card'>
            <div className='card-body' >
                <h2 className="card-title mb-4">Pridanie Produktu</h2>
                <div className="container d-flex align-items-center justify-content-center" style={{ marginTop: '25px' }}>
                    <div className = "container" style={{maxWidth: '100%', margin: '0 auto', marginTop: '0px', marginBottom: '50px'}}>

                        <div className='' style={{marginBottom: '15px'}}>
                            <FormGroup>
                                <Form.Label style={{fontWeight: 'bold'}}>Názov produktu:</Form.Label>
                                    <FormControl type="text" value={name} onChange={handleNameChange} required />
                            </FormGroup>
                        </div>

                        <div style={{marginBottom: '15px'}}>
                            <label style={{marginLeft: '10px'}}>Vyber kategóriu:</label>
                            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} style={{marginLeft: '21px'}}>
                                <option value=""> Zvoľ kategóriu </option>
                                {category.map(cat => (
                                    <option value={cat.kategoria}>
                                        {cat.kategoria}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div style={{marginBottom: '15px'}}>
                            <label style={{marginLeft: '10px'}}>Vyber Farbu:</label>
                            <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)} style={{marginLeft: '21px'}}>
                                <option value=""> Zvoľ farbu </option>
                                {colors.map(color => (
                                    <option value={color.nazovFarby}>
                                        {color.nazovFarby}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div style={{marginBottom: '15px'}}>
                            <label style={{marginLeft: '10px'}}>Vyber pohlavie:</label>
                            <select value={selectedPohlavie} onChange={(e) => setSelectedPohlavie(e.target.value)} style={{marginLeft: '21px'}}>
                                <option value=""> Zvoľ pohlavie </option>
                                {pohlavia.map(poh => (
                                    <option value={poh.pohlavie}>
                                        {poh.pohlavie}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div style={{marginBottom: '15px'}}>
                            <Form.Label style={{ fontWeight: 'bold', marginTop: '10px' }}>Nahraj hlavný obrázok:</Form.Label>
                            <Form.Control type="file" accept="image/*" onChange={(e) => handleImageUpload(e)} />
                            {image && (
                                <div style={{ marginTop: '10px', position: 'relative', display: 'inline-block' }}>
                                    <img
                                        src={URL.createObjectURL(image)}
                                        width="150"
                                        height="150"
                                        style={{ objectFit: 'cover' }}
                                    />
                                    <button
                                        onClick={handleRemoveImage2}
                                        style={{
                                            position: 'absolute',
                                            top: '0',
                                            right: '0',
                                            width: '30px',
                                            height: '28px',
                                            background: 'red',
                                            color: 'white',
                                            borderRadius: '0',
                                            borderColor: 'red',
                                        }}
                                    >
                                        X
                                    </button>
                                </div>
                            )}
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <Form.Label style={{ fontWeight: 'bold', marginTop: '10px' }}>Nahraj zvyšné obrázky:</Form.Label>
                            <Form.Control type="file" accept="image/*" onChange={handleImagesUpload} />
                            {images.map((image, index) => (
                                <div key={index} style={{ marginTop: '10px', position: 'relative', display: 'inline-block' }}>
                                    <img src={URL.createObjectURL(image)} width="150" 
                                    height="150" 
                                    style={{ objectFit: 'cover'}} />
                                    <button
                                        onClick={() => handleRemoveImage(index)}
                                        style={{ position: 'absolute', top: '0', right: '0', 
                                        width: '28px', height: '30px', background: 'red',color: 'white', borderRadius: '0', borderColor: 'red' }}
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className='' style={{marginBottom: '15px'}}>
                            <FormGroup>
                                <Form.Label style={{fontWeight: 'bold'}}>Cena produktu v € :</Form.Label>
                                    <FormControl type="text" value={prize} onChange={handlePrizeChange} required />
                                    {errorPrize && (
                                        <p style={{color: 'red'}}>
                                            {errorPrize}
                                        </p>
                                    )}
                            </FormGroup>
                        </div>

                        <div className='' style={{marginBottom: '15px'}}>
                            <FormGroup>
                                <Form.Label style={{fontWeight: 'bold'}}>Zadaj popis:</Form.Label>
                                    <FormControl type="text" value={popis} onChange={handlePopisChange} required />
                            </FormGroup>
                        </div>
                        
                        <div className="text-end"style={{marginTop: '35px'}} >
                            <Button onClick={handleForm} style={{width: '250px' , background: 'black', borderColor: 'black'}}>Pridať</Button>
                        </div>
                    </div>
                </div>
            </div>
                <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="Potvrdiť zrusenie"
                style={customStyles} 
            >
                <h2 style={{fontSize: '20px'}}> {modalMessage} </h2>
                <div className='text-end'> 
                    <button  onClick={handleCloseModal} style={{border: 'none',
                    backgroundColor: 'black',
                    marginTop: '20px',
                    color: 'white',
                    width: '120px',
                    height: '25px',
                    borderRadius: '15px'}}
                    >Ok</button>
                </div>
            
                </Modal>
                <div className="row">
            {products.map((vec, i) => {
                return (
                  <div key={i} className="col-lg-4 col-md-6 col-sm-6" >
                    <div className='productDisplay'>
                      <Vec
                        key={i}
                        id={vec.id}
                        category={vec.kategoria}
                        name={vec.nazov}
                        image={vec.obrazok}
                        new_price={vec.cena}
                        old_price={vec.cena}
                      />
                    </div>
                  </div>
                );
             
            })}
           
          </div>
            </div>
        </div>
    );
};

export default PridajProdukt;