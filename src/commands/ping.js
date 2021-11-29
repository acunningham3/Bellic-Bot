//Simple ping command that returns Pong in the channel
module.exports = {
    name: 'Ping',
    prefix: '$ping',
    options: ' ',
    roles: 'Everyone',
    description: '$ping, test command to check if bot is working',
    //Code to execute
    execute(message) {
        message.reply('Pong!');
    }
}