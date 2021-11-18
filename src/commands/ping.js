//Simple ping command that returns Pong in the channel
module.exports = {
    name: 'ping',
    description: 'simple ping command',
    //Code to execute
    execute(message) {
        message.channel.send('Pong!');
    }
}