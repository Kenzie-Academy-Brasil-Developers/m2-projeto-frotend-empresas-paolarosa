import { catchCompany, catchEmployees, catchUser } from "./userApi.js"
let token = JSON.parse(localStorage.getItem("@KenzieCompany"))


export function renderInfosPerfil(object){

const modal = document.querySelector(".modaldiv")
const close = document.querySelector(".button-close-modal")
 const divInfos = document.querySelector(".info-user")   
 const name = document.createElement("h3")
 const div = document.createElement("div")
 const email = document.createElement("p")
 const level = document.createElement("p")
 const homeOffice = document.createElement("p")
 const vector = document.createElement("img")

 name.innerText= object.username
 name.id = object.username
 name.classList.add("nameUser")
 email.innerText = object.email
 level.innerText = object.professional_level
 homeOffice.innerText = object.kind_of_work
 vector.src= "../../assets/Vector2.png"
 vector.classList.add("vector-pen")

 vector.addEventListener("click",()=>{
       
    modal.classList.remove("hidden")
})
close.addEventListener("click",()=>{
    modal.classList.add("hidden")
})

 div.append(email,level,homeOffice)
 divInfos.append(name,div, vector)
 return divInfos
}


function logout(){
    const buttonLogout = document.querySelector(".button-nav-logout")
    buttonLogout.addEventListener("click",()=>{
        localStorage.clear("@KenzieCompany")
        window.location.replace("../Login/login.html")
    })
}
logout()

export async function renderCompanyEmployees(){
    const object = await catchEmployees(token)
    const companyObject = await catchCompany(token)
    const divContainer = document.querySelector(".div-company-user")
    let nameUser = document.querySelector(".nameUser")
    const companyName = document.createElement("h3")
    const department = document.createElement("h3")
    const divCompanyDepartment = document.createElement("div")
    divCompanyDepartment.classList
    const ul = document.createElement("ul")
    const objectNovo = object.users
    companyName.innerText = companyObject
    department.innerText = "- " + object.name
    divCompanyDepartment.append(companyName,department)

    objectNovo.forEach((employees)=>{
    
        const li = document.createElement("li")
        const employeeName = document.createElement("h4")
        const employeeLevel = document.createElement("p")
        ul.classList.add("list-employees")
        employeeName.classList.add("employee-name")
        employeeName.innerText = employees.username
        employeeLevel.classList.add("employee-level")
        employeeLevel.innerText = (employees.professional_level)[0].toUpperCase() + (employees.professional_level).substr(1)
        li.append(employeeName,employeeLevel)
    
        if(employees.username !== nameUser.id){
            ul.appendChild(li)
        }        
    })
    divContainer.append(divCompanyDepartment,ul)
    return divContainer
} 
renderCompanyEmployees()