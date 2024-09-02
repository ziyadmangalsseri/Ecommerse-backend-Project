
const home =  (req,res)=>{
        res.render("home");
    }

const forgotPasswordPage = (req,res)=>{
    res.render('forgot-password-page');
}




    module.exports = {home,forgotPasswordPage};