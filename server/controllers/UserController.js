const User = require('../models/User');
const argon2=require('argon2');
const jwt = require('jsonwebtoken');
class UserController{

    // [POST] api/auth/register
    async register(req,res){
        const {username,password} = req.body;
        // Simple Validation
        if(!username||!password)
            return res
                .status(400)
                .json({success:false,message:'Missing username and/or password with register'});        
        try{
            // Checking for existing user
            const user=await User.findOne({username})
            if(user)
                return res
                    .status(400)
                    .json({success:false,message:'Username already token'})
            // All good
            const hashedPassword = await argon2.hash(password);
            const newUser= new User({username,password:hashedPassword});
            await newUser.save();
            // Return token
            const accessToken=jwt.sign({userId:newUser._id},process.env.ACCESS_TOKEN_SECRET);
            return res.json({success:true,message:'User created successfully',accessToken});
        }catch(error){
            console.log(error);
            res.status(500)
                .json({success:false,message:'Internal server error'});
        }
    }

    // [POST] api/auth/login
    async login(req,res){
        const {username,password}=req.body;
        if(!username||!password)
            return res
                .status(400)
                .json({success:false,message:'Missing username and/or password with login'});
        try {
            // Check for existing user
            const user = await User.findOne({username});
            if(!user) 
                return res.status(400)
                            .json({success:false,message:'Incorrect username or password'});
            // Username found
            const passwordValid= await argon2.verify(user.password,password);
            if(!passwordValid)
                return res.status(400)
                            .json({success:false,message:'Incorrect username or password'});
            // Return token
            const accessToken=jwt.sign({userId:user._id},process.env.ACCESS_TOKEN_SECRET);
            return res.json({success:true,message:'User logged in successfully',accessToken});
        } catch (error) {
            console.log(error);
            res.status(500)
                .json({success:false,message:'Internal server error'});
        }
    }
    async checkUser(req,res){
        try {
            const user=await User.findById(req.userId).select('-password');
            if(!user)
                return res.status(400).json({success:false,message:'User not found'});
            res.json({success:true,user});
        } catch (error) {
            console.log(error);
            res.status(500)
                .json({success:false,message:'Internal server error'});
        }
    }
}

module.exports = new UserController();