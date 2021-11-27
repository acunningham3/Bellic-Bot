const router = require('express').Router(); //Init router from express
const passport = require('passport');
const User = require('../database/schemas/user');

//Send back to Discord when an auth link is requested
//Uses params to communicate discord name eq '/api/auth/coinbase?id=267163979061657600'
router.get('/coinbase', (req, res) => {
    console.log(JSON.stringify(req.query.id));
    passport.authenticate('coinbase', {state: JSON.stringify(req.query.id)})(req, res)
});
router.get('/coinbase/redirect', passport.authenticate('coinbase'), (req, res) => {
    res.sendStatus(200);
});

router.get('/', (req, res) => {
    if (req.user) {
        res.send(req.user);
    } else {
        res.sendStatus(401).send('msg: unauthorized...');
    }
});

module.exports = router;