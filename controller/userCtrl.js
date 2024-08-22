const User = require("../models/UserModels");

const createUser = async (req,res)=>{
    console.log('hello');
    
    const{ email}= req.body;
    console.log(req.body);
    
    const findUser = await User.findOne({email:email})
    if(!findUser){
        // create new user
        const newUser = await User.create(req.body)
        res.status(200).render('home');
    }else{
        res.json({
            msg :"User Already Exists",
            success : false,
        })
    }  
}
module.exports = {createUser} 