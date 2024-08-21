const User = require("../modules/UserModels");

const createUser = async (req,res)=>{
    const email = req.body.email;
    const findUser = await User.find({email:email});
    if(!findUser){
        // create new user
        const newUser = await User.create(req.body)
        res.json(newUser);
    }else{
        res.json({
            msg :"User Already Exists",
            success : false,
        })
    }  
}
module.exports = {createUser} 