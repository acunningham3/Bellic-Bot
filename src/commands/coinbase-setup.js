//Setup coinbase reaction message embed
module.exports = {
    name: 'coinSetup',
    description: 'setup coinbase verification in specified channel',
    //Code to execute
    async execute(client, message, discord, args) {

    const channel = '913669756828147723';   //Grab coinbase-auth channel
    const coinReact = '💰';                 //Reaction

    const embed = new discord.MessageEmbed()
        .setTitle("Authorize the Bellic bot to access your Coinbase account!")
        .setColor(0x00AE86)
        .setDescription("This allows the Bellic bot to read your account, buy and sell. Refer to the [github](https://github.com/acunningham3/Bellic-Bot) for more specifics.")
        .addField('React with 💰 to initiate authorization', 'You\'ll receive a message...', true);

    if(args.length != 0) {
        message.channel.send('Incorrect arguments! Refer to $help...');
        return;
    } else {
        await message.channel.messages.fetch({limit: 100}).then(messages => {
            message.channel.bulkDelete(messages);
        });
        await message.channel.send({embeds:[embed]}).then(async embedMessage => {
            await embedMessage.react('💰');
        });
    }

    //Reaction monitor
    client.on('messageReactionAdd', async (reaction, user) => {
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;
        if (!reaction.message.guild) return;

        if (reaction.message.channel.id == channel) {
            if (reaction.emoji.name === coinReact) {

                const customLink = 'http://127.0.0.1:3001/api/auth/coinbase?id=' + user.id;
                const githubLink = 'https://github.com/acunningham3/Bellic-Bot/blob/a39a53a6e77d1b59b2a60f8258c4148d0d329fe5/src/strategies/coinbase.js#L29';

                const reactEmbed = new discord.MessageEmbed()
                    .setAuthor('Bellic Bot')
                    .setTitle("Your customized Coinbase authentication link.")
                    .setImage('https://static.wikia.nocookie.net/logopedia/images/9/9a/Coinbase_App.jpg/revision/latest?cb=20210506203422')
                    .setColor(0x00AE86)
                    .setDescription("Bellic bot will receive the ability to: read your account, read your addresses, buy coins, and sell coins.")
                    .addField('Here is your custom link (contains your DiscordID)', `[CoinbaseAuth](${customLink})`, true)
                    .addField('Check here to see specific permissions.', `[Github](${githubLink})`, true);

                await reaction.message.guild.members.cache.get(user.id).send({embeds: [reactEmbed]});
            }
        } else {
            return;
        }
    });
    }
}