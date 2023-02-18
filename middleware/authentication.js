const bcrypt=require("bcrypt")
const { model } = require("../db")
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
module.exports={
    verify
}