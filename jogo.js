let slideIndex = 0;
const slides = document.getElementsByClassName('slide');

function showSlides() {
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    slides[slideIndex - 1].classList.add('active');
    setTimeout(showSlides, 3000); // Muda a frase a cada 3 segundos
}

// Inicia o carrossel automaticamente
showSlides();
