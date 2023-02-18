const { model } = require("../db")
const bcrypt=require("bcrypt")
const { appendFileSync }=require('fs')
const path=require('path')
const validatoor=async(req,res,next)=>{
    let username = req.body.username
    let pass = req.body.password
    let data = await model.findOne({ username })
    if (data) {
        let h = bcrypt.hashSync(pass, 5)
        if (h) {
            await model.findOneAndUpdate({ username }, { password: h })
            next()
        }
    }
}
const update=async(req,res,next)=>{
    let id = req.body.id
    let type = req.body.type
    let val=req.body.value
    let name=req.body.role
    console.log(name);
    let user = await model.findOne({username:name})
    console.log(user);
    let data = await model.findOne({_id:id})
    console.log(user);
    if (data) {
        if(user.role=="Admin"){
            if(type=="username"){
                await model.findByIdAndUpdate({_id:id},{username:val})
                next()
            }else if(type=="dob"){ 
                await model.findByIdAndUpdate({_id:id},{dob:val})
                next()
            }else if(type=="location"){
                await model.findByIdAndUpdate({_id:id},{location:val})
                next()
            }
        }else{
            res.json("notanadmin")
        }
        
    }else{
        res.json("error")
    }
}
const record=async(req,res,next)=>{
    let username=req.body.username
    let data=await model.findOne({username})
    const rec=`Username:-${data.username} Role:- ${data.role}.\n`
    appendFileSync("./log.txt",rec,"utf-8")
    next()
}
module.exports={
    validatoor,
    update,
    record
}