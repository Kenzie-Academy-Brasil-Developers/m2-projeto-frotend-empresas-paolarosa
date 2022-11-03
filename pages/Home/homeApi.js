import { renderCompanys, selectSector } from "./home.js"

export async function catchCompanys() {

    const responseJSON = await fetch('http://localhost:6278/companies')
    const response = await responseJSON.json()
    renderCompanys(response)
}
catchCompanys()


export async function catchSector(){
    const responseJSON = await fetch('http://localhost:6278/sectors')
    const response = await responseJSON.json()
   // console.log(response)
    selectSector(response)
}
catchSector()
