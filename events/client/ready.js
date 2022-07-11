const Logger = require('../../utils/Logger');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client){
        Logger.client("- Lancement du bot");

        // Instantané
        //const devGuild = await client.guilds.cache.get('772825001064923146');
        // devGuild.commands.set(client.commands.map(cmd => cmd));
        client.application.commands.set(client.commands.map(cmd => cmd));
    },
};