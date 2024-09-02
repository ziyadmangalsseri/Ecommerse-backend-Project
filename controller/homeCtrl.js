
const home =  (req,res)=>{
    res.render("userSide/home");
}
const forgotPasswordPage = (req,res)=>{
    res.render('userSide/forgot-password-page');
}
const login = (req,res)=>{
    res.render('userSide/sign-in')
}



    module.exports = {
        home,
        forgotPasswordPage,
        login
    
    };  