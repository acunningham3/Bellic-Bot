require('dotenv').config();             //Init dotenv for sensitive IDs
require('./strategies/coinbase');       //Include coinbase auth strategy

//#region --------------------------REQUIRES----------------------------

const discord   = require('discord.js');        //Include discord libs
const fs        = require('fs');                //Include fs libs
const passport  = require('passport');          //Include passport libs
const mongoose  = require('mongoose');          //Include mongoose libs
const express   = require('express');           //Include express libs for webserving
const routes    = require('./routes');          //Define location of routes
const session   = require('express-session');   //Include session cookie libs
const Store     = require('connect-mongo');     //Libs to store session data

//#endregion -----------------------------------------------------------

//Connect to predefined database using MongoDB cluster service
//A discord bot hosting service would have their own DB to hook onto
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//#region -------------------EXPRESS WEBSERVER SETUP--------------------

const app = express();                  //Define instance of express called app
const PORT = process.env.PORT;          //Define PORT number from .env

//Define session cookie details
app.use(session( {
    secret: 'secret',
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    resave: false,
    saveUninitialized: false,
    store: Store.create({mongoUrl: process.env.MONGODB_URL})
}));
app.use(passport.initialize());         //Init passport for use
app.use(passport.session());            //Init passport session

app.use('/api', routes);                //Prefix routes with /api in URL

//#endregion -----------------------------------------------------------

const botSecret = process.env.BOT_TOKEN;    //Set secret token to mySecret
const prefix = '$';                         //Set bot command prefix

const client = new discord.Client ({     //Create bot instance and define intents and partials
    intents: [
        discord.Intents.FLAGS.GUILDS,
        discord.Intents.FLAGS.GUILD_MESSAGES,
        discord.Intents.FLAGS.DIRECT_MESSAGES,
        discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS],

    partials: [
        'MESSAGE', 
        'CHANNEL', 
        'REACTION'
]});

client.commands = new discord.Collection(); //Start new commands collection
const commandFiles = fs.readdirSync('./src/commands/').filter(file => file.endsWith('.js'))  //Look into the commands folder and select correct file type
for (const file of commandFiles) {
    const command = require(`../src/commands/${file}`);

    client.commands.set(command.name, command); //Set command to specified commamnd name
}

//#region --------------------------MESSAGE MONITOR---------------------------

client.once('ready', () => {    //If client successfully starts up then give message
    console.log('Bellic is online!');
});

client.on('messageCreate', message => {
    //If message is from the bot, or not text, or doesn't start with '$', then do nothing
    if (message.author.bot || message.channel.type != 'GUILD_TEXT' || !message.content.startsWith(prefix)) return;

    //Set args to any text spaced after commands
    const args = message.content.slice(prefix.length).split(/ +/);
    //Set command to command text without prefix and lowercase
    const command = args.shift().toLowerCase(); 

    //console.log(message.content);
    //console.log(args[0]);
    //console.log(command);
    //console.log(client.users.cache.get('267163979061657600'));

    //#region ------------------------BOT COMMANDS--------------------------

    switch(command) {
        case 'ping':    //$PING
            client.commands.get('ping').execute(message);
            break;

        case 'spam':    //$SPAM
            client.commands.get('messageSpam').execute(client, message, args);
            break;

        case 'coin':    //$COIN
            client.commands.get('coinSetup').execute(client, message, discord, args);
    }

    //#endregion -----------------------------------------------------------
});

//#endregion ---------------------------------------------------------------

client.login(botSecret);    //Login to bot using token
app.listen(PORT, () => console.log(`Running on PORT ${PORT}`)); //Listen for webserver requests on PORT