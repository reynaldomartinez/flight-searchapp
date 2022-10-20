const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const { generatePass } = require('../utils/password');

// 
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

router.post('/register', async (req, res, next) => {
    // we only need salt.... if password is correct + salt THEN hash will end up being correct
    const { email, username, password } = req.body;
    const {salt, hash} = generatePass(password);
    
    try {
        const emailExists = await User.findOne({ email });
        const usernameExists = await User.findOne({ username });

        if(emailExists || usernameExists) {
            return res.status(400).json({message: 'User or Email already exist'});
        }

        const newUser = new User({
            email,
            username,
            password,
            date: new Date(),
            salt,
            hash
        });

        const saveUser = await newUser.save();
        res.json(saveUser);
    } catch (error) {
        res.json({err: error});
        return;
    }

});

router.get('/logout', (req, res, next) => {
    req.session.destroy(err => {
        res.redirect('/')
    })
});


module.exports = router;