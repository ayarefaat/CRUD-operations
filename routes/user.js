const express =require('express')
const router = express.Router()
const mongoose = require('mongoose')
router.use(express.static("./routes/img"))
router.get('/',(req,res)=>{
    mongoose.model("user").find((err,data)=>{
        if(!err){
            res.render("users/user",{userList:data})
            console.log(data)
        }else{
            console.log("can't list products")
        }
    }).sort({age:-1}).limit(4)
    // res.render('users/user')
})
router.get('/add',(req,res)=>{
    res.render('users/add')
})
router.post('/save',(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var age = req.body.age;
    var userModel =mongoose.model("user");
    var user = new userModel()
    user.name=name;
    user.email=email;
    user.age=age;

    user.save((err)=>{
        if(!err){
            console.log("new user added successfully")
            res.redirect('/users')
        }else{
            var errorMsg="can not add user!!"
            console.log("can not add user!!");
            res.render('users/error')
        }
    })
})
router.get('/edit/:email',(req,res)=>{
    let email = req.params.email;
    mongoose.model("user").findOne({email:email},function(err,data){
        if(!err){
            res.render("users/edit",data)
            console.log("inside edit"+data)
        }else{
            console.log(err);
        }
    })
})
router.post('/edit',(req,res)=>{
    let userModel =mongoose.model("user");
    userModel.findOneAndUpdate({email:req.body.email},req.body,
        (err,data)=>{
            res.redirect("/users");
        });
})
router.get('/delete/:email',(req,res)=>{
    let email = req.params.email;
    mongoose.model("user").deleteOne({email:email},function(err,data){
        if(!err){
            res.redirect("/users");
        }else{
            console.log(err);
        }
    })
})
router.get('/search',(req,res)=>{
    res.render('users/search')
})
router.post('/result',(req,res)=>{
    let name= req.body.name
    console.log(name)
    mongoose.model("user").find({name:name},(err,data)=>{
        if(!err){
            res.render("users/result",{userList:data})
            console.log(data)
        }else{
            console.log("can't list users")
        }
    })
})
module.exports=router;