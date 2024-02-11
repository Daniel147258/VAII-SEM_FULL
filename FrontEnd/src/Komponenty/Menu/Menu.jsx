import './Menu.css'
import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Menu = () => {
    const [kategorie, setKategorie] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3008/api/getKategorie' , {
                
            })
            .then(response => {
                setKategorie(response.data)
            })
            .catch(error => {
                console.error('Error fetching categries:', error);
            });
    })


    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light" id="lopa">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownOblecenie" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Oblečenie
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdownOblecenie">
                        {kategorie.map((kat, i) => {
                            return (
                                <div key={i} >
                                    {!localStorage.getItem('aktualnePohlavie') ? (
                                        <Link to={`0/${kat.kategoria}`} className='dropdown-item'>
                                        {kat.kategoria}
                                        </Link>
                                    ) : (
                                        <Link to={`/${localStorage.getItem('aktualnePohlavie')}/${kat.kategoria}`} className='dropdown-item'>
                                        {kat.kategoria}
                                        </Link>
                                    )}
                                </div>
                            );
                            })}
                        </div>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownŠport" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Šport
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdownOblecenie">
                            <a class="dropdown-item" href="#">Link 1</a>
                            <a class="dropdown-item" href="#">Link 2</a>
                            <a class="dropdown-item" href="#">Link 3</a>
                            <a class="dropdown-item" href="#">Link 4</a>
                            <a class="dropdown-item" href="#">Link 5</a>
                        </div>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownObuv" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Obuv
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdownOblecenie">
                            <a class="dropdown-item" href="#">Link 1</a>
                            <a class="dropdown-item" href="#">Link 2</a>
                            <a class="dropdown-item" href="#">Link 3</a>
                            <a class="dropdown-item" href="#">Link 4</a>
                            <a class="dropdown-item" href="#">Link 5</a>
                        </div>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownDoplnky" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Doplnky
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdownOblecenie">
                            <a class="dropdown-item" href="#">Link 1</a>
                            <a class="dropdown-item" href="#">Link 2</a>
                            <a class="dropdown-item" href="#">Link 3</a>
                            <a class="dropdown-item" href="#">Link 4</a>
                            <a class="dropdown-item" href="#">Link 5</a>
                        </div>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownVýpredaj" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Výpredaj %
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdownOblecenie">
                            <a class="dropdown-item" href="#">Link 1</a>
                            <a class="dropdown-item" href="#">Link 2</a>
                            <a class="dropdown-item" href="#">Link 3</a>
                            <a class="dropdown-item" href="#">Link 4</a>
                            <a class="dropdown-item" href="#">Link 5</a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
        </div>
    )
}

export default Menu