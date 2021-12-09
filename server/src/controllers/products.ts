import express from 'express'
const fs = require("fs");
var path = require('path');



const router = express.Router()

router.get('/all', (_, res) => {
  const page = _.query.page || 0;
  const pageSize = 25;
  let start = page as any * pageSize;
  let end = start + pageSize;

  var jsonPath = path.join(__dirname, '..', '..', '..', 'src', 'db', 'data', 'products.json');
  var jsonString = fs.readFileSync(jsonPath, 'utf8');
  let products = JSON.parse(jsonString);
  // console.log(products[0]);


  console.log({page, pageSize, start, end})

  res.json(products.slice(start, end));

})

router.get('/:id', (_, res) => {
  res.json({})
})

export default router
