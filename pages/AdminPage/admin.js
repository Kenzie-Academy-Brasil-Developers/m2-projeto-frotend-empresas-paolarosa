import { catchAllUsers, catchCompanys, catchDeleteDepartment, catchDeleteUser, catchDepartments, catchEditDepartment, catchUsersCompany, catchUsersWithoutJob, createDepartment, editEmployees, firedUser, hireUser } from "./adminApi.js";
let token = JSON.parse(localStorage.getItem("@KenzieCompany"))


export function createCardsDepartments(departments) {

    const li = document.createElement("li")
    const departmentName = document.createElement("h4")
    const departmentDescription = document.createElement("p")
    const company = document.createElement("p")
    const divButtons = document.createElement("div")
    const eye = document.createElement("img")
    const pen = document.createElement("img")
    const trash = document.createElement("img")

    departmentName.innerText = departments.name
    departmentDescription.innerText = departments.description
    company.innerText = departments.companies.name
    divButtons.classList.add("buttons")
    eye.src = "../../assets/Vector eye.png"
    pen.src = "../../assets/Vector2.png"
    pen.classList.add("pen")
    trash.src = "../../assets/trash red 2.png"
    trash.classList.add("trash")

    eye.addEventListener("click", () => {
        modalViewDepartment(departments)
    })

    pen.addEventListener("click", () => {
        modalEditDepartment(departments)
        console.log(departments.uuid)
    })

    trash.addEventListener("click", () => {
        modalRemoveDepartment(departments)
        console.log(departments.uuid)
    })
    divButtons.append(eye, pen, trash)
    li.append(departmentName, departmentDescription, company, divButtons)

    return li
}


export function renderDepartments(object) {
    const ul = document.querySelector(".ul-department")
    const select = document.querySelector(".select")
    object.forEach((departments) => {
        if (select.value == "") {
            ul.appendChild(createCardsDepartments(departments))
        }
    })
    select.addEventListener("change", () => {
        ul.innerHTML = ""
        object.forEach((department) => {
            console.log(department.companies.name)
            if (select.value == department.companies.name) {
                ul.appendChild(createCardsDepartments(department))
            } else if (select.value == "") {
                ul.appendChild(createCardsDepartments(department))
            }
        })
    })
}


export async function renderAllUsers() {
    const object = await catchAllUsers(token)
    const objectCompany = await catchUsersCompany(token)
    const ul = document.querySelector(".ul-users")

    object.forEach((card) => {
        if (card.username !== "ADMIN") {
            const li = document.createElement("li")
            const username = document.createElement("h4")
            const level = document.createElement("p")
            const divButtons = document.createElement("div")
            const company = document.createElement("p")
            const pen = document.createElement("img")
            const trash = document.createElement("img")

            username.innerText = card.username
            level.innerText = (card.professional_level)[0].toUpperCase() + (card.professional_level).substr(1)
            divButtons.classList.add("buttons-users")
            pen.src = "../../assets/Vector2.png"
            pen.classList.add("pen")
            trash.src = "../../assets/trash red 2.png"
            trash.classList.add("trash")

            pen.addEventListener("click", () => {
                modalEditUser(card)
            })
            trash.addEventListener("click", () => {
                modalRemoveUser(card)
            })
            if (card.department_uuid !== null) {
                objectCompany.forEach((companyNew) => {
                    if (card.department_uuid == companyNew.uuid) {
                        company.innerText = companyNew.companies.name
                    }
                })
            }

            divButtons.append(pen, trash)
            li.append(username, level, company, divButtons)
            ul.appendChild(li)
        }
    })
    return ul
}
renderAllUsers()


function logout() {
    const buttonLogout = document.querySelector(".button-nav-logout")
    buttonLogout.addEventListener("click", () => {
        localStorage.clear("@KenzieCompany")
        window.location.replace("../Login/login.html")
    })
}
logout()


export function selectCompany(object) {
    let select = document.querySelector(".select")
    object.forEach((company) => {
        select.insertAdjacentHTML("beforeend", `
        <option value="${company.name}">${company.name}</option>
    `)
    })
}


export async function modalCreateDepartment() {
    const companys = await catchCompanys()
    const modaldiv = document.querySelector(".modaldiv")
    modaldiv.classList.remove("hidden")

    const modal = document.createElement("div")
    const divTitle = document.createElement("div")
    const title = document.createElement("h3")
    const buttonClose = document.createElement("button")
    const inputName = document.createElement("input")
    const description = document.createElement("input")
    const select = document.createElement("select")
    const option = document.createElement("option")
    const buttonCreate = document.createElement("button")

    modal.classList.add("modal")
    title.innerText = "Criar Departamento"
    buttonClose.classList.add("button-close-modal")
    buttonClose.innerText = "X"
    inputName.classList.add("name-department")
    inputName.placeholder = "Noma do departamento"
    description.classList.add("description-department")
    description.placeholder = "Descrição"
    buttonCreate.classList.add("button-modal-create-department")
    buttonCreate.innerText = "Criar o departamento"
    select.classList.add("select-modal")
    option.value = ""
    option.innerText = "Selecionar Empresa"

    select.appendChild(option)
    companys.forEach((company) => {
        option.insertAdjacentHTML("afterend", `
        <option value="${company.uuid}">${company.name}</option>
    `)
    })
    buttonClose.addEventListener("click", () => {
        modaldiv.classList.add("hidden")
        window.location.reload()
    })
    buttonCreate.addEventListener("click", async () => {
        await createDepartment(token, inputName.value, description.value, select.value)
        modaldiv.classList.add("hidden")
        window.location.reload()
    })

    divTitle.append(title, buttonClose)
    modal.append(divTitle, inputName, description, select, buttonCreate)
    modaldiv.appendChild(modal)
}
//modalCreateDepartment()


function openModalCreateDepartment() {
    const buttonCreate = document.querySelector(".button-create-department")
    buttonCreate.addEventListener("click", () => {
        modalCreateDepartment()
    })
}
openModalCreateDepartment()


export async function modalEditDepartment(departments) {

    const modaldiv = document.querySelector(".modaldiv")
    const pen = document.querySelector(".pen-department")
    modaldiv.classList.remove("hidden")
    const modal = document.createElement("div")
    const divTitle = document.createElement("div")
    const title = document.createElement("h3")
    const buttonClose = document.createElement("button")
    const description = document.createElement("textarea")
    const buttonSave = document.createElement("button")

    modal.classList.add("modal")
    modal.classList.add("modal-edit")
    title.innerText = "Editar Departamento"
    buttonClose.classList.add("button-close-modal")
    buttonClose.innerText = "X"
    description.classList.add("description-department-edit")
    description.placeholder = departments.description
    buttonSave.classList.add("button-modal-save-department")
    buttonSave.innerText = "Salvar alterações"

    buttonClose.addEventListener("click", () => {
        modaldiv.classList.add("hidden")
        window.location.reload()
    })
    buttonSave.addEventListener("click", async () => {
        await catchEditDepartment(token, departments.uuid, description.value)
        modaldiv.classList.add("hidden")
        window.location.reload()
    })

    divTitle.append(title, buttonClose)
    modal.append(divTitle, description, buttonSave)
    modaldiv.appendChild(modal)
}


async function modalRemoveDepartment(department) {
    const modaldiv = document.querySelector(".modaldiv")
    modaldiv.classList.remove("hidden")
    const modal = document.createElement("div")
    const divTitle = document.createElement("div")
    const title = document.createElement("h3")
    const buttonClose = document.createElement("button")
    const buttonSave = document.createElement("button")

    modal.classList.add("modal")
    modal.classList.add("modal-remove-department")
    title.innerText = `Realmente deseja deletar o Departamento ${department.name} demitir seus funcionários?`
    buttonClose.classList.add("button-close-modal")
    buttonClose.innerText = "X"
    buttonSave.classList.add("button-modal-remove-department")
    buttonSave.innerText = "Confirmar"

    buttonClose.addEventListener("click", () => {
        modaldiv.classList.add("hidden")
        window.location.reload()
    })
    buttonSave.addEventListener("click", async () => {
        await catchDeleteDepartment(token, department.uuid)
        modaldiv.classList.add("hidden")
        window.location.reload()
    })
    divTitle.append(title, buttonClose)
    modal.append(divTitle, buttonSave)
    modaldiv.appendChild(modal)
}


export async function modalViewDepartment(departments) {
    const users = await catchUsersWithoutJob(token)
    const usersDepartment = await catchAllUsers(token)

    const modaldiv = document.querySelector(".modaldiv")
    modaldiv.classList.remove("hidden")
    const modal = document.createElement("div")
    const nameDepartment = document.createElement("h3")
    const buttonClose = document.createElement("button")
    const divContainer = document.createElement("div")
    const divInfos = document.createElement("div")
    const description = document.createElement("h4")
    const company = document.createElement("p")
    const divSelect = document.createElement("div")
    const select = document.createElement("select")
    const option = document.createElement("option")
    const buttonHire = document.createElement("button")
    const ul = document.createElement("ul")

    modal.classList.add("modal")
    modal.classList.add("modal-view")
    nameDepartment.innerText = departments.name
    buttonClose.classList.add("button-close")
    buttonClose.innerText = "X"
    divInfos.classList.add("div-infos")
    description.innerText = departments.description
    company.innerText = departments.companies.name
    divSelect.classList.add("div-select-modal")
    buttonHire.innerText = "Confirmar"
    buttonHire.classList.add("button-hire")
    select.classList.add("select-modal-view")
    option.value = ""
    option.innerText = "Selecionar Usuário"
    select.appendChild(option)

    let idUser = ""
    users.forEach((user) => {
        option.insertAdjacentHTML("afterend", `
        <option value="${user.uuid}">${user.username}</option>`)
    })
    select.addEventListener("change", (event) => {
        idUser = event.target.value
    })
    buttonHire.addEventListener("click", async () => {
        await hireUser(token, idUser, departments.uuid)
        window.location.reload()
    })

    usersDepartment.forEach((userDepartment) => {
        if (departments.uuid === userDepartment.department_uuid) {
            const li = document.createElement("li")
            li.insertAdjacentHTML("beforeend",
                `<h4>${userDepartment.username}</h4>
            <p>${(userDepartment.professional_level)[0].toUpperCase() + (userDepartment.professional_level).substr(1)}</p>
            <p>${departments.companies.name}</p>`)
            const buttonFire = document.createElement("button")
            buttonFire.innerText = "Desligar"
            li.appendChild(buttonFire)
            ul.appendChild(li)
            buttonFire.addEventListener("click", async () => {
                await firedUser(token, userDepartment.uuid)
                window.location.reload()
            })
        }
    })
    buttonClose.addEventListener("click", () => {
        modaldiv.classList.add("hidden")
        window.location.reload()
    })
    divInfos.append(description, company)
    divSelect.append(select, buttonHire)
    divContainer.append(divInfos, divSelect)
    modal.append(nameDepartment, buttonClose, divContainer, ul)
    modaldiv.appendChild(modal)
}


function modalEditUser(user) {

    const modaldiv = document.querySelector(".modaldiv")
    const pen = document.querySelector(".pen-department")
    const modal = document.createElement("div")
    const divTitle = document.createElement("div")
    const title = document.createElement("h3")
    const buttonClose = document.createElement("button")
    const selectModality = document.createElement("select")
    const optionModality = document.createElement("option")
    const selectLevel = document.createElement("select")
    const optionLevel = document.createElement("option")
    const buttonSave = document.createElement("button")

    modal.classList.add("modal")
    modal.classList.add("modal-edit")
    title.innerText = "Editar Usuário"
    buttonClose.classList.add("button-close-modal")
    buttonClose.innerText = "X"
    buttonSave.classList.add("button-modal-edit-user")
    buttonSave.innerText = "Editar"
    selectModality.classList.add("select-modal")
    optionModality.value = ""
    optionModality.innerText = "Selecionar modalidade de trabalho"
    selectModality.appendChild(optionModality)
    optionModality.insertAdjacentHTML("afterend", `
        <option value="presencial">Presencial</option>
        <option value="hibrido">Híbrido</option>
        <option value="home office">Home office</option>
    `)
    selectLevel.classList.add("select-modal")
    optionLevel.value = ""
    optionLevel.innerText = "Selecionar nível profissional"
    selectLevel.appendChild(optionLevel)
    optionLevel.insertAdjacentHTML("afterend", `
        <option value="estágio">Estágio</option>
        <option value="júnior">Júnior</option>
        <option value="pleno">Pleno</option>
        <option value="sênior">Sênior</option>
    `)

    buttonClose.addEventListener("click", () => {
        modaldiv.classList.add("hidden")
        window.location.reload()
    })
    buttonSave.addEventListener("click", async () => {
        await editEmployees(token, selectModality.value, selectLevel.value, user.uuid)
        window.location.reload()

    })

    divTitle.append(title, buttonClose)
    modal.append(divTitle, selectModality, selectLevel, buttonSave)
    modaldiv.appendChild(modal)
    modaldiv.classList.remove("hidden")
}

async function modalRemoveUser(user) {
    const modaldiv = document.querySelector(".modaldiv")
    modaldiv.classList.remove("hidden")
    const modal = document.createElement("div")
    const divTitle = document.createElement("div")
    const title = document.createElement("h3")
    const buttonClose = document.createElement("button")
    const buttonSave = document.createElement("button")

    modal.classList.add("modal")
    modal.classList.add("modal-remove-department")
    title.innerText = `Realmente deseja remover o usuário ${user.username}?`
    buttonClose.classList.add("button-close-modal")
    buttonClose.innerText = "X"
    buttonSave.classList.add("button-modal-remove-department")
    buttonSave.innerText = "Confirmar"

    buttonClose.addEventListener("click", () => {
        modaldiv.classList.add("hidden")
        window.location.reload()
    })
    buttonSave.addEventListener("click", async () => {
        await catchDeleteUser(token, user.uuid)
        modaldiv.classList.add("hidden")
        window.location.reload()
    })

    divTitle.append(title, buttonClose)
    modal.append(divTitle, buttonSave)
    modaldiv.appendChild(modal)
}
