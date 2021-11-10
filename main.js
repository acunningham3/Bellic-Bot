const discord = require('discord.js');  //Include discord libs
require('dotenv').config();             //Init dotenv for TOKEN distribution

const client = new discord.Client({     //Create bot instance and define intents
    intents: [
        discord.Intents.FLAGS.GUILDS,
        discord.Intents.FLAGS.GUILD_MESSAGES
]});

const messageSpam = require('./message-spam')

client.once('ready', () => {    //If client successfully starts up then give message
    console.log('Bellic is online!');
});

client.on('messageCreate', (message) => {   //Simple command to send pong message for ping
    messageSpam(client, 'beech', 'Yous a beech')
})

client.login(process.env.TOKEN);    //Login to bot