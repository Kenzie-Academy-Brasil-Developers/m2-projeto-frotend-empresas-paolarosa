import { toast } from "./register.js"

export function registerUser() {
    const buttonRegister = document.querySelector(".button-submit")
    const divReturn = document.querySelector(".div-return")
    const divSucess = document.querySelector(".div-sucess")
    let inputUser = document.getElementById("username")
    let inputEmail = document.getElementById("email")
    let inputPassword = document.getElementById("password")
    let select = document.querySelector(".select")


    buttonRegister.addEventListener("click", async (event) => {
        event.preventDefault()
        const data = {
            "username": inputUser.value,
            "password": inputPassword.value,
            "email": inputEmail.value,
            "professional_level": select.value
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
            const responseJSON = await fetch('http://localhost:6278/auth/register', options)
                .then((response) => response.json())
                .then((response) => {
                    console.log(response.error)
                   if (!response.error) {
                        toast(response)
                        setTimeout(() => {
                            window.location.replace("../login/login.html")
                        }, 3000)
                    } else {
                        toast(response)
                        setTimeout(() => {
                            window.location.reload()
                        }, 2500)
                    } 
                })
                
    })
}

registerUser()


