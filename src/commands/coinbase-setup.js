//Setup coinbase reaction message embed
module.exports = {
    name: 'coinSetup',
    description: 'setup coinbase verification in specified channel',
    //Code to execute
    async execute(message, discord, args) {

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
    }
}