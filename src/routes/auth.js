const router = require('express').Router(); //Init router from express
const passport = require('passport');

//Send back to Discord when an auth link is requested
router.get('/coinbase', passport.authenticate('coinbase'));
router.get('/coinbase/redirect', passport.authenticate('coinbase'), (req, res) => {
    res.redirect('https://discord.gg/MyzyC4HJhy');
});

router.get('/', (req, res) => {
    if (req.user) {
        res.send(req.user);
    } else {
        res.sendStatus(401).send('msg: unauthorized...');
    }
});

module.exports = router;