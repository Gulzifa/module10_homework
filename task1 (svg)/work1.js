const changeBtn = document.querySelector('.btn-changeIcon');
const icon1 = document.querySelector('.btn-icon1');
const icon2 = document.querySelector('.btn-icon2');

changeBtn.addEventListener('click', () => {
    icon1.classList.toggle('first');
    icon2.classList.toggle('first');
});