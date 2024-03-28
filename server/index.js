const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const cors = require('cors')
const app = express();

app.use(bodyParser.json());
app.use(cors())

const port = 8000;

let conn = null;

const initMySQL = async () => {
  conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'webdb',
    port: 3305
  })
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
      errors.push('กรุณากรอกการบำรุงอสังหาริมทรัพย์')
  }
  if (!estateData.maintenance_expense) {
      errors.push('กรุณากรอกค่าใช้จ่ายประจำเดือน')
  }
      
  return errors
}
// path = GET /users สำหรับ get users ทั้งหมดที่บันทึกเข้าไปออกมา
app.get('/Estates', async (req, res) => {
  const results = await conn.query('SELECT * FROM Estates')
  res.json(results[0]);
})

// path = POST /users สำหรับการสร้าง users ใหม่บันทึกเข้าไป
app.post('/Estates', async (req, res) => {
  try {
    let Estate = req.body;
    const errors = validateData(Estate)
    if (errors.length > 0) {
      throw { message : 'กรุณากรอกข้อมูลให้ครบถ้วนน๊ะจะหลังบ้าน' ,
      errors : errors }
    }

  const results = await conn.query('INSERT INTO Estates SET ?', Estate)
  res.json({
    message: 'Create user successfully',
    data: results[0]
  })
  }catch (error) {
    const errorMessage = error.errors || 'something wrong'
    const errors = error.errors || []
    console.error('error message', error.message)
    res.status(500).json({
      message: errorMessage,
      error : errors
    })
  }
})


// path = GET /users/:id สำหรับการดึง users รายคนออกมา
app.get('/Estates/:id', async (req, res) => {
  try {
    let Estate = req.params.id
    const results = await conn.query('SELECT * FROM Estates WHERE id = ?', Estate)
    if (results[0].length == 0) {
      throw { statusCode: 404, message: 'หาไม่เจอ' }
    }
    res.json(results[0][0])
  } catch (error) {
    console.error('error message', error.message)
    let statusCode = error.statusCode || 500
    res.status(statusCode).json({
      message: 'something wrong',
      errorMessage: error.message
    })
  }
})

//path = PUT /users/:id สำหรับการแก้ไข users รายคน (ตาม id ที่บันทึกเข้าไป)
app.put('/Estates/:id', async (req, res) => {
  try {
    let Estate = req.params.id;
    let updateEstates = req.body;
  const results = await conn.query(
    'UPDATE Estates SET ? WHERE id = ?', 
    [updateEstates, Estate]
    )
  console.log('results', results)
  res.json({
    message: 'Create user successfully',
    data: results[0]
  })
  }catch (error) {
    console.error('error message', error.message)
    res.status(500).json({
      message: 'something worng',
    })
  }
})

// path = DELETE /users/:id สำหรับการลบ users รายคน (ตาม id ที่บันทึกเข้าไป)
app.delete('/Estates/:id', async (req, res) => {
  try {
    let id = req.params.id;
  const results = await conn.query('DELETE FROM Estates WHERE id = ?', id)
  console.log('results', results)
  res.json({
    message: 'Delete user successfully',
    data: results[0]
  })
  }catch (error) {
    console.error('error message', error.message)
    res.status(500).json({
      message: 'something worng',
    })
  }
})

////////////////////////////////////////////////////
/**/
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


// path = GET /users สำหรับ get users ทั้งหมดที่บันทึกเข้าไปออกมา
app.get('/Customers', async (req, res) => {
  const results = await conn.query('SELECT * FROM Customers')
  res.json(results[0]);
})

// path = POST /users สำหรับการสร้าง users ใหม่บันทึกเข้าไป
app.post('/Customers', async (req, res) => {
  try {
    let Customer = req.body;
    const errors = validateDatacus(Customer)
    if (errors.length > 0) {
      throw { message : 'กรุณากรอกข้อมูลให้ครบถ้วนน๊ะจะหลังบ้าน' ,
      errors : errors }
    }

  const results = await conn.query('INSERT INTO Customers SET ?', Customer)
  res.json({
    message: 'Create user successfully',
    data: results[0]
  })
  }catch (error) {
    const errorMessage = error.errors || 'something wrong'
    const errors = error.errors || []
    console.error('error message', error.message)
    res.status(500).json({
      message: errorMessage,
      error : errors
    })
  }
})


// path = GET /users/:id สำหรับการดึง users รายคนออกมา
app.get('/Customers/:id', async (req, res) => {
  try {
    let Customer = req.params.id
    const results = await conn.query('SELECT * FROM Customers WHERE id = ?', Customer)
    if (results[0].length == 0) {
      throw { statusCode: 404, message: 'หาไม่เจอ' }
    }
    res.json(results[0][0])
  } catch (error) {
    console.error('error message', error.message)
    let statusCode = error.statusCode || 500
    res.status(statusCode).json({
      message: 'something wrong',
      errorMessage: error.message
    })
  }
})

//path = PUT /users/:id สำหรับการแก้ไข users รายคน (ตาม id ที่บันทึกเข้าไป)
app.put('/Customers/:id', async (req, res) => {
  try {
    let Customer = req.params.id;
    let updatecustomers = req.body;
  const results = await conn.query(
    'UPDATE Customers SET ? WHERE id = ?', 
    [updatecustomers, Customer]
    )
  console.log('results', results)
  res.json({
    message: 'Create user successfully',
    data: results[0]
  })
  }catch (error) {
    console.error('error message', error.message)
    res.status(500).json({
      message: 'something worng',
    })
  }
})

// path = DELETE /users/:id สำหรับการลบ users รายคน (ตาม id ที่บันทึกเข้าไป)
app.delete('/Customers/:id', async (req, res) => {
  try {
    let id = req.params.id;
  const results = await conn.query('DELETE FROM Customers WHERE id = ?', id)
  console.log('results', results)
  res.json({
    message: 'Delete user successfully',
    data: results[0]
  })
  }catch (error) {
    console.error('error message', error.message)
    res.status(500).json({
      message: 'something worng',
    })
  }
})




///////////////////
app.listen(port, async (req, res) => {
  await initMySQL()
    console.log('http server running on', + port);
})