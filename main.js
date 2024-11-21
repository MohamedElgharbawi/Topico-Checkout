let bars = document.querySelector(".fa-bars");
let fa_circle_xmark = document.querySelector(".fa-circle-xmark");
let span = document.querySelector("header nav+span");
let nav = document.querySelector("header nav");
let to_Top = document.querySelector(".to-Top");
let page = document.querySelector(".page");
let header = document.querySelector("header");
window.onresize = () => page.style.marginTop = `${header.offsetHeight + 48}px`;
document.querySelector(".date").append(new Date().getFullYear());
page.style.marginTop = `${header.offsetHeight + 48}px`;
window.onscroll = _ => to_Top.style.display = window.scrollY ? "block" : "none";
bars.onclick = function () {
    nav.style.display = "block";
    span.style.display = "block";
}
fa_circle_xmark.onclick = function () {
    fa_circle_xmark.parentElement.parentElement.style.display = "none";
    span.style.display = "none";
}
span.onclick = function () {
    nav.style.display = "none";
    span.style.display = "none";
}
if (window.localStorage.getItem("arr")) {
    let body = document.querySelector(".body");
    let price = 0;
    body.innerHTML = "";
    let arr = window.localStorage.getItem("arr").split(",");
    for (let i = 0; i < arr.length; i++) {
        fetch("Ecommerce-Website.json").then(data => data.json()).then(data => {
            for (let j = 0; j < data.length; j++) {
                if (arr[i] === data[j].img) {
                    body.innerHTML += `
                        <div class="PRODUCT d-flex align-items-center justify-content-between">
                            <div class = "image position-relative"><img src="${arr[i]}" alt=""><i class="fa-solid fa-circle-xmark position-absolute"></i></div>
                            <div class="text">
                                <p>${data[j].name}</p>
                                <p class="m-0">Price : $<span class="PRICE">${data[j].price}</span></p>
                            </div>
                        </div>
                    `
                    price += Number(data[j].price);
                    document.querySelector(".FINAL-PRICE").innerHTML = `${price}`;
                    break;
                }
            }
            let x = document.querySelectorAll(".page .right i");
            x.forEach(e => {
                e.onclick = function () {
                    let array = window.localStorage.getItem("arr").split(",");
                    array = array.filter(ele => ele !== e.previousElementSibling.getAttribute("src"));
                    window.localStorage.setItem("arr", array);
                    document.querySelector(".FINAL-PRICE").innerHTML -= Number(e.parentElement.nextElementSibling.querySelector(".PRICE").innerHTML);
                    e.parentElement.parentElement.remove();
                    let body = document.querySelector(".body");
                    if (!body.children.length) {
                        body.innerHTML += `<p class="no-product d-flex justify-content-center align-items-center text-center" style="font-size: 33px;font-weight: 900;width: 100%;">No Products Selected</p>`
                    }
                }
            })
        })
    }
}




let mode = document.getElementById("mode");
let dark = document.querySelector(".dark");
let light = document.querySelector(".light");

mode.onclick = function()  {
    if (light.classList.contains("none")) {
        document.body.style.background = "#000";
        window.localStorage.setItem("backgroundBody", "#000");
        window.localStorage.setItem("icon", "dark");
        document.styleSheets[1].rules[1].style.setProperty("--dark-color","#fff");
        document.styleSheets[1].rules[1].style.setProperty("--element-color","#181818");
        document.styleSheets[1].rules[1].style.setProperty("--black-color", "#fff");
        document.querySelector(".logo-1").src = "imgs/image e-commrce/img/logo-white.png";
        document.querySelector(".logo-2").src = "imgs/image e-commrce/img/logo-white.png";
    } else {
        document.body.style.background = "#f5f6f9";
        window.localStorage.setItem("backgroundBody", "#f5f6f9");
        window.localStorage.setItem("icon", "light");
        document.styleSheets[1].rules[1].style.setProperty("--dark-color","#000");
        document.styleSheets[1].rules[1].style.setProperty("--element-color","#fff");
        document.styleSheets[1].rules[1].style.setProperty("--black-color", "#000");
        document.querySelector(".logo-1").src = "imgs/image e-commrce/img/logo-black.png";
        document.querySelector(".logo-2").src = "imgs/image e-commrce/img/logo-black.png";
    }
    light.classList.toggle("none");
    dark.classList.toggle("none");
}



if (window.localStorage.getItem("backgroundBody")) {
    document.body.style.backgroundColor = window.localStorage.getItem("backgroundBody");
    if (window.localStorage.getItem("icon") === "dark") {
        light.classList.remove("none");
        dark.classList.add("none");
        document.styleSheets[1].rules[1].style.setProperty("--dark-color","#fff");
        document.styleSheets[1].rules[1].style.setProperty("--element-color","#181818");
        document.styleSheets[1].rules[1].style.setProperty("--black-color", "#fff");
        document.querySelector(".logo-1").src = "imgs/image e-commrce/img/logo-white.png";
        document.querySelector(".logo-2").src = "imgs/image e-commrce/img/logo-white.png";
    } else {
        light.classList.add("none");
        dark.classList.remove("none");
        document.styleSheets[1].rules[1].style.setProperty("--dark-color","#000");
        document.styleSheets[1].rules[1].style.setProperty("--element-color","#fff");
        document.styleSheets[1].rules[1].style.setProperty("--black-color", "#000");
        document.querySelector(".logo-1").src = "imgs/image e-commrce/img/logo-black.png";
        document.querySelector(".logo-2").src = "imgs/image e-commrce/img/logo-black.png";
    }
}
