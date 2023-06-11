const jwt = require("jsonwebtoken");

const verifytoken = (req,res,next)=>{
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token,process.env.JWT_SEC,(err,user)=>{
            if(err) res.status(401).json("Token not right");
            req.user = user;
            next();
        })
    }else{
        return res.status(401).json("You are not authenticated");
    }
}

const verifytokenandauthorise = (req,res,next)=>{
    verifytoken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            res.status(401).json("You are not allowed");
        }
    });
}

const verifytokenandadmin = (req,res,next)=>{
    verifytoken(req,res,()=>{
        if(req.user.isAdmin){
            next();
        }else{
            res.status(401).json("You are not allowed");
        }
    });
}

module.exports = {verifytoken,verifytokenandauthorise,verifytokenandadmin};