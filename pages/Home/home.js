import { catchCompanys } from "./homeApi.js"


function openMobileNav() {
    const buttonOpen = document.querySelector(".button-nav-open")
    const nav = document.querySelector("nav")
    buttonOpen.addEventListener("click", () => {
        nav.classList.toggle("hidden")
    })
}
openMobileNav()

function createCompanys(object) {

    const tagLi = document.createElement("li")
    const tagName = document.createElement("h3")
    const tagTime = document.createElement("p")
    const tagSetor = document.createElement("span")

    tagName.classList.add("company-name")
    tagName.innerText = object.name
    tagTime.classList.add("company-time")
    if (object.opening_hours[0] > 0) {
        tagTime.innerText = object.opening_hours.substring(0, 2) + " horas"
    } else { tagTime.innerText = object.opening_hours.substring(1, 2) + " horas" }
    tagSetor.classList.add("company-setor")
    tagSetor.innerText = object.sectors.description

    tagLi.append(tagName, tagTime, tagSetor)
    return tagLi

}

/* export function renderCompanys(array){
    const ul = document.querySelector("ul")
    array.forEach((card)=>{
        ul.appendChild(createCompanys(card))
    })
} */

export function renderCompanys(array) {

    const ul = document.querySelector("ul")
    const select = document.querySelector(".select")
    array.forEach((card) => {
        if (select.value == "") {
            ul.appendChild(createCompanys(card))
        }
    })
    select.addEventListener("change", () => {
        ul.innerHTML = ""
        array.forEach((card) => {
            if (select.value == card.sectors.description) {
                ul.appendChild(createCompanys(card))
            } else if (select.value == "") {
                ul.appendChild(createCompanys(card))
            }
        })
    })
}

export function selectSector(object) {
    let select = document.querySelector(".select")
    object.forEach((setor) => {
        select.insertAdjacentHTML("beforeend", `
        <option value="${setor.description}">${setor.description}</option>
    `)
    })
}

/* export function separateSectors(){
    const select = document.querySelector(".select")
    select.addEventListener("click",()=>{
        if(select.value == ){
            renderCompanys(array)
        }
    })
}
separateSectors() */