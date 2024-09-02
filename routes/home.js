const express = require('express');
const router = express.Router();    

const {home,forgotPasswordPage} = require('../controller/homeCtrl');


router.get('/home',home);  
router.get("/forgot-password-page",forgotPasswordPage);

  
module.exports = router;            