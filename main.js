// Author: Shalu Madan
//  Matriculation number: 40537396 
//  Last date of modification: 29/04/2022
//  SET08101 – Web Technologies Coursework 2
//  website design for a quiz - main home page js
//  References: https://codepen.io/missmushroom/pen/ZjdPJb 
//              https://codepen.io/bdthemes/pen/powEgeG?editors=1010
//              https://www.w3schools.com/html/


//======================== nav bar ==============================

const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav_links1');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
    });

}
navSlide();

// ======================= quiz slider ====================================


var mainSlider = new Swiper(".mySwiper2", {
    parallax: true,
    speed: 1200,
    effect: 'slide',
    direction: "vertical",
    autoplay: true,
    navigation: {
        nextEl: '.upk-button-next',
        prevEl: '.upk-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function(index, className) {
            return '<span class="' + className + ' swiper-pagination-bullet--svg-animation"><svg width="28" height="28" viewBox="0 0 28 28"><circle class="svg__circle" cx="14" cy="14" r="10" fill="none" stroke-width="2"></circle><circle class="svg__circle-inner" cx="14" cy="14" r="2" stroke-width="3"></circle></svg></span>';
        },
    },
});
// =====================================================================

// ===================== feedback ===========================

let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("feedbackdot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    setTimeout(showSlides, 4000); // Change image every 2 seconds
}

// =========================================================== //