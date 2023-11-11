import React from 'react'
import obrazok1 from '../../Subory/images/style2.avif'
import obrazok2 from '../../Subory/images/style.avif'
import obrazok3 from '../../Subory/images/style2.avif'
import './Carousel.css'
const Carousel = () => {
  return (
    <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner">
        <div class="carousel-item active">
            <img src={obrazok1} class="d-block w-100" alt="uvodny"></img>
            <div class="carousel-caption d-none d-md-block">
                <h5>Jesené bundy </h5>
                <p>Kvalitné materiály, najlepšie ceny mnoho dalších výhod</p>
            </div>
        </div>
        <div class="carousel-item">
            <img src={obrazok2} class="d-block w-100" alt="uvodny"></img>
            <div class="carousel-caption d-none d-md-block">
                <h5>Štýl ktorý dostane každého</h5>
                <p>Vybuduj si svoj vlastný štýl a predveď ho celému svetu</p>
            </div>
        </div>
        <div class="carousel-item">
            <img src={obrazok3} class="d-block w-100" alt="uvodny"></img>
            <div class="carousel-caption d-none d-md-block">
                <h5>Zimné bundy za skvelú cenu</h5>
                <p>Nakúp za 100€ a doprav dostaneš zadarmo</p>
            </div>
        </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    </button>
</div>
  )
}

export default Carousel