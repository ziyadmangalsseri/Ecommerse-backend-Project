const User = require("../models/UserModels");

const createUser = async (req,res)=>{
    console.log('creatUser process');
    
    const{ email } = req.body;
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

const userlogin = async (req,res)=>{
    console.log('userlogin process');
    const {email,password} = req.body;
    console.log(req.body);

    const findUser = await User.findOne({email:email,password:password})
    if(findUser){
        req.session.email = findUser.email;
        res.send(200).redirect()
        
    }
    
}



module.exports = {createUser} 