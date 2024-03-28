//<!--กรอก ข้อมูลอสังหา .js-->
/*
name_estage
address_estage
type_estage
size_estage
description_estate
status
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
        console.log(estates)
        let name_estateDOM = document.querySelector('input[name=name_estate]')
        let address_estateDOM = document.querySelector('input[name=address_estate]')
        let size_estateDOM = document.querySelector('input[name=size_estate]')
        let description_estateDOM = document.querySelector('textarea[name=description_estate]')
        let status_estateDOM = document.querySelector('select[name=status_estate]')
        let maintenance_reportDOM = document.querySelector('textarea[name=maintenance_report]')
        let maintenance_expenseDOM = document.querySelector('input[name=maintenance_expense]')
        
        name_estateDOM.value = estates.name_Estate
        address_estateDOM.value = estates.address_Estate
        size_estateDOM.value = estates.size_Estate
        description_estateDOM.value = estates.description_Estate
        status_estateDOM.value = estates.status_estate
        maintenance_reportDOM.value = estates.maintenance_report
        maintenance_expenseDOM.value = estates.maintenance_expense
        
        let type_estateDOMs = document.querySelectorAll('input[name=type_estate]')
  
        
        for (let i = 0; i < type_estateDOMs.length; i++) {
            if (type_estateDOMs[i].value == estates.type_Estate) {
              type_estateDOMs[i].checked = true
            }
          }

      } catch (error) {
        console.log('error', error)
        console.log('error message', error.message); // แสดงข้อความของข้อผิดพลาด
        console.log('error stack', error.stack); // แสดงรายละเอียดเพิ่มเติมของข้อผิดพลาด
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
        errors.push('กรุณากรอกขนาดพื้นที่')
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
    if (!estateData.status_estate) {
        errors.push('กรุณาเลือกสถานะของอสังหาริมทรัพย์')
    }
    if (!estateData.maintenance_report) {
        errors.push('กรุณากรอกการบำรุงรักษาอสังหาริมทรัพย์')
    }
    if (!estateData.maintenance_expense) {
        errors.push('กรุณากรอกค่าใช้จ่ายอสังหาริมทรัพย์ประจำเดือน')
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
    let status_estateDOM = document.querySelector('select[name=status_estate]')
    let maintenance_reportDOM = document.querySelector('textarea[name=maintenance_report]')
    let maintenance_expenseDOM = document.querySelector('input[name=maintenance_expense]')
    let messageDOM = document.getElementById('message')

    try {
        
        let EstateData = {
          name_estate: name_estateDOM.value,
          address_estate: address_estateDOM.value,  
          type_estate: type_estateDOM.value,
          size_estate: size_estateDOM.value,
          description_estate: description_estateDOM.value,
          status_estate: status_estateDOM.value,
          maintenance_report: maintenance_reportDOM.value,
          maintenance_expense: maintenance_expenseDOM.value
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
