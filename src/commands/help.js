const fs = require('fs');

module.exports = {
    name: 'Help',
    prefix: '$help',
    options: '[command]',
    roles: 'Everyone',
    description: '$help [command], command to see description of other commands, or a specific command',
    //Code to execute
    async execute(client, discord, message, args) {

        message.author.send('**Bellic Bot prefix is: ** `$`');

        const commandFiles = fs.readdirSync('./src/commands/').filter(file => file.endsWith('.js'));

        //If no argument then send all commands, each as an embeded message
        if(args.length == 0) {
            for (const file of commandFiles) {
                const command = require(`../commands/${file}`);

                const embed = new discord.MessageEmbed()
                    .setTitle(command.name + ' (' + command.roles + ')')
                    .setDescription(command.description);

                message.author.send({embeds: [embed]});
            }
        } else if(args.length == 1){    //Else if argument then find command and display that
            let found = false;

            for (const file of commandFiles) {
                const command = require(`../commands/${file}`);
                
                if(command.prefix.substring(1) === args[0].toLowerCase()) {
                    found = true;

                    const embed = new discord.MessageEmbed()
                        .setTitle(command.name)
                        .setDescription(command.description)
                        .addField('Command name:', command.prefix, true)
                        .addField('Command options:', command.options, true)
                        .addField('Roles that can use this command:', command.roles, true);

                    message.author.send({embeds: [embed]});
                    break;  //Get out of forloop
                }
            }
            if(!found)
                return message.reply('Command not found!');    //If forloop doesn't break then command can't be found

        } else if(args.length > 1) {
            return message.reply('Too many arguments!');
        }
    }
}