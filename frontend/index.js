

/*
name_estage
address_estage
type_estage
size_estage
detail_estage

message
*/

const BASE_URL = 'http://localhost:8000';

let mode = 'CREATE' //default mode
let selectedId =''

window.onload = async () =>{
    const urlParams =new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    console.log('id',id)
    if (id){
    mode = 'EDIT'
    selectedId =id

    //1ดึงข้อมูล user เก่าก่อน
    try {
        const response = await axios.get(`${BASE_URL}/Estates/${id}`)
        const estates = response.data
  
        let name_estateDOM = document.querySelector('input[name=name_estate]')
        let address_estateDOM = document.querySelector('input[name=address_estate]')
        let size_estageDOM = document.querySelector('input[name=size_estage]')
        let detail_estageDOM = document.querySelector('input[name=detail_estage]')
  
        
        name_estateDOM.value = estates.name_estate
        address_estateDOM.value = estates.address_estate
        size_estageDOM.value = estates.size_estage
        detail_estageDOM.value = estates.detail_estage

  
        let type_estageDOMs = document.querySelectorAll('input[name=type_estage]:checked')
  
        
        for (let i = 0; i < type_estageDOMs.length; i++) {
            if (type_estageDOMs[i].value == estates.type_estage) {
              type_estageDOMs[i].checked = true
            }
          }
  
      } catch (error) {
        console.log('error', error)
      }
    }
  }

  const validateData = (estateData) => {
    let errors = []
    if (!estateData.name_estate) {
        errors.push('กรุณากรอกชื่ออสังหาริมทรัพย์')
    }
    if (!estateData.address_estate) {
        errors.push('กรุณากรอกที่อยู่ของอสังหาริมทรัพย์')
    }
  
    if (!estateData.size_estate) {
        errors.push('กรุณากรอกขนาดพื้นที่้')
    }
    if (!estateData.type_estate) {
        errors.push('กรุณาเลือกประเภทของอสังหาริมทรัพย์')
    }
    /*if (!estateData.interests) {
        errors.push('กรุณาเลือกสิ่งที่สนใจ')
    }*/
    if (!estateData.description_estate) {
        errors.push('กรุณากรอกคำอธิบายเพิ่มเติมเกี่ยวกับอสังหาริมทรัพย์')
    }
    return errors
  }
  
const submitData = async () => {

    let name_estateDOM = document.querySelector('input[name=name_estate]')
    let address_estateDOM = document.querySelector('input[name=address_estate]')
    let size_estateDOM = document.querySelector('input[name=size_estate]')

    let type_estateDOM = document.querySelector('input[name=type_estate]:checked') || {}
    //let interestDOMs = document.querySelectorAll('input[name=interests]:checked') || {}

    let description_estateDOM = document.querySelector('textarea[name=description_estate]')

    let messageDOM = document.getElementById('message')

    try {
        
        let EstateData = {
          name_estate: name_estateDOM.value,
          address_estate: address_estateDOM.value,  
          type_estate: type_estateDOM.value,
          size_estate: size_estateDOM.value,
          description_estate: description_estateDOM.value,
        }
        
        console.log('submit data', EstateData)
  
        const errors = validateData(EstateData)
        
        if (errors.length > 0) {
            // มี error เกิดขึ้น
            throw {
                message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                errors: errors
            }
        }
        let message = 'บันทึกข้อมูลเรียบร้อยเเล้ว'

        if(mode == 'CREATE'){
            const response = await axios.post(`${BASE_URL}/Estates`,EstateData)
            console.log('response',response.data)
        } else {//http://localhost:8000/users/17
            const response = await axios.put(`${BASE_URL}/Estates/${selectedId}`, EstateData)
            message = 'แก้ไขข้อมูลเรียบร้อยแล้ว'
            console.log('response', response.data)
        }
        
        messageDOM.innerText = 'บันทึกข้อมูลเรียบร้อยแล้ว'
        messageDOM.className = 'message success'
        
    } catch (error) {
        console.log(description_estateDOM.value)
        console.log('error message', error.message)
        console.log('error', error.errors)////

        if (error.response) {
            console.log(error.response)
            error.message = error.response.data.message
            error.errors =error.response.data.errors
        }

        let htmlData = '<div><ul>'
        htmlData += `<div>${error.message}</div>`
        for (let i = 0; i < error.errors.length; i++) {
    htmlData += `<li>${error.errors[i]}</li>`;
}

        htmlData += '</ul></div>'

        messageDOM.innerHTML = htmlData
        messageDOM.className = 'message danger'
    }
}

