const passport = require('passport');
const coinbaseStrategy = require('passport-coinbase');

passport.use(
    new coinbaseStrategy ({
        clientID: process.env.COINBASE_CLIENT_ID,
        clientSecret: process.env.COINBASE_CLIENT_SECRET,
        callbackURL: process.env.COINBASE_CALLBACK_URL,
        scope: ['wallet:accounts:read', 
                'wallet:addresses:read', 
                'wallet:buys:create',
                'wallet:sells:create',
                ],
    }, async (accessToken, refreshToken, profile, done) => {
        console.log('Hello world!');
    })
);