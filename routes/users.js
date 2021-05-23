const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const bcrypt = require('bcryptjs')
const mongoose = require("mongoose");
const User = require('../models/User')


//importing jwt 
const jwt = require("jsonwebtoken");

const router = express.Router()

// for parsing application/json
router.use(bodyParser.json());

router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

router.get("/",(req,res)=>{
  res.send("<form action='/user' method='post'><input type='text' name='username' placeholder='username'><input type='text' name='email' placeholder='email'><input type='text' name='password' placeholder='password'><button type='submit'>save</button></form>");
})

router.post("/user", async (req,res)=>{
    const { username, email , password: plainTextPassword } = req.body
  
    if (!username || typeof username !== 'string') {
      return res.json({ status: 'error', error: 'Invalid username' })
    }
  
    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
      return res.json({ status: 'error', error: 'Invalid password' })
    }
  
    if (plainTextPassword.length < 5) {
      return res.json({
        status: 'error',
        error: 'Password too small. Should be atleast 6 characters'
      })
    }
  
    const password = await bcrypt.hash(plainTextPassword, 10)
  
    try {
      const response = await User.create({

        username,
        email,
        password
      })
      
      console.log('User created successfully: ', response)
    
    } catch (error) {
      if (error.code === 11000) {
        return res.json({ status: 'error', error: 'Username already in use' })
      }
      throw error
    }
  
    res.json({ status: 'ok' })
  })


 
  router.post("/api/register",(req,res)=>{
   res.send("<h1>Hello<h1>")

})

router.post("/api/users/me", verifyToken, (req, res) => {
    jwt.verify(req.token, "secretkey", (err, authData) => {
    
        if(err) {
        res.sendStatus(403);
         } else {
        res.json({
        message: "User Data",
        authData
    });
  }
  
});
  
  });

router.post("/api/login", async (req, res) => {
  
   const { email, password} = req.body
   const user = await User.findOne({ email }).lean()
   if (!user) {
		return res.json({ status: 'error', error: 'Invalid email/password' })
	}

	if (await bcrypt.compare(password, user.password)) {
		// the username, password combination is successful

		jwt.sign({ user: user }, "secretkey", (err, token) => {
      res.json({token});
  });

		return res.json({ status: 'ok', data: token })
	}

	res.json({ status: 'error', error: 'Invalid email/password' })
})


function verifyToken(req, res, next) {
    
    const bearerHeader = req.headers["authorization"];
    
    if (typeof bearerHeader !== "undefined"){ 
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
  
        } else {
  
      res.sendStatus(403);
  
    }
  
  }




module.exports = router;