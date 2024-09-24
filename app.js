const express = require('express');
const bodyParser = require('body-parser');
const dbConnect = require('./config/dbConnect');
const session = require('express-session');
const path = require("path");
const dotenv = require('dotenv').config(); // .env file should be loaded before using process.env

const app = express();
const PORT = process.env.PORT || 4000;

// Import routers
const authRouter = require('./routes/authRouter');
const home = require('./routes/home');
const adminRouter = require('./routes/adminRouter');

// Connect to the database
dbConnect();

// Set the view engine
app.set('view engine', 'ejs');

// Session configuration
app.use(session({
    secret: 'my secret key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Use true in production with HTTPS
}));

// Body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Static files middleware
// app.use(express.static('public'));
// app.use(express.static('public/assets'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,"public/assets")));


// Route handlers
app.use('/', home); // Use base path for home routes
app.use('/api/user', authRouter);
app.use('/api/admin', adminRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/home`);
});
