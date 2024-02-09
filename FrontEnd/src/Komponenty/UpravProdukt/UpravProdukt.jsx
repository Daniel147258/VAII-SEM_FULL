import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useUser } from '../../Kontext/User';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Form, FormGroup } from 'react-bootstrap';
import './UpravProdukt.css'
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

const UpravProdukt = () => {
    const { loggedInUser, logoutUser } = useUser();
    const [text, setText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if(text.length > 0){
        axios.get('http://localhost:3008/api/getProdukty' , {
            params: {
                searchTerm: text
            }
        })
        .then(response => {
            setSearchResults(response.data)
        })
        .catch(error => {
            console.error('Error fetching categries:', error);
        });
    }
    }, [text]);


    const handleSearchChange = (e) => {
        setText(e.target.value);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    
    if (!loggedInUser || loggedInUser.admin !== 1) {
        return <Navigate to='/' />;
    }
    
    return (
        <div className='card mx-auto' style={{ marginTop: '15px', width: '90%'}}>
        <div className='card-body' >
        <Container>
        <h2 style={{marginLeft: '-12px'}}>Vyhľadaj produkt</h2>
        <input
          type="text"
          placeholder="Zadajte názov produktu alebo iné kľučové slová"
          value={text}
          className='text'
          onChange={handleSearchChange}
        />
        <div className="search-results">
          {searchResults.length > 0 ? (
            searchResults.map(product => (
              <Row key={product.id} className="search-result-item">
                <Col xs={3}>
                  {product.obrazok && (
                    <img style={{ maxHeight: '26vh'}} src={URL.createObjectURL(new Blob([new Uint8Array(product.obrazok.data)], 
                        { type: 'image/jpeg' }))} alt="" className="img-fluid"/>
                  )}
                </Col>
                    <Col xs={9}>
                        <div className="d-flex align-items-center">
                            <p className="mx-2"><strong>ID:</strong> {product.id}</p>
                            <p className="mx-2"><strong>Názov:</strong> {product.nazov}</p>
                            <p className="mx-2"><strong>Kategória:</strong> {product.kategoria}</p>
                        </div>
                        {/* Ďalšie informácie o produkte */}
                    </Col>
              </Row>
            ))
          ) : (
            <p>Nenašli sa žiadne výsledky</p>
          )}
        </div>
      </Container>
      </div>
      </div>
    );
};

export default UpravProdukt;