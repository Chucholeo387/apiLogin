const express = require("express");
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userMiddleware = require('../middelware/users');
const {connectDb}  = require ('../db')
const router = express.Router()

dotenv.config()


router.post('/', async (req, res, next) => {
  try {
    const db = await connectDb();
    const query = await db.query( `SELECT * FROM usuarios WHERE username = '${req.body.username}';`);
    

    if (query.rows[0].username !== req.body.username) {
      return res.status(401).send({
        msg: 'Username or password is incorrect!'
      });
    }

    bcrypt.compare(
      req.body.password,
      query.rows[0].password,
      async (bErr, bResult) => {
        if (bErr) {
          return res.status(401).send({
            msg: 'Username or password is incorrect!'
          });
        }
        if (bResult) {
          const token = jwt.sign({
              username: query.rows[0].username,
              userId: query.rows[0].id
            },
            'SECRETKEY', {
              expiresIn: '2h'
            }
          );
          return res.status(200).send({
            msg: 'Logged in!',
            token,
            name: query.rows[0].username
          });
        }
        return res.status(401).send({
          msg: 'Username or password is incorrect!'
        });
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      msg: 'Username or password is incorrect!'
    });
  }
});






module.exports = router

