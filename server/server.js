const express = require('express');
const app = express();
const session = require('express-session');
const connDB = require('./config/db');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const cors = require('cors');
const Amadeus = require('amadeus');

require('dotenv').config();

// routes
const rootRouter = require('./routes/root');
const authRouter = require('./routes/auth');

// db connection
connDB();

// amadeus access token c
const amadeus = new Amadeus({
    clientId: process.env.AF_CLIENT_ID,
    clientSecret: process.env.AF_CLIENT_SECRET
})

// console.log(process.env.AF_CLIENT_ID)

const PORT = process.env.PORT || 3001;

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

//  session 
const sessionStore = MongoStore.create({
    mongoUrl: process.env.DATABASE_LOGIN,
    collectionName: 'sessions'
})

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    },
}))

// passport config
require('./strategies/localstrategy.js');
app.use(passport.initialize());
app.use(passport.session());;

// Routes
app.use('/', rootRouter);
app.use('/auth', authRouter);

// app listening
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`)
});