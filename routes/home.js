const express = require('express');
<<<<<<< HEAD
const router = express.Router();    


router.get('/',(req,res)=>{
    res.render('home');
}) 

module.exports = router;
=======
const router = express.Router();
// const home = require('/controller/homeCtrl');
  
router.get('/',(req,res)=>{
    res.render("home");
});  

module.exports = router; 
>>>>>>> 72a186dcea72fc8f790c3a8d12b1c5ae8b6f784e
