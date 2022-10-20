const express = require('express');
const router = express.Router();
const passport = require('passport-local');
const passportUtil = require('../utils/password');
const User = require('../models/User');
const { requireLogin } = require('../middlewares/requireLogin');
const Amadeus = require('amadeus');
const { response } = require('express');

const amadeus = new Amadeus({
    clientId: process.env.AF_CLIENT_ID,
    clientSecret: process.env.AF_CLIENT_SECRET
})

router.get('/', (req, res) => {
    // res.send('Hello World!')
    console.log(req.body);
    console.log(req.session, 'this is a session');
    console.log(req.user)

    res.send('home express js'); 
});

router.post('/search', async (req, res) => {
    const { classType, adults, from, to, datepicker } = req.body.data;
    try {
        let flightResult = await amadeus.shopping.flightOffersSearch.get({
            originLocationCode: from,
            destinationLocationCode: to,
            departureDate: datepicker,
            adults: adults,
            nonStop: true,
            max: '3'
            });

        console.log(flightResult);
        res.send(flightResult.data)
    } catch (error) {
        // TOO MANY REQUESTS NETWORK RATE LIMIT EXCEEDED
        console.log(error.data)
        res.send(error.response);
    }
});

router.post('/flight-airline', async(req, res) => {
    const airlineCode = req.body.data;
    console.log(airlineCode);
    try {
        let response = await amadeus.referenceData.airlines.get({
            airlineCodes : airlineCode[0]
          })
        //   console.log(response.data);
        //   console.log(response.data[0].commonName);
          res.send(response.data[0].commonName);
    } catch (error) {
        console.log(error)
        // add error response
    }
});

router.post('/airports', async(req, res) => {
    const keyword = req.body.data;
    console.log(keyword);

    try {
        const response = await amadeus.referenceData.locations.get({
            keyword : keyword,
            subType : Amadeus.location.any
          });
        //   console.log(response.data[0].name);
          res.send(response.data);
    } catch (error) {
        console.log(error)
        //  add error response
    }
});

// middleware requireLogin and move path route to auth file
router.get('/dash', requireLogin, (req, res, next) => {
    // if(req.isAuthenticated()) {
    //     res.redirect('/');
    // } else {
    //     res.send(`<h1>IS NOT AUTHENTICATED</h1>`)
    // }
    console.log(req.session)
    res.send('DASHBOARD');
});

module.exports = router;