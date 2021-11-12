//if the message sent in channel is the same as trigger
//then send reply to specfic user ID
module.exports = {
  name: 'messageSpam',
  description: 'spam desired message to userID',
  //Code to execute
  execute(client, message, args) {
    if(args.length != 2) {
      message.channel.send('Incorrect arguments! Refer to $help...');
      return;
    }
    else {
      //Try to fetch user using ID from args
      client.users.fetch(args[0]).then(dm => {
        dm.send(args[1]).catch(() => {
          return message.channel.send("User cannot be messaged...");  //Try to dm, if can't send message
        })   
      }).catch(() => {
        return message.channel.send("User not found..."); //If can't fetch, send message
      })
    }

      //Spam loop
    for (let i = 1; i <= 5; i++) {
    }
  }
}