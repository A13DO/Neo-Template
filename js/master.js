
let landingPage = document.querySelector(".landing");
let backgrounds = ["/imgs/img-1.jpg", "/imgs/img-2.png", "/imgs/img-3.jpg", "/imgs/img-4.jpg", "/imgs/img-5.jpg"]


function randomImgs() {
    let numb = Math.floor(Math.random() * backgrounds.length);
    landingPage.style.backgroundImage = `url(${backgrounds[numb]})`
}
setInterval(randomImgs, 10000)

