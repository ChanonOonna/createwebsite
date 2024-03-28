//แสดงข้อมูลลูกค้า.js
const BASE_URL = 'http://localhost:7000';
window.onload = async () => {
  await loadData();
}
const loadData = async () => {

    console.log('loaded')
    
    
      //1. load user ทั้งหมดออกมาจาก API
      const response = await axios.get(`${BASE_URL}/Customers`);
      console.log(response.data);
   //2. นำข้อมูล user ที่โหลดมาใส่เข้าไปใน html
    const usersDOM = document.getElementById('user');
   //http://localhost:7000/users/1


   let htmlData ='<div>'
    for(let i = 0; i < response.data.length; i++){
        let data = response.data[i];
        htmlData += `<div>
        ${data.id} ${data.firstname_customer} ${data.lastname_customer}
        <a href='infocustomer.html?id=${data.id}'><button class="edit">Edit</button></a> 
        <button class ='delete' data-id='${data.id}'>Delete</button>
        </div>`;
    }
   htmlData += '</div>';
   usersDOM.innerHTML = htmlData;
   const deleteDOMs = document.getElementsByClassName('delete');
   for(let i = 0; i < deleteDOMs.length; i++){
       deleteDOMs[i].addEventListener('click', async (event)=>{
          //ดึง id ของ user ที่ต้องการลบ
          const id = event.target.dataset.id;
          try {//http://localhost:7000/users/1
            await axios.delete(`${BASE_URL}/Customers/${id}`);
            loadData() ///recursive function = เราเรียก function ซ้ำ
          }catch(error){
              console.log('error: ', error);
          }
       });
   }
}

