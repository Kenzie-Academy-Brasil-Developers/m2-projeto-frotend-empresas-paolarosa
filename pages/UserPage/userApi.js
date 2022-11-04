import { renderCompanyEmployees, renderInfosPerfil } from "./user.js"
let token = JSON.parse(localStorage.getItem("@KenzieCompany"))

let isAdmin = await selectUserType(token)
if(!token || isAdmin === true ){
    window.location.replace("../Login/login.html")
}

async function selectUserType(token) {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }
    const responseJSON = await fetch('http://localhost:6278/auth/validate_user', options)
    .then((response)=> response.json())
    .then((response)=>{

        console.log(response)
        return response.is_admin
    })
    return responseJSON
}


export async function catchUser(token) {
    const divWithoutJob = document.querySelector(".div-without-job")
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }

    const responseJSON = await fetch('http://localhost:6278/users/profile', options)
    const response = await responseJSON.json()
    renderInfosPerfil(response)
    if(response.department_uuid !== null){
        catchEmployees(token)
        
    }else{
        divWithoutJob.classList.remove("hidden")
    }
    console.log(response.department_uuid)
    
}
catchUser(token)


function editInfoProfile(token) {
    const button = document.querySelector(".button-modal-edit")
    const inputName = document.getElementById("username")
    const inputEmail = document.getElementById("email")
    const inputPassword = document.getElementById("password")
    let div = document.querySelector(".info-user")
 
    button.addEventListener("click", async (event) => {
        event.preventDefault()
        const data = {
            "username": inputName.value,
            "email": inputEmail.value,
            "password": inputPassword.value,
        }
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        }
        const responseJSON = await fetch('http://localhost:6278/users', options)
            .then((response) => response.json())
            .then((response) => {
                console.log(response)
                renderInfosPerfil(response)
                window.location.reload()
            })
            .catch((err) => {
                console.log(err)
            })
    })
}

editInfoProfile(token)


export async function catchUsersDepartment(token) {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }

    const responseJSON = await fetch('http://localhost:6278/users/departments/coworkers', options)
    const response = await responseJSON.json()
    console.log(response)
    renderInfosPerfil(response)
}


export async function catchEmployees(token) {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }
    const responseJSON = await fetch('http://localhost:6278/users/departments/coworkers', options)
    const response = await responseJSON.json()
    console.log(response[0])
   // renderCompanyEmployees(response[0])
   // renderCompanyEmployees(response[0].users)
   return response[0]
}


export async function catchCompany(token) {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }

    const responseJSON = await fetch('http://localhost:6278/users/departments', options)
    const response = await responseJSON.json()
    console.log(response.name)
   // renderCompanyEmployees(response[0])
   // renderCompanyEmployees(response[0].users)
   return response.name
   
}
catchCompany(token)