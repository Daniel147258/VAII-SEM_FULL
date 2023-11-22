import React, { useContext, useState, useEffect } from 'react';
import './Nakupovanie.css';
import { Kontext } from '../../Kontext/Kontext';
import Vec from '../Vec/Vec';
import FiltreSideBar from '../FiltreSideBar/FiltreSideBar';
import Footer from '../Footer/Footer';
const Nakupovanie = (props) => {
  const { all_product } = useContext(Kontext);
  const [pocetNajdenychProduktov, nastavPocetNajdenychProduktov] = useState(0);

  useEffect(() => {
    let pocet = 0;

    all_product.forEach((vec) => {
      if (props.category === vec.category) {
        pocet++;
      }
    });

    nastavPocetNajdenychProduktov(pocet);
  }, [all_product, props.category]);

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
            {all_product.map((vec, i) => {
              if (props.category === vec.category) {
                return (
                  <div key={i} className="col-lg-4 col-md-6 mb-4">
                    <Vec
                      key={i}
                      id={vec.id}
                      category={vec.category}
                      name={vec.name}
                      image={vec.image}
                      new_price={vec.new_price}
                      old_price={vec.old_price}
                    />
                  </div>
                );
              }
              return null;
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
