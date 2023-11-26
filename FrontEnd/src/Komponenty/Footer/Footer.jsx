import React from 'react'
import './Footer.css'
import { useNavigate } from 'react-router'
const Footer = () => {
  const navigate = useNavigate();
  
  const handleDomov = () => {
    navigate('/');
  }

  const handleRegitracia = () => {
    navigate('/registracia');
  }

  const handlePrihlasenie = () => {
    navigate('/login');
  }


  return (
    <div>
        <footer class="text-center text-white" id="footer">
        <div classname="container p-4">
            <section class="mb-4">
                <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"
                ><i class="fab fa-facebook-f"></i
                ></a>
                <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"
                ><i class="fab fa-twitter"></i
                ></a>
                <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"
                ><i class="fab fa-google"></i
                ></a>
                <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"
                ><i class="fab fa-instagram"></i
                ></a>
                <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"
                ><i class="fab fa-linkedin-in"></i
                ></a>
                <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"
                ><i class="fab fa-github"></i
                ></a>
            </section>

            <section class="">
                <form action="">
                    <div class="row d-flex justify-content-center">
                        <div class="col-auto">
                            <p class="pt-2" id="odber">
                                <strong>Prihlás sa na odber noviniek</strong>
                            </p>
                        </div>
                        <div class="col-md-5 col-12">
                            <div class="form-outline form-white mb-4">
                                <input type="email" id="form5Example21" class="form-control" />
                                <label class="form-label" for="form5Example21">Emailová adresa</label>
                            </div>
                        </div>
                        <div class="col-auto">

                            <button type="submit" class="btn btn-outline-light mb-4">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </form>
            </section>

            <section class="mb-4">
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum
                    repellat quaerat voluptatibus placeat nam, commodi optio pariatur est quia magnam
                    eum harum corrupti dicta, aliquam sequi voluptate quas.
                </p>
            </section>
            <section class="">
                <div class="row">
                    <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                        <h5 class="text-uppercase">Links</h5>
                        <ul class="list-unstyled mb-0">
                            <li>
                                <a href='' onClick={handleDomov} class="text-white">Domov</a>
                            </li>
                            <li>
                                <a href='' onClick={handleRegitracia} class="text-white">Registrácia</a>
                            </li>
                            <li>
                                <a href='' onClick={handlePrihlasenie} class="text-white">Prihlásiť sa</a>
                            </li>
                            <li>
                                <a href="#!" class="text-white">About</a>
                            </li>
                        </ul>
                    </div>

                    <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                        <h5 class="text-uppercase">Links</h5>

                        <ul class="list-unstyled mb-0">
                            <li>
                                <a href="#!" class="text-white">Reklamácia tovaru</a>
                            </li>
                            <li>
                                <a href="#!" class="text-white">Kontakty</a>
                            </li>
                            <li>
                                <a href="#!" class="text-white">Zákaznicka linka</a>
                            </li>
                            <li>
                                <a href="#!" class="text-white">Zmluvné podmienky</a>
                            </li>
                        </ul>
                    </div>

                    <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                        <h5 class="text-uppercase">Links</h5>

                        <ul class="list-unstyled mb-0">
                            <li>
                                <a href="#!" class="text-white">Kto sme</a>
                            </li>
                            <li>
                                <a href="#!" class="text-white">Čo robíme</a>
                            </li>
                            <li>
                                <a href="#!" class="text-white">Novinky</a>
                            </li>
                            <li>
                                <a href="#!" class="text-white">Zoznam</a>
                            </li>
                        </ul>
                    </div>

                    <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                        <h5 class="text-uppercase">Podpora</h5>

                        <ul class="list-unstyled mb-0">
                            <li>
                                <a href="#!" class="text-white">Podpora </a>
                            </li>

                        </ul>
                    </div>

                </div>

            </section>

        </div>

        <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }} class="text-center p-3">
            © 2023 Copyright:   
            <a className="text-white" href="#"> Daniel Dziaba</a>
        </div>
        </footer>
        </div>
  )
}

export default Footer