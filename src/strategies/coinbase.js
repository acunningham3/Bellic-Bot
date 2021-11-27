const passport = require('passport');
const coinbaseStrategy = require('passport-coinbase');
const User = require('../database/schemas/user');

//Start passport session with current user ID
passport.serializeUser((user, done) => {
    console.log('OK');
    done(null, user.coinbaseId);
});

//Once session is done, find user ID in database and deserialize it
passport.deserializeUser(async (coinbaseId, done) => {
    try{
        const user = await User.findOne({coinbaseId});
        return user ? done(null, user) : done(null, null);
    } catch (err) {
        console.log('Err was found!');
        console.log(err);
        done(err, null);
    }
});

passport.use(
    new coinbaseStrategy ({
        clientID: process.env.COINBASE_CLIENT_ID,
        clientSecret: process.env.COINBASE_CLIENT_SECRET,
        callbackURL: process.env.COINBASE_CALLBACK_URL,
        passReqToCallback: true,    //Used to pass req to the function
        scope: ['wallet:accounts:read', 
                'wallet:addresses:read', 
                'wallet:buys:create',
                'wallet:sells:create',
                ],
    }, async (req, accessToken, refreshToken, profile, done) => {                              
        //console.log(accessToken, id, displayName);
        const {id} = profile;
        console.log(req.query.state);
        
        //Try to find a new user from database using the id
        //Else create a new user in database from id and accesstoken
        try {
            const findUser = await User.findOneAndUpdate({coinbaseId: id}, {new: true});
            if (findUser) {
                console.log('User was found!');
                return done(null, findUser);
            } else {
                const newUser = await User.create( {
                discordId: req.query.state,
                displayName: profile.displayName,
                coinbaseId: profile.id,
                accessToken: accessToken,
                refreshToken: refreshToken,
            });
            return done(null, newUser);
            }
        } catch (err) {
            console.log(err);
            return done(err, null);
        }
    })
);