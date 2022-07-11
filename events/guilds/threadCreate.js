const thread = require("../../commands/thread/thread");

module.exports = {
    name: 'threadCreate',
    once: false,
    async execute(client, thread){
        if (thread.isText()) thread.join();
        const logChannel = client.channels.cache.get('990690595817279549');
        logChannel.send(`Nom du thread: ${thread.name}`);
    },
};