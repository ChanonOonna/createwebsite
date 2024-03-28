//กรอกข้อมูลลูกค้า .js
/*
name_estage
address_estage
type_estage
size_estage
description_estate
status
message
*/

const BASE_URL = 'http://localhost:7000';

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
        const response = await axios.get(`${BASE_URL}/Customers/${id}`) 

        const customers = response.data
        console.log(customers)
        let firstname_customerDOM = document.querySelector('input[name=firstname_customer]')
        let lastname_customerDOM = document.querySelector('input[name=lastname_customer]')
        
        let description_customerDOM = document.querySelector('textarea[name=description_customer]')
        
        firstname_customerDOM.value = customers.firstname_customer
        lastname_customerDOM.value = customers.lastname_customer
        
        description_customerDOM.value = customers.description_customer
        
        let type_customerDOMs = document.querySelectorAll('input[name=type_customer]')
        
        for (let i = 0; i < type_customerDOMs.length; i++) {
            if (type_customerDOMs[i].value == customers.type_customer) { // แก้ไข customers.type_Customer เป็น customers.type_customer
              type_customerDOMs[i].checked = true
            }
          }
      } catch (error) {
        console.log('error', error)
        console.log('error message', error.message); // แสดงข้อความของข้อผิดพลาด
        console.log('error stack', error.stack); // แสดงรายละเอียดเพิ่มเติมของข้อผิดพลาด
      }
    }
  }

  const validateDatacus = (customersData) => {
    let errors = []
    if (!customersData.firstname_customer) {
        errors.push('กรุณากรอกชื่อ')
    }
    if (!customersData.lastname_customer) {
        errors.push('กรุณากรอกที่นามสกุล')
    }
  
    if (!customersData.type_customer) {
        errors.push('กรุณากรอกประเภท')
    }
    if (!customersData.description_customer) {
        errors.push('กรุณาความต้องการเพิ่มเติม')
    }

    return errors
  }
  
const submitData = async () => {

    let firstname_customerDOM = document.querySelector('input[name=firstname_customer]')
    let lastname_customerDOM = document.querySelector('input[name=lastname_customer]')
    let type_customerDOM = document.querySelector('input[name=type_customer]') || {}
    let description_customerDOM = document.querySelector('textarea[name=description_customer]')

    let messageDOM = document.getElementById('message')

    try {
        let customersData = {
          firstname_customer: firstname_customerDOM.value,
          lastname_customer: lastname_customerDOM.value,
          type_customer: type_customerDOM.value,
          description_customer: description_customerDOM.value,
        }
        
        console.log('submit data', customersData)
  
        const errors = validateDatacus(customersData)
        
        if (errors.length > 0) {
            // มี error เกิดขึ้น
            throw {
                message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                errors: errors
            }
        }
        let message = 'บันทึกข้อมูลเรียบร้อยเเล้ว'

        if(mode == 'CREATE'){
            const response = await axios.post(`${BASE_URL}/Customers`,customersData) // Edited /Estates to /Customers
            console.log('response',response.data)
        } else {
            const response = await axios.put(`${BASE_URL}/Customers/${selectedId}`, customersData) // Edited /Estates to /Customers
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



