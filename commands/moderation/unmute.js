module.exports = {
    name: 'unmute',
    category: 'moderation',
    permissions: ['MODERATE_MEMBERS'],
    ownerOnly: false,
    usage: 'unmute [member]',
    examples: ['unmute @lespacito'],
    description: 'Démute un utilisateur',
    async run(client, message, args) {
        if (!args[0]) return message.reply('Spécifier un membre à démute');

        const target = message.mentions.members.find(m => m.id);

        if (!target.isCommunicationDisabled()) return message.reply('Ce membre ne peut pas être démute par le bot!');

        target.timeout(null);
        message.channel.send(`Le membre ${target} a été démute!`);
    },
        options: [
        {
            name: 'target',
            description: 'L\'utilisateur a démute',
            type: 'USER',
            required: true,
        },
    ],
    async runInteraction(client, interaction) {
        const target = interaction.options.getMember('target');
        
        if (!target.isCommunicationDisabled()) return interaction.reply('Ce membre ne peut pas être démute par le bot!');

        target.timeout(null);
        interaction.reply(`Le membre ${target} a été démute!`);
    }
};
