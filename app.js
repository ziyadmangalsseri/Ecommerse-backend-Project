const express = require('express');
const bodyParser = require('body-parser');
const dbConnect = require('./config/dbConnect');
const session = require('express-session');


const app = express();
const  dotenv = require('dotenv').config();
const PORT = process.env.PORT || 4000;
const authRouter = require('./routes/authRouter');
const home = require('./routes/home');

 dbConnect();
 app.set('view engine','ejs');
 app.use(session({
   secret : 'my secret key',
   resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
 }))
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({extended:false}));  
 app.use(express.static('public/assets'));
 app.use(express.static('public'));
 
 app.use(home)
 app.use('/api/user',authRouter);
 app.listen(PORT,()=>{
    console.log(`server is running http://localhost:${PORT}/home running........`);
    
 })    