const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/User');
const { verifyPass } = require('../utils/password');

// Local Strategy
// LOGIN 
passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({username: username}, (err, user) => {
            if(!user) { return done(null, false) };
            const isValid = verifyPass(password, user.hash, user.salt);
            if(isValid) {
                console.log(user);
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }
));

// Serialize User inside session 
passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
// Deserialize User session
  passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
      done(null, user);
    });
  });