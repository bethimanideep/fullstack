const mongoose=require("mongoose")
mongoose.set('strictQuery', true)
require("dotenv").config()
const connection=mongoose.connect(process.env.mongoURL)
const schema=mongoose.Schema({},{
    versionKey:false,
    strict:false
})
const model=mongoose.model("user",schema)
module.exports={
    connection,
    model
}