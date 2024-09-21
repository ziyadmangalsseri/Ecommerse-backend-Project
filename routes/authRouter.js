const express = require('express');
const router = express.Router();
const {
        createUser,
        userlogin,
        forgotPassword,
        otpVerification,
        resetPassword,
    
    } = require("../controller/user/userCtrl");



router.post("/userlogin",userlogin);
router.post("/signup",createUser);
router.post('/forgotPassword',forgotPassword);
router.post("/otpVerification",otpVerification);
router.post('/reset-password',resetPassword),

module.exports = router;   