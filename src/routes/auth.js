const router = require('express').Router(); //Init router from express
const passport = require('passport');

//Send OK (200) to user when '/' is requested
router.get('/coinbase', passport.authenticate('coinbase'));
router.get('/coinbase/redirect', passport.authenticate('coinbase'), (req, res) => {
    res.sendStatus(200);
});

module.exports = router;