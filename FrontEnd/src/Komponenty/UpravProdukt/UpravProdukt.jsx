import React, { useEffect, useState } from 'react';
import { useUser } from '../../Kontext/User';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './UpravProdukt.css'


const UpravProdukt = () => {
    const { loggedInUser, logoutUser } = useUser();
    const [text, setText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [displayedProducts, setDisplayedProducts] = useState(2);
    const [previosuLength, setPreviosuLength] = useState(0);

    useEffect(() => {
        if(text.length > 0){
        axios.get('http://localhost:3008/api/getProduktyFiltrovane' , {
            params: {
                text: text
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
        if(previosuLength === 0){
          setPreviosuLength(searchResults.length);
        }
        if(searchResults.length < previosuLength){
          setDisplayedProducts(2);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    
    const handleLoadMore = () => {
        setDisplayedProducts(displayedProducts + 2);
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
             searchResults.slice(0, displayedProducts).map(product => (
              <Link to={`/upravProdukt/${product.id}`} style={{textDecoration: 'none', color: 'black'}} >
                <Row className="search-result-item">
                  <Col xs={3}>
                    {product.obrazok && (
                      <img style={{ maxHeight: '26vh'}} src={URL.createObjectURL(new Blob([new Uint8Array(product.obrazok.data)], 
                          { type: 'image/jpeg' }))} alt="" className="img-fluid"/>
                    )}
                  </Col>
                      <Col xs={9}>
                          <div className="d-flex align-items-center">
                              <p className="mx-2" alt="a"><strong style={{textDecoration: 'none'}}>ID:</strong> {product.id}</p>
                              <p className="mx-2"><strong>Názov:</strong> {product.nazov}</p>
                              <p className="mx-2"><strong>Kategória:</strong> {product.kategoria}</p>
                              <p className="mx-2"><strong>Cena:</strong> {product.cena}€</p>
                          </div>
                          {/* Ďalšie informácie o produkte */}
                      </Col>
                </Row>
              </Link>
            ))
          ) : (
            <p>Nenašli sa žiadne výsledky</p>
          )}
        </div>
        {searchResults.length > displayedProducts && (
                <Button 
                onClick={handleLoadMore} className="my-3" id="ShowMore">Načítať ďalšie</Button>
            )}
      </Container>
      </div>
      </div>
    );
};

export default UpravProdukt;