const express = require('express');
const router = express.Router();    

const {
    home,
    forgotPasswordPage,
    login,
    otpverification,
    resetPassword,
    adminPage
} = require('../controller/homeCtrl');


router.get('/home',home);  
router.get("/forgot-password-page",forgotPasswordPage);
router.get('/login',login)
router.get('/otpverification',otpverification);
router.get('/reset-password',resetPassword);
router.get('/adminPage',adminPage);

  
module.exports = router;              