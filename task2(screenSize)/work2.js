const btn = document.querySelector('.btn');

console.log(window)

btn.addEventListener('click', () =>{
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
const message = `Ширина экрана: ${screenWidth}px\nВысота экрана: ${screenHeight}px`
alert(message);
})
