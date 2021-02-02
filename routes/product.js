const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
router.use(express.static("./routes/img"))
// router.get('/product',(req,res)=>{
//     res.render("products/product")
// })
router.get('/',(req,res)=>{
    mongoose.model("products").find((err,data)=>{
        if(!err){
            res.render("products/product",{productList:data})
            console.log(data)
        }else{
            console.log("can't list products")
        }
    }).sort({pPrice:-1}).limit(3)
    
})
router.get('/add',(req,res)=>{
    res.render("products/add")
})
router.post('/save',(req,res)=>{
    var name = req.body.pName;
    var desc = req.body.pDesc;
    var price = req.body.pPrice;
    var category = req.body.pCategory;
    var code= req.body.code;
    // res.render("products/save" ,{name,desc,price,category})
    console.log(name)
    var productModel =mongoose.model("products");
    var product = new productModel()
    product.pName=name;
    product.pDesc=desc;
    product.pPrice=price;
    product.pCategory=category;
    product.code=code;

    product.save((err)=>{
        if(!err){
            console.log("new product update successfully")
            res.redirect('/products')
        }else{
            var errorMsg="can not add product!!"
            console.log("can not add product!!");
            res.render("products/error")
        }
    })
})
router.get('/edit/:id',(req,res)=>{
    let id = req.params.id;
    mongoose.model("products").findOne({code:id},function(err,data){
        if(!err){
            res.render("products/edit",data)
            console.log("inside edit"+data)
        }else{
            console.log(err);
        }
    })
    // res.render("products/edit")
})
router.post('/edit',(req,res)=>{
   
    var productModel =mongoose.model("products");
    productModel.findOneAndUpdate({code:req.body.code},req.body,{upsert:true},
        (err,data)=>{
            res
            .redirect("/products");
        });
})
router.get('/delete/:id',(req,res)=>{
    let id = req.params.id;
    mongoose.model("products").deleteOne({code:id},function(err,data){
        if(!err){
            res.redirect("/products");
        }else{
            console.log(err);
        }
    })
    // res.render("products/edit")
})



router.get('/search',(req,res)=>{
    res.render("products/search")
})
router.post('/result',(req,res)=>{
    var name = req.body.name;
    console.log(name)
    mongoose.model("products").find({pName:name},(err,data)=>{
        if(!err){
            res.render("products/result",{productList:data})
            console.log(data)
        }else{
            console.log("can't list products")
        }
    })
})
module.exports=router;