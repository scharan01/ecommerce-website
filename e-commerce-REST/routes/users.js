const router = require("express").Router();
const User = require("../models/User");
const {verifytokenandauthorise,verifytokenandadmin} = require("./verifytoken")
const CryptoJS = require("crypto-js");

router.put("/:id",verifytokenandauthorise,async (req,res)=>{
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(req.body.password,process.env.SEC_PASS).toString();
    }

    try{
        const updateduser = await User.findByIdAndUpdate(req.params.id,{
            $set : req.body
        },{new:true})

        res.status(200).json(updateduser);
    }catch(err){
        res.status(500).json(err);
    }
});

router.delete("/:id",verifytokenandauthorise,async (req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted");

    }catch(err){
        res.status(500).json(err);
    }
});

router.get("/find/:id",verifytokenandadmin,async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user);

    }catch(err){
        res.status(500).json(err);
    }
});

router.get("/",verifytokenandadmin,async (req,res)=>{

    const query = req.query.new;
    try{
        const user = query ? await User.find().sort({_id:-1}).limit(5) : await User.find();
        res.status(200).json(user);

    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;