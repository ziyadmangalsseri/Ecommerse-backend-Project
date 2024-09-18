
const home =  (req,res)=>{
    res.render("home/home");
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
const adminPage = (req,res)=>{
    res.render('adminSide/admin');
}
const category = (req,res)=>{
    res.render('home/category');
}
const detail = (req,res)=>{
    res.render('home/detail');
}
const shoppingCart = (req,res)=>{
    res.render('home/shopping-cart');
}
const checkout = (req,res)=>{
    res.render('home/checkout');
}
const blog = (req,res)=>{
    res.render('home/blog');
}
const blogDetails = (req,res)=>{
    res.render('home/blog-details');
}
const contact = (req,res)=>{
    res.render('home/contact');
}
const myWishlist = (req,res)=>{
    res.render('home/my-wishlist');
}
const termsConditions = (req,res)=>{
    res.render('home/terms-conditions');
}
const trakOrders = (req,res)=>{
    res.render('home/track-orders');
}
const faq = (req,res)=>{
    res.render('home/faq');
}
const error = (req,res)=>{
    res.render('home/404');
}
















    module.exports = {
        home,
        forgotPasswordPage,
        login,
        otpverification,
        resetPassword,
        adminPage,
        category,
        detail,
        shoppingCart,
        checkout,
        blog,
        blogDetails,
        contact,
        myWishlist,
        termsConditions,
        trakOrders,
        faq,
        error,

    };  