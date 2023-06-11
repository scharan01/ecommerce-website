const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

router.post("/register",async (req,res)=>{

    const user = await User.findOne({email:req.body.email});
    if(user) return res.status(201).json("user already exists!");

    const newUser = new User({
        email :  req.body.email,
        password : CryptoJS.AES.encrypt(req.body.password,process.env.SEC_PASS).toString()
    });

    try{
        const saveUser = await newUser.save();
        res.status(200).json(saveUser);
    }catch(err){
        res.status(500).json(err);
    }

});

router.post("/login",async (req,res)=>{

    try{
        const user = await User.findOne({email:req.body.email});
        if(!user) return res.status(401).json("no account");

        const haspass = CryptoJS.AES.decrypt(user.password,process.env.SEC_PASS);

        const orpassword = haspass.toString(CryptoJS.enc.Utf8);

        if(orpassword !== req.body.password) return res.status(401).json("wrong password");

        const { password,...others} = user._doc; 
 
        
        const accesstoken = jwt.sign({
            id: user._id,
            isAdmin : user.isAdmin
        },process.env.JWT_SEC,{expiresIn:"1d"})

        res.status(200).json({...others,accesstoken});
        
    }catch(err){
        res.status(500).json(err); 
    }
    
});

module.exports = router;