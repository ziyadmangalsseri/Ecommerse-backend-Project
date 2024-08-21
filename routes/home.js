const express = require('express');
const router = express.Router();
// const home = require('/controller/homeCtrl');
  
router.get('/',(req,res)=>{
    res.render("home");
});  

module.exports = router; 