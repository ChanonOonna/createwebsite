//แสดงข้อมูลลูกค้า.js
const BASE_URL = 'http://localhost:8000';
window.onload = async () => {
  await loadData();
}
const loadData = async () => {

    console.log('loaded')
    
    
      //1. load user ทั้งหมดออกมาจาก API
      const responseuser = await axios.get(`${BASE_URL}/Customers`);
      console.log(responseuser.data);
   //2. นำข้อมูล user ที่โหลดมาใส่เข้าไปใน html
    const usersDOM = document.getElementById('user');
   //http://localhost:8000/users/1

   
   let htmlData ='<div>'
    for(let i = 0; i < responseuser.data.length; i++){
        let datacustomers = responseuser.data[i];
        htmlData += `<div>
        ${datacustomers.id} ${datacustomers.firstname_customer} ${datacustomers.lastname_customer}
        <a href='usercustomer.html'.html?id=${datacustomers.id}'><button class="edit">Edit</button></a> 
        <button class ='delete' data-id='${datacustomers.id}'>Delete</button>
        </div>`;
    }
   htmlData += '</div>';
   usersDOM.innerHTML = htmlData;
   const deleteDOMs = document.getElementsByClassName('delete');
   for(let i = 0; i < deleteDOMs.length; i++){
       deleteDOMs[i].addEventListener('click', async (event)=>{
          //ดึง id ของ user ที่ต้องการลบ
          const id = event.target.dataset.id;
          try {//http://localhost:8000/users/1
            await axios.delete(`${BASE_URL}/Customers/${id}`);
            loadData() ///recursive function = เราเรียก function ซ้ำ
          }catch(error){
              console.log('error: ', error);
          }
       });
   }
}

