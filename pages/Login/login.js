import { login } from "./loginApi.js"

function openMobileNav(){
    const buttonOpen = document.querySelector(".button-nav-open")
    const nav = document.querySelector("nav")
    buttonOpen.addEventListener("click",()=>{
        nav.classList.toggle("hidden")
    })
}
openMobileNav()

login()

export function toast(actualResponse){
    const divReturn = document.querySelector(".div-return")
    const message = document.createElement("p")

    if (actualResponse.error) {
        message.innerText = actualResponse.error
        divReturn.classList.add("div-erro")
    }
    divReturn.appendChild(message)
    divReturn.classList.remove("hidden")
}