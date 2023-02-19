const bcrypt=require("bcrypt")
const { model } = require("../db")
const jwt=require("jsonwebtoken")
require("dotenv").config()
const verify=async(req,res,next)=>{
    let username = req.body.username
    let password = req.body.password
    let data = await model.findOne({ username })
    if (data) {
        let h = bcrypt.compareSync(password, data.password)
        if (h) {
            let token=jwt.sign({username},process.env.secretkey,{expiresIn:"1h"})
            console.log(token);
            localStorage.setItem("token",token)
            next()
        } else {
            res.json("notmatched")
        }
    } else {
        res.json("register")
    }
}

const verifytoken=async(req,res,next)=>{
    jwt.verify()
}
module.exports={
    verify
}