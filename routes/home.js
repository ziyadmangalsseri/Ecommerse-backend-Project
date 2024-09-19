const express = require('express');
const router = express.Router();    

const {
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
    myAccount,
} = require('../controller/homeCtrl');


router.get('/home',home);  
router.get('/category',category);
router.get('/detail',detail);
router.get('/shopping-cart',shoppingCart);
router.get('/checkout',checkout);
router.get('/blog',blog);
router.get('/blog-details',blogDetails);
router.get('/contact',contact);
router.get('/my-wishlist',myWishlist);
router.get('/terms-conditions',termsConditions);
router.get('/track-orders',trakOrders);
router.get('/faq',faq);
router.get('/404',error);
router.get('/my-account',myAccount)



router.get('/adminPage',adminPage);


router.get("/forgot-password-page",forgotPasswordPage);
router.get('/login',login)
router.get('/otpverification',otpverification);
router.get('/reset-password',resetPassword);


  
module.exports = router;              