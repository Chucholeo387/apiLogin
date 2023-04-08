
const express = require("express");
const router = express.Router()



const products = [
  {
    id: 1,
    name: 'chocolate',
    price: 1000
  },
  {
    id: 2,
    name: 'chocolate',
    price: 2000
  },
  {
    id: 3,
    name: 'chocolate',
    price: 2000
  },
  {
    id: 4,
    name: 'chocolate',
    price: 6000
  },
  {
    id: 5,
    name: 'chocolate',
    price: 3000
  },
]


router.get('/', (req, res) => {
    res.json(products)
    res.send('This is the secret content. Only logged in users can see that!');
  });

  




  module.exports = router