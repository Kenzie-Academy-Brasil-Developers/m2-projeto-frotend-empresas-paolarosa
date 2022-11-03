import { registerUser } from "./registerApi.js"


function openMobileNav(){
    const buttonOpen = document.querySelector(".button-nav-open")
    const nav = document.querySelector("nav")
    buttonOpen.addEventListener("click",()=>{
        nav.classList.toggle("hidden")
    })
}
openMobileNav()


export function toast(actualResponse){
    const divReturn = document.querySelector(".div-return")
    const message = document.createElement("p")
console.log(actualResponse.error)
    if (actualResponse.error) {
        message.innerText = actualResponse.error
        divReturn.classList.add("div-erro")
    }if(!actualResponse.error){
        message.innerText = "Usuário criado com sucesso!"
        divReturn.classList.add("div-sucess")
    }
       
    divReturn.appendChild(message)
    divReturn.classList.remove("hidden")
}
