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
            next()
        } else {
            res.json("notmatched")
        }
    } else {
        res.json("register")
    }
}

const verifytoken=(req,res,next)=>{
    let token=req.body.token
    if(token){
        jwt.verify(token,process.env.secretkey,(err,decoded)=>{
            if(decoded){
                next()
            }else{
                res.json("tokenexpired")
            }
        })
        
    }
}
function givetoken(req){
    let token=jwt.sign({username:req.body.username},process.env.secretkey,{expiresIn:"1h"})
    return token
}

module.exports={
    givetoken,
    verify,
    verifytoken
}