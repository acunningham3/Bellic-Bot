/*
    Defines extensions for each router in URL
    EXAMPLE: localhost:3001/api/auth
*/

const router = require('express').Router(); //Init router from express
const auth = require('./auth');             //Define auth.js
const coinbase = require('./coinbase');       //Init coinbase libs

router.use('/auth', auth);  //Define '/auth' in url for auth.js requests
router.use('/coinbase', coinbase);  //Define '/coinbase' in url for coinbase.js requests

module.exports = router;