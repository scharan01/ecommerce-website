const router = require("express").Router();
const Order = require("../models/Order");
const {verifytokenandauthorise,verifytokenandadmin,verifytoken} = require("./verifytoken")


router.post("/",async (req,res)=>{
    const newOrder = new Order(req.body);

    try{
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    }catch(err){
        res.status(500).json(err);
    }
});

router.put("/:id",async (req,res)=>{
    try{
        const updateOrder = await Order.findByIdAndUpdate(req.params.id,{
            $set : req.body
        },{new:true})

        res.status(200).json(updateOrder);
    }catch(err){
        res.status(500).json(err);
    }
});

router.delete("/:id",verifytokenandauthorise,async (req,res)=>{
    try{
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted");

    }catch(err){
        res.status(500).json(err);
    }
});

router.get("/find/:id",verifytokenandauthorise,async (req,res)=>{
    try{
        const orders = await Order.find({userid : req.params.id });
        res.status(200).json(orders);

    }catch(err){
        res.status(500).json(err);
    }
});

router.get("/",verifytokenandadmin,async (req,res)=>{
    try{
        const orders = await Order.find();
        res.status(200).json(orders);
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;