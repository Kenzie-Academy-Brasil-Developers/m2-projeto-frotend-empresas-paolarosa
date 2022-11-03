import { createCardsDepartments, modalCreateDepartment, renderAllUsers, renderDepartments, selectCompany} from "./admin.js"

let token = JSON.parse(localStorage.getItem("@KenzieCompany"))


if(!token){
    window.location.replace("../Login/login.html")
}

export async function catchDepartments(token) {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }
    const responseJSON = await fetch('http://localhost:6278/departments', options)
    const response = await responseJSON.json()
    console.log(response)
    renderDepartments(response)
    return response
    //createCardsDepartments(response)
}
catchDepartments(token)


export async function catchAllUsers(token) {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }
    const responseJSON = await fetch('http://localhost:6278/users', options)
    const response = await responseJSON.json()
   //renderAllUsers(response)
   console.log(response)
   return response
}


export async function catchUsersCompany(token) {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }
    const responseJSON = await fetch('http://localhost:6278/departments', options)
    const response = await responseJSON.json()
   //renderAllUsers(response)
   return response
}


export async function catchSector(){
    const responseJSON = await fetch('http://localhost:6278/sectors')
    const response = await responseJSON.json()
   // console.log(response)
    //selectSector(response)
}
catchSector()


export async function catchCompanys() {

    const responseJSON = await fetch('http://localhost:6278/companies')
    const response = await responseJSON.json()
    selectCompany(response)
    return response
    
}
catchCompanys()



export async function createDepartment(token,name,description,company) {

        const data = {
            "name": name,
            "description": description,
            "company_uuid": company,
        } 
        console.log(token)
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        }
        const responseJSON = await fetch('http://localhost:6278/departments', options)
            .then((response) => response.json())
            .then((response) => {
                console.log(response)
              
            })
            .catch((err) => {
                console.log(err)
            })
    
}

export async function catchEditDepartment(token, endPoint, description) {
     const data = {
        "description": description
     }

    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }
    const responseJSON = await fetch(`http://localhost:6278/departments/${endPoint}`, options)
    const response = await responseJSON.json()
   return response
}


export async function catchDeleteDepartment(token, endPoint) {
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }
    const responseJSON = await fetch(`http://localhost:6278/departments/${endPoint}`, options)
    //const response = await responseJSON.json()
   //return response
}


export async function catchUsersWithoutJob(token) {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }
    const responseJSON = await fetch('http://localhost:6278/admin/out_of_work', options)
    const response = await responseJSON.json()
   //renderAllUsers(response)
   return response
}

export async function hireUser(token, idUser, idDepartment) {
    const data = {
        "user_uuid": idUser,
        "department_uuid": idDepartment
      }

   const options = {
       method: 'PATCH',
       headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`
       },
       body: JSON.stringify(data)
   }
   const responseJSON = await fetch(`http://localhost:6278/departments/hire/`, options)
   const response = await responseJSON.json()
  return response
}

export async function firedUser(token, idUser) {
   const options = {
       method: 'PATCH',
       headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`
       }
   }
   const responseJSON = await fetch(`http://localhost:6278/departments/dismiss/${idUser}`, options)
   const response = await responseJSON.json()
  return response
}

export async function editEmployees(token, kindWork, level, idUser) {
    const data = {
        "kind_of_work": kindWork,
        "professional_level": level
      }

   const options = {
       method: 'PATCH',
       headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`
       },
       body: JSON.stringify(data)
   }
   const responseJSON = await fetch(`http://localhost:6278/admin/update_user/${idUser}`, options)
   const response = await responseJSON.json()
  return response
}


export async function catchDeleteUser(token, endPoint) {
    console.log(typeof token)
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }
    const responseJSON = await fetch(`http://localhost:6278/admin/delete_user/${endPoint}`, options)
    //const response = await responseJSON.json()
    //console.log(response)
   //return response
}