const discord = require('discord.js');  //Include discord libs
const fs = require('fs');               //Include fs libs
require('dotenv').config();             //Init dotenv for TOKEN distribution

const botSecret = process.env.BOT_TOKEN;    //Set secret token to mySecret
const prefix = '$';                         //Set bot command prefix

const client = new discord.Client ({     //Create bot instance and define intents
    intents: [
        discord.Intents.FLAGS.GUILDS,
        discord.Intents.FLAGS.GUILD_MESSAGES,
        discord.Intents.FLAGS.DIRECT_MESSAGES
]});

client.commands = new discord.Collection(); //Start new commands collection
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))  //Look into the commands folder and select correct file type
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command); //Set command to specified commamnd name
}

client.once('ready', () => {    //If client successfully starts up then give message
    console.log('Bellic is online!');
});

//Monitor messages to bot
client.on('messageCreate', message => {
    //If message is from the bot, or not text, or doesn't start with '$', then do nothing
    if (message.author.bot || message.channel.type != 'GUILD_TEXT' || !message.content.startsWith(prefix)) return;

    //Set args to any text spaced after commands
    const args = message.content.slice(prefix.length).split(/ +/);
    //Set command to command text without prefix
    const command = args.shift().toLowerCase(); 

    //console.log(message.content);
    //console.log(args[0]);
    //console.log(command);
    //console.log(client.users.cache.get('267163979061657600'));

    //Commands
    if (command === 'ping') {
        client.commands.get('ping').execute(message);
    }
    else if (command === 'spam') {
        client.commands.get('messageSpam').execute(client, message, args);
    }
});

client.login(botSecret);    //Login to bot using token