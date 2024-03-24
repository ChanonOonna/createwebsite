const BASE_URL = 'http://localhost:8000';

let mode = 'CREATE' //default mode
let selectedId =''


/*
name_estage
address_estage
type_estage
size_estage
detail_estage

message
*/




window.onload = async () =>{
    const urlParams =new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    console.log('id',id)
    if (id){
    mode = 'EDIT'
    selectedId =id

    //1ดึงข้อมูล user เก่าก่อน
    try {
        const response = await axios.get(`${BASE_URL}/users/${id}`)
        const user = response.data
  
        let firstNameDOM = document.querySelector('input[name=firstname]')
        let lastNameDOM = document.querySelector('input[name=lastname]')
        let ageDOM = document.querySelector('input[name=age]')
        let descriptionDOM = document.querySelector('textarea[name=description]')
  
        firstNameDOM.value = user.firstname
        lastNameDOM.value = user.lastname
        ageDOM.value = user.age
        descriptionDOM.value = user.description
  
        let genderDOMs = document.querySelectorAll('input[name=gender]')
        //let interestDOMs = document.querySelectorAll('input[name=interest]')
  
        for (let i = 0; i < genderDOMs.length; i++) {
          if (genderDOMs[i].value == user.gender) {
            genderDOMs[i].checked = true
          }
        }
        
        
        /*for (let i = 0; i < interestDOMs.length; i++) {
          if (user.interests.includes(interestDOMs[i].value)) {
            interestDOMs[i].checked = true
          }
        }*/
  
      } catch (error) {
        console.log('error', error)
      }
    }
  }

const validateData = (userData) => {
    let errors = []
    if (!userData.firstName) {
        errors.push('กรุณากรอกชื่อ')
    }
    if (!userData.lastName) {
        errors.push('กรุณากรอกนามสกุล')
    }
    if (!userData.age) {
        errors.push('กรุณากรอกอายุ')
    }
    if (!userData.gender) {
        errors.push('กรุณาเลือกเพศ')
    }
    /*if (!userData.interests) {
        errors.push('กรุณาเลือกสิ่งที่สนใจ')
    }*/
    if (!userData.description) {
        errors.push('กรุณากรอกคำอธิบาย')
    }
    return errors
}

const submitData = async () => {

    let firstNameDom = document.querySelector('input[name=firstname]')
    let lastNameDom = document.querySelector('input[name=lastname]')
    let ageDOM = document.querySelector('input[name=age]')

    let genderDOM = document.querySelector('input[name=gender]:checked') || {}
    //let interestDOMs = document.querySelectorAll('input[name=interest]:checked') || {}

    let descriptionDOM = document.querySelector('textarea[name=description]')

    let messageDOM = document.getElementById('message')

    try {
        /*let interest = []

        for (let i = 0; i < interestDOMs.length; i++) {
            interest.push(interestDOMs[i].value)
        }*/

        let userData = {
            firstName: firstNameDom.value,
            lastName: lastNameDom.value,
            age: ageDOM.value,
            gender: genderDOM.value,
            description: descriptionDOM.value,
            /*interests: interest.join(',') // ให้ส่วนสนใจเป็น string แบบ comma-separated*/
        }

        const errors = validateData(userData)
        if (errors.length > 0) {
            // มี error เกิดขึ้น
            throw {
                message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                errors: errors
            }
        }
        let message = 'บันทึกข้อมูลเรียบร้อยเเล้ว'

        if(mode == 'CREATE'){
            const response = await axios.post(`${BASE_URL}/users`,userData)
            console.log('response',response.data)
        } else {//http://localhost:8000/users/17
            const response = await axios.put(`${BASE_URL}/users/${selectedId}`, userData)
            message = 'แก้ไขข้อมูลเรียบร้อยแล้ว'
            console.log('response', response.data)
        }
        
        messageDOM.innerText = 'บันทึกข้อมูลเรียบร้อยแล้ว'
        messageDOM.className = 'message success'
        
    } catch (error) {
        console.log('error message', error.message)
        console.log('error', error.errors)

        if (error.response) {
            console.log(error.response)
            error.message = error.response.data.message
            error.errors =error.response.data.errors
        }

        let htmlData = '<div><ul>'
        htmlData += `<div>${error.message}</div>`
        for (let i = 0; i < error.errors.length; i++) {
            htmlData += `<li>${error.errors[i]}</li>`
        }
        htmlData += '</ul></div>'

        messageDOM.innerHTML = htmlData
        messageDOM.className = 'message danger'
    }
}