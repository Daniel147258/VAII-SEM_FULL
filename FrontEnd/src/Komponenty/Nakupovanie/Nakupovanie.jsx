import React, { useContext, useState, useEffect } from 'react';
import './Nakupovanie.css';
import { Kontext } from '../../Kontext/Kontext';
import Vec from '../Vec/Vec';
import FiltreSideBar from '../FiltreSideBar/FiltreSideBar';
import Footer from '../Footer/Footer';
import { useParams } from 'react-router';
import axios from 'axios';

const Nakupovanie = () => {
  const { all_product } = useContext(Kontext);
  const [pocetNajdenychProduktov, nastavPocetNajdenychProduktov] = useState(0);
  const { pohlavie, kategoria, subKategoria } = useParams();
  const [vysortovaneProdukty, setVysortovaneProdukty] = useState([]);
  const [druheProdukty, setDruheProdukty] = useState([]);
  
  // Vysortovanie produktov podla zadanych parametrov
    useEffect(() => {
      if(pohlavie && kategoria){
        axios.get('http://localhost:3008/api/getProduktyPohlavieKategoria' , {
            params: {
              pohlavie: pohlavie,
              kategoria: kategoria
            }
            })
            .then(response => {
              setVysortovaneProdukty(response.data)
            })
            .catch(error => {
                console.error('Error fetching categries:', error);
          });
      } 
      else if(!pohlavie && kategoria){
          axios.get('http://localhost:3008/api/getProduktyKategoria' , {
            params: {
              kategoria: kategoria
            }
            })
            .then(response => {
              setVysortovaneProdukty(response.data)
            })
            .catch(error => {
                console.error('Error fetching categries:', error);
          });
      }
      else if(pohlavie && !kategoria){
        axios.get('http://localhost:3008/api/getProduktyPohlavie' , {
          params: {
            pohlavie: pohlavie
          }
          })
          .then(response => {
            setVysortovaneProdukty(response.data)
          })
          .catch(error => {
              console.error('Error fetching categries:', error);
        });
      }
      
      const filteredProducts = all_product.filter(vec => {
        if(pohlavie && kategoria) {
          return vec.pohlavie === pohlavie && vec.kategoria === kategoria;
        } 
        else if(pohlavie && !kategoria) {
          return vec.pohlavie === pohlavie;
        } 
        else if(!pohlavie && kategoria) {
          return vec.kategoria === kategoria;
        }
      });

      const pocetPoloziek = vysortovaneProdukty.map((produkt, i) => i).length;

      setDruheProdukty(filteredProducts);
      nastavPocetNajdenychProduktov(filteredProducts.length + pocetPoloziek);
    },[pohlavie, kategoria]);
    


  return (
    <div>
    <div className="container" id='content'>
      <div className="row">
        {/* Bočný panel */}
        <div className="col-md-3" id="Sidebar">
          <FiltreSideBar/>
        </div>

        {/* Hlavný obsah */}
        <div className="col-md-9" >
          <p>
            <span>Zobrazenie 1-</span> {pocetNajdenychProduktov} <span> </span>
             z {pocetNajdenychProduktov} možných produktov
          </p>
          <div>Triedene podľa</div>

          <div className="row">
            {druheProdukty.map((vec, i) => {
                return (
                  <div key={i} className="col-lg-4 col-md-6 col-sm-6" >
                    <div className='productDisplay'>
                      <Vec
                        key={i}
                        id={vec.id}
                        pohlavie={vec.pohlavie}
                        kategoria={vec.kategoria}
                        name={vec.name}
                        image={vec.image}
                        new_price={vec.new_price}
                        old_price={vec.old_price}
                      />
                    </div>
                  </div>
                );
            })}
            {vysortovaneProdukty.map((vec, i) => {
                return (
                  <div key={i} className="col-lg-4 col-md-6 col-sm-6" >
                    <div className='productDisplay'>
                      <Vec
                        key={i}
                        id={vec.id}
                        pohlavie={vec.pohlavie}
                        kategoria={vec.kategoria}
                        name={vec.nazov}
                        image={vec.obrazok}
                        new_price={vec.cena}
                        old_price={vec.cena}
                      />
                    </div>
                  </div>
                );
            })}
            {pocetNajdenychProduktov === 0 && (
              <div className="text-center" style={{ marginTop: '150px', height: '100vh' }}>
                <p>Bohužiaľ sa nenašiel žiaden produkt</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default Nakupovanie;
