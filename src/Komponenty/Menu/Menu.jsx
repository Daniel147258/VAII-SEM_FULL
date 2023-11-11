import React from 'react'
import './Menu.css'
const Menu = () => {
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
                        <a class="dropdown-item" href="Rifle.html">Rifle</a>
                        <a class="dropdown-item" href="#">Link 2</a>
                        <a class="dropdown-item" href="#">Link 3</a>
                        <a class="dropdown-item" href="#">Link 4</a>
                        <a class="dropdown-item" href="#">Link 5</a>
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