const mongoose = require("mongoose")
const Schema =mongoose.Schema
const user= new Schema({
   name:{
       type:String,
       required:true
   },
   email:{
       type:String,
       required:true,
       unique:true
   },
   age:{
       type:Number,
       required:true
   }
})
mongoose.model("user",user)


// const mongoose = require('mongoose');
// let userSchema = new mongoose.Schema({
//     name:{
//         type:String,
//         required:true
//     },
//     email:{
//         type:String,
//         required:true
//     },
//     age:{
//         type:Number,
//         required:true
//     }
// })
// module.exports = mongoose.model("User" ,userSchema)