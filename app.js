const express= require('express')
const app = express();
const mongoose = require('mongoose')
const fs= require('fs')

app.set("view engine","ejs")
app.set("views","./views")

// app.use(express.static(__dirname+"/routes/img"))
app.use(express.static("routes/img"));

const bodyParser =require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))


const products = require("./routes/product")
const users = require("./routes/user")
app.get('/',(req,res)=>{
    res.render("home")
})

app.use('/products',products)
app.use('/users',users)

mongoose.connect("mongodb://127.0.0.1:27017/productDb",{useUnifiedTopology: true,useNewUrlParser: true})
var files_arr =fs.readdirSync(__dirname+"/models")
files_arr.forEach((file)=>{
    require(__dirname+"/models/"+file)
});

app.listen(3000,()=>{
    console.log("Server is listening on port 3000")
})
