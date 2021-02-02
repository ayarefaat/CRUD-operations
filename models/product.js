var mongoose = require("mongoose")
var Schema =mongoose.Schema
var products= new Schema({
    code:{
        type:Number,
        required:true,
        unique:true
    },
    pName:{
        type:String,
        required:true
    },
    pDesc:{
        type:String,
        required:true
    },
    pPrice:{
        type:Number,
        required:true
    },
    pCategory:{
        type:String,
        required:true
    },
})
mongoose.model("products",products)