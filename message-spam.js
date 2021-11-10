module.exports = (client, triggerText, replyText) => {
    client.on('message', message => {
        if (message.content.toLowerCase() === triggerText.toLowerCase()) {
            for (let i = 1; i <= 10; i++) {
                client.users.fetch('250815060765573130').then(user => {
                    user.send(replyText)
                })
            }
        }
    })
}