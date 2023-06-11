const router = require("express").Router();
const Cart = require("../models/Cart");
const {verifytokenandauthorise,verifytokenandadmin,verifytoken} = require("./verifytoken")

router.post("/",verifytokenandauthorise,async (req,res)=>{
    const newCart = new Cart(req.body);

    try{
        const savedCart = await newCart.save(); 
        res.status(200).json(savedCart);
    }catch(err){
        res.status(500).json(err);
    }
});

router.put("/:id",verifytokenandauthorise,async (req,res)=>{
    try{
        const updateCart = await Cart.updateOne({"id" : req.params.id},{
            $set : req.body
        },{new:true})

        res.status(200).json(updateCart);
    }catch(err){
        res.status(500).json(err);
    }
});

router.delete("/:id",verifytokenandauthorise,async (req,res)=>{
    try{
        await Cart.deleteOne({"id" : req.params.id});
        res.status(200).json("Product has been deleted");

    }catch(err){
        res.status(500).json(err);
    }
});

router.get("/find/:id",verifytokenandauthorise,async (req,res)=>{
    try{
        const cart = await Cart.findOne({id : req.params.id });
        res.status(200).json(cart);

    }catch(err){
        res.status(500).json(err);
    }
});

/*router.get("/",async (req,res)=>{
    try{
        const carts = await Cart.find();
        res.status(200).json(carts);
    }catch(err){
        res.status(500).json(err);
    }
});*/

module.exports = router;
