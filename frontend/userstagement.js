//แสดง ข้อมูลอสังหา .js

const BASE_URL = 'http://localhost:7000';
window.onload = async () => {
  await loadData();
}
const loadData = async () => {

    console.log('loaded')

    
      //1. load user ทั้งหมดออกมาจาก API
   const response = await axios.get(`${BASE_URL}/Estates`);
   console.log(response.data);
   //2. นำข้อมูล user ที่โหลดมาใส่เข้าไปใน html
   const usersDOM = document.getElementById('user');
   //http://localhost:7000/users/1

   
   let htmlData ='<div>'
    for(let i=0; i<response.data.length; i++){
        let dataEstates = response.data[i];
        htmlData += `<div>
        ${dataEstates.id} ${dataEstates.name_Estate} ${dataEstates.type_Estate}
        <a href='datastagement.html?id=${dataEstates.id}'><button class="edit">Edit</button></a> 
        <button class ='delete' data-id='${dataEstates.id}'>Delete</button>
        </div>`;
    }
   htmlData += '</div>';
   usersDOM.innerHTML = htmlData;
   const deleteDOMs = document.getElementsByClassName('delete');
   for(let i=0; i<deleteDOMs.length; i++){
       deleteDOMs[i].addEventListener('click', async (event)=>{
          //ดึง id ของ user ที่ต้องการลบ
          const id = event.target.dataset.id;
          try {//http://localhost:7000/users/1
            await axios.delete(`${BASE_URL}/Estates/${id}`);
            loadData() ///recursive function = เราเรียก function ซ้ำ
          }catch(error){
              console.log('error: ', error);
          }
       });
   }
}