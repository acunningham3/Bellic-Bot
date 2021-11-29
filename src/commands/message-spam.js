//if the message sent in channel is the same as trigger
//then send reply to specfic user ID
module.exports = {
  name: 'Message Spam',
  prefix: '$help',
  options: '[userID] [message]',
  roles: 'Devs, General',
  description: '$spam [userID] [message], spam one-word message ten times to specified userID',
  //Code to execute
  execute(client, message, args) {
    if(args.length != 2) {
      message.channel.send('Incorrect arguments! Refer to $help...');
      return;
    }
    else {
      //Spam loop
      for (let i = 1; i <= 10; i++) {
        //Try to fetch user using ID from args
        client.users.fetch(args[0]).then(dm => {
          dm.send(args[1]).catch(() => {
            return message.reply("User cannot be messaged...");  //Try to dm, if can't send message
          })
        }).catch(() => {
          return message.reply("User not found..."); //If can't fetch, send message
        })
      }
    }
  }
}