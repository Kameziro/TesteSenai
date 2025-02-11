const slides = document.querySelectorAll('.slides img');
let indexSlide = 0;

document.addEventListener('DOMContentLoaded', inicializarSlider);

inicializarSlider();

function inicializarSlider() {
    if (slides.length > 0) {
        slides[indexSlide].classList.add('mostraSlide');
    }
}

function mostraSlide(index) {
    if (index >= slides.length) {
        indexSlide = 0;
    } else if (index < 0) {
        indexSlide = slides.length - 1;
    }

    slides.forEach(slide => {
        slide.classList.remove('mostraSlide');
    });
    slides[indexSlide].classList.add('mostraSlide');
}

function proxSlide() {
    indexSlide++;
    mostraSlide(indexSlide);
}

function slideAnt() {
    indexSlide--;
    mostraSlide(indexSlide);
}