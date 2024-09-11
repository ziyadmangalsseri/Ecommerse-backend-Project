
const home =  (req,res)=>{
    res.render("userSide/home");
}
const forgotPasswordPage = (req,res)=>{
    res.render('userSide/forgot-password-page');
}
const login = (req,res)=>{
    res.render('userSide/sign-in');
}
const otpverification = (req,res)=>{
    res.render("userSide/otpVerification");
}
const resetPassword = (req,res) => {
    res.render('userSide/reset-password');
}



    module.exports = {
        home,
        forgotPasswordPage,
        login,
        otpverification,
        resetPassword,
    
    };  