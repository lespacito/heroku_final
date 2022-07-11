const { Guild } = require('../../models/index');

module.exports = {
    name: 'update',
    category: 'admin',
    permissions: ['ADMINISTRATOR'],
    ownerOnly: true,
    usage: 'update',
    examples: ['update'],
    description: 'Mettre a jour la BDD',
    async run(client, message, args) {
        await Guild.updateMany({}, { "$set": { "welcomeChannel": "986640251088949288" }, upsert: true });
        message.reply('Nouvelles données ajoutées!');
    },
    
    async runInteraction(client, interaction) {
        await Guild.updateMany({}, { "$set": { "welcomeChannel": "986640251088949288" }, upsert: true });
        interaction.reply('Nouvelles données ajoutées!');
    }
};
