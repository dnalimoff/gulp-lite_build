//mobile nav

const navBtn = document.querySelector('.nav-btn')
const iconBtn = document.querySelector('.nav-btn__icon')
const menuMobile = document.querySelector('.header__nav')
const body = document.querySelector('body')

navBtn.addEventListener('click', () => {
    menuMobile.classList.toggle('header__nav--active')
    iconBtn.classList.toggle('nav-btn__icon--active')
    // body.classList.toggle('modal-open')
})
