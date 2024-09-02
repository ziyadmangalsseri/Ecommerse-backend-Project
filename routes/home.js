const express = require('express');
const router = express.Router();    

const {
    home,
    forgotPasswordPage,
    login
} = require('../controller/homeCtrl');


router.get('/home',home);  
router.get("/forgot-password-page",forgotPasswordPage);
router.get('/login',login)

  
module.exports = router;              