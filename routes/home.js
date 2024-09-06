const express = require('express');
const router = express.Router();    

const {
    home,
    forgotPasswordPage,
    login,
    otpverification,
} = require('../controller/homeCtrl');


router.get('/home',home);  
router.get("/forgot-password-page",forgotPasswordPage);
router.get('/login',login)
router.get('/otpverification',otpverification)

  
module.exports = router;              