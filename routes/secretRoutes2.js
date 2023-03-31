const express = require("express");
const userMiddleware = require('../middelware/users');
const {connectDb} = require ('../db.js')
const router = express.Router()




router.get('/', userMiddleware.isLoggedIn, async (req, res, next)=>{
    console.log(req.headers)
    const db = await connectDb()
    const query = await db.query(`SELECT * FROM usuarios WHERE username = '${req.headers.username}';`)

    res.json({
      name : query.rows[0].username
    }
    )



  })

  module.exports = router