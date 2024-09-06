const User = require("../models/UserModels");
const jwt = require('jsonwebtoken');
const asyncHandler = require('async-handler');
const sendEmail = require('../utilities/sendemail');

const createUser = async (req,res)=>{
    console.log('creatUser process');
    
    const{ email } = req.body;
    console.log(req.body);
    
    const findUser = await User.findOne({email:email})
    if(!findUser){
        // create new user
        const newUser = await User.create(req.body)
        res.status(200).redirect('/home');
    }else{
        res.json({
            msg :"User Already Exists",
            success : false,
        })
    }  
}

const userlogin = async (req,res)=>{
    console.log('userlogin process started');
    const {email,password} = req.body;
    console.log(req.body); 
    try{

        const findUser = await User.findOne({email:email,password:password})
        if(findUser){
          console.log(findUser);
          
            req.session.email = findUser.email;
            res.status(200).json({success:true,message:"successfully"});
        console.log(req.session.email);
        
        }
        else{
            res.status(200).json({messege:"uesr invalid"});
        }
    }catch (error){ 
        console.error(error.message);
    res.status(500).json({ message: "Error logging in" });

    }

    
}

        // forgot password

const sendOtp = async (req,res)=>{

  try {  
    const {email} = req.body;
    console.log(req.body);
    
    const findUser = await User.findOne({email:email});
     if(!findUser){
        return res.status(404).json({success:false,message:"user not found"});
     }
    //  Generate webToken
    const resetToken = jwt.sign({id:findUser?._id},process.env.JWT_SECRET,{expiresIn:'30m'});
    // construct the reset url
    const resetUrl = `http://yourfrontend.come/passwordreset/${resetToken}`;
    const message = `You requested password reset, please click the link below to reset your  password  :\n\n${resetUrl}`;

    const otp = Math.floor(Math.random()*1000000);
    
    req.session.otp = otp;  

    // send email 
    await sendEmail({
        email,
        subject:"password reset request",
        message:`your password changing process your otp is :${otp}`
    });

    console.log(req.body);
    res.status(200).render('userSide/otpVerification');

  }catch(error){  
    console.error(error.message);
    res.status(500).json({success:false,messgae:"internal server error"});

  }

}  

const verifyOtp = (req,res)=>{
    try {
        const {otp :resiveOtp} = req.body;
        const {sendedOtp} = req.session;

        if(!sendedOtp){
            return res.status(400).json({success:false,message : 'OTO is not found or expired'});

        }
        else if(resiveOtp === sendedOtp.toString()){
            res.status(200).json({success:true , message:"successfully verified"})
        }
        else{
            res.status(200).json({success:false,message:"verification failed"});
        }
    }catch(error){
        console.error(error);
        
    }
}




module.exports = {
    createUser,
    userlogin,
    sendOtp,
    verifyOtp,
}; 