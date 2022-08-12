
// Toggle Settings Button

let settingsBtn = document.querySelector(".icon");
let settingsBox = document.querySelector(".settings-box");

let n = 0;
settingsBtn.onclick = function () {
    settingsBox.classList.toggle("open")
    settingsBtn.classList.toggle("fa-spin")
}

// Settings Content
// Change Color
let list = document.querySelector(".option-box .colors-list");
let nodeList = document.querySelectorAll(".option-box .colors-list li");
let styleSheet =  document.createElement("style");


document.body.appendChild(styleSheet)

list.addEventListener("click", function (evt) {
    nodeList.forEach(item => {
        item.removeAttribute("class")
    });
    evt.target.classList.toggle("active");
    // get active color
    let active = document.querySelector(".option-box .colors-list li.active");
    let style = window.getComputedStyle(active);
    let bgColor = style.getPropertyValue("background-color");
    localStorage.setItem("main-color", bgColor)
    
    setColorFromStorage()
})

window.onload = setColorFromStorage();


function setColorFromStorage() {
    let storageColor = window.localStorage.getItem("main-color")
    styleSheet.textContent = 
    `
    :root {
        --main-color: ${storageColor};
    }
    .landing .intro-text span {
        color: ${storageColor};
    }
    `;
}




// Change Landing Background
let landingPage = document.querySelector(".landing");
let backgrounds = ["/imgs/img-1.png", "/imgs/img-2.jpg", "/imgs/img-3.jpg", "/imgs/img-4.jpg", "/imgs/img-5.jpg"]


let interval

// }
function randomImgs() {  
        interval = setInterval(() => {
            let numb = Math.floor(Math.random() * backgrounds.length);
            landingPage.style.backgroundImage = `url(${backgrounds[numb]})`
        }, 10000);
    } 

// Random Background Options
let randomBgNodes = document.querySelectorAll(".settings-box .random-backgrounds span")
let randomBgOpt = document.querySelector(".settings-box .random-backgrounds .options")

let yes = document.querySelector(".settings-box .random-backgrounds span.yes");
let no = document.querySelector(".settings-box .random-backgrounds span.no");

// Clear Active Classes From Elements (Function)
let clearClasses = function() {
    randomBgNodes.forEach(ele => {
        ele.classList.remove("active")
    });
}

// Random Background on/off
randomBgOpt.addEventListener("click", function (e) {
    clearClasses()
    e.target.classList.toggle("active")
    if (e.target.dataset.background === "yes") {
        localStorage.setItem("background-option", true)
        randomImgs();
    } else if (e.target.dataset.background === "no") {
        localStorage.setItem("background-option", false)
        clearInterval(interval); 
    }
});

// onload Check localStorage
window.onload = localStorageCheck();

function localStorageCheck() {
    let backgroundOption = localStorage.getItem("background-option");
    if (backgroundOption === "true") {
        clearClasses()
        yes.classList.toggle("active")
        randomImgs();
    } else if (backgroundOption === "false") {
        clearClasses()
        no.classList.toggle("active")
        clearInterval(interval);
    }
}




// Progress Animation 



let skills = document.querySelector(".skills");


window.onscroll = function () {
    // Offset
    let skillsOffsetTop = skills.offsetTop;
    console.log("------------")
    console.log(`Skills Offset Top: ${skillsOffsetTop}`)
    // Skills Outer height
    let skillsOuterHeight = skills.offsetHeight;
    console.log(`Skills Outer height: ${skillsOuterHeight}`)
    // Window height
    let windowHeight = this.innerHeight;
    console.log(`Window height: ${windowHeight}`)
    // Window Scroll Top
    let windowScrollTop= this.pageYOffset;
    console.log(`Window Scroll Top: ${windowScrollTop}`)

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
        let progBoxs = document.querySelectorAll(".skills .skill-box .skill-progress span");
        progBoxs.forEach
        progBoxs.forEach(element => {
            element.style.width = element.dataset.progress;
        });
    }
}


// Gallery

let ourGallery = document.querySelectorAll(".gallery .images-box img")

ourGallery.forEach(img => {
    img.addEventListener("click", (e) => {
        // Create Overlay element
        let overlay = document.createElement("div")
        overlay.className = "popup-overlay"
        document.body.appendChild(overlay)
        // Create popup Box element
        let popupBox = document.createElement("div")
        popupBox.className = "popup-box"
        document.body.appendChild(popupBox)
        // Create Image
        let popupImg = document.createElement("img")
        popupBox.appendChild(popupImg)
        // Set Image Source
        popupImg.src = img.src
        document.body.className = "stop-scrolling"
        
        let overlayElement = document.querySelector(".popup-overlay")
        let popupBoxElement = document.querySelector(".popup-box")
        overlayElement.addEventListener("click", (e) => {
            document.body.removeChild(popupBoxElement);
            document.body.removeAttribute("class");
            document.body.removeChild(overlayElement);
        })
    });
});
