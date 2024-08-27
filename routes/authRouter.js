const express = require('express');
const {createUser} = require("../controller/userCtrl");
const {userlogin} = require('../controller/userCtrl')
const {forgotPassword} = require('../controller/userCtrl');
const router = express.Router();


router.post("/userlogin",userlogin);
router.post("/signup",createUser);
router.post("/forgot-password",forgotPassword);
 

module.exports = router;