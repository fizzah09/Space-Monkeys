const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const router = express.Router();
const start = require('./routes/start');
const flash = require('connect-flash');
const session = require('express-session');

const path = require('path');

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.set('view engine', 'ejs');
app.use(expressSession({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
}));

//Configuration of env's
require('dotenv').config();

//routes will start from here
router.get("/", start);

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success') || [];
    res.locals.error_msg = req.flash('error') || [];
    next();
});

express.listen(3000);