const express = require("express");
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userMiddleware = require('../middelware/users');
const {connectDb} = require ('../db.js')
const router = express.Router()

dotenv.config()



router.post('/', userMiddleware.validateRegister, async (req, res, next) => {
    const db = await connectDb()
    const query = await db.query(`SELECT * FROM usuarios WHERE username = '${req.body.username}';`)
   

        if (query.rows.length >= 1) {
            return res.status(409).send({
              msg: 'This username is already in use!'
            });
        }else {
            bcrypt.hash(req.body.password, 10, async (err, hash)=>{
                if (err) {
                    return res.status(500).send({
                      msg: err
                        });
                     }else{
                            await db.query(
                            `INSERT INTO usuarios (username, password) VALUES ('${
                              req.body.username
                            }', '${hash}');`)
                            }
                              return res.status(201).send({
                                msg: 'Registered!'
                              });
                });
            }
})
        
        
    
 






module.exports = router
