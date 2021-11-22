const router = require('express').Router(); //Init router from express
const passport = require('passport');

//Send OK (200) to user when an auth link is requested
router.get('/coinbase', passport.authenticate('coinbase'));
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