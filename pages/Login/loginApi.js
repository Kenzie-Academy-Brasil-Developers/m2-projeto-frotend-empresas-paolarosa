import { toast } from "./login.js"

//let token = JSON.parse(localStorage.getItem("@KenzieCompany"))
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
        if(response.is_admin){
            window.location.replace("../AdminPage/admin.html")
        }else{
            window.location.replace("../UserPage/user.html")
        }
    })
}




export function login() {
    const buttonAcess = document.querySelector(".button-login")
    let inputEmail = document.getElementById("email")
    let inputPassword = document.getElementById("password")

    buttonAcess.addEventListener("click", async (event) => {
        event.preventDefault()
        const data = {
            "email": inputEmail.value,
            "password": inputPassword.value
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }
        const responseJSON = await fetch(`http://localhost:6278/auth/login`, options)
            .then((response) => response.json())
            .then((response) => {
                if (!response.error) {
                    selectUserType(response.token)
                    localStorage.setItem("@KenzieCompany", JSON.stringify(response.token))
                } else {
                    toast(response)
                    console.log(response)
                    setTimeout(() => {
                        window.location.reload()
                    }, 3000) 
                }
            }
            )
            return responseJSON
    })
   
}


