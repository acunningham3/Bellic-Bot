const router = require('express').Router(); //Init router from express

//Send OK (200) to user when '/' is requested
router.get('/', (req, res) => {
    res.sendStatus(200);
});

module.exports = router;