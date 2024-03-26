const BASE_URL = 'http://localhost:8000'

let mode = 'CREATE'
let selectedId = '' //ตัวแปรแบบ Golbal ใช้ได้ทุกที่

window.onload = async () => {
  const urlParams = new URLSearchParams(window.location.search)
  const id = urlParams.get('id')
  console.log('id', id)
  if (id) {
    mode = 'EDIT'
    selectedId = id

    try {
        const response = await axios.get(`${BASE_URL}/Estates/${id}`)
        const Estate = response.data
        
  
        let name_estateDOM = document.querySelector('input[name=name_estate]')
        let address_estateDOM = document.querySelector('input[name=address_estate]')
        let size_estageDOM = document.querySelector('input[name=size_estage]')
        let detail_estageDOM = document.querySelector('input[name=detail_estage]')
  
        
        name_estateDOM.value = Estate.name_estate
        address_estateDOM.value = Estate.address_estate
        size_estageDOM.value = Estate.size_estage
        detail_estageDOM.value = Estate.detail_estage
  
        let type_estageDOMs = document.querySelectorAll('input[name=type_estage]:checked')
        for (let i = 0; i < type_estageDOMs.length; i++) {
            if (type_estageDOMs[i].value == Estate.type_estage) {
              type_estageDOMs[i].checked = true
            }
          }

    } catch (error) {
      console.log('error', error)
    }
  }
}
const validateData = (EstateData) => {
    let errors = []
    if (!EstateData.name_estate) {
        errors.push('กรุณากรอกชื่ออสังหาริมทรัพย์')
    }
    if (!EstateData.address_estate) {
        errors.push('กรุณากรอกที่อยู่ของอสังหาริมทรัพย์')
    }

    if (!EstateData.size_estate) {
        errors.push('กรุณากรอกขนาดพื้นที่้')
    }
    if (!EstateData.type_estate) {
        errors.push('กรุณาเลือกประเภทของอสังหาริมทรัพย์')
    }
    /*if (!userData.interests) {
        errors.push('กรุณาเลือกสิ่งที่สนใจ')
    }*/
    if (!EstateData.description_estate) {
        errors.push('กรุณากรอกคำอธิบายเพิ่มเติมเกี่ยวกับอสังหาริมทรัพย์')
    }
    return errors
  }

  const submitData = async () => {
    let name_estateDom = document.querySelector('input[name=name_estate]')
    let address_estateDom = document.querySelector('input[name=address_estate]')
    let size_estateDOM = document.querySelector('input[name=size_estate]')

    let type_estateDOM = document.querySelector('input[name=type_estate]:checked') || {}
    //let interestDOMs = document.querySelectorAll('input[name=interests]:checked') || {}

    let description_estateDOM = document.querySelector('input[name=description_estate]')

    let messageDOM = document.getElementById('message')


    try {
      

      
      console.log('test')
      let EstateData = {
        name_estate: name_estateDom.value,
        address_estate: address_estateDom.value,
        size_estate: size_estateDOM.value,
        type_estate: type_estateDOM.value,
        description_estate: description_estateDOM.value,

      }
      console.log('submit data', EstateData)

      const errors = validateData(EstateData)

      if (errors.length > 0) {
        throw {
          message: 'กรอกข้อมูลไม่ครบ!',
          errors: errors
        }
      }

      let message = 'บันทึกข้อมูลสำเร็จ!'
//--------------------------------------------------------------
      if(mode == 'CREATE'){
        const response = await axios.post(`${BASE_URL}/employees`, employeeData)
        console.log('response', response.data)
      } else {
        const response = await axios.put(`${BASE_URL}/employees/${selectedId}`, employeeData)
        message = 'แก้ไขข้อมูลสำเร็จ!'
        console.log('response', response.data)
      }
      messageDOM.innerText = message
      messageDOM.className = 'message success'

    } catch (error) {
      console.log('error message', error.message)
      console.log('error', error.erros)
      if (error.response) {
        console.log(error.response)
        error.message = error.response.data.message
        error.errors = error.response.data.errors
      }

      let htmlData = '<div>'
      htmlData += `<div>${error.message}</div>`
      htmlData += '<ul>'
      for (let i = 0; i < error.errors.length; i++) {
        htmlData += `<li>${error.errors[i]}</li>`
      }
      htmlData += '</ul>'
      htmlData += '<div>'


      messageDOM.innerHTML = htmlData
      messageDOM.className = 'message danger'
    }
  }