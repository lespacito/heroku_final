const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'poll',
    category: 'utils',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: false,
    usage: 'poll [suggestion]',
    examples: ['poll', 'poll Faire des jeux'],
    description: 'Poster votre propre suggestion!',
    async run(client, message, args) {
        if (!args[0]) return message.reply('Merci d\'entrer du contenu pour votre suggestion!');

        const EmbedPoll = new MessageEmbed()
            .setTitle('Suggestion !')
            .setColor('RANDOM')
            .setDescription(args.slice(0).join(' '))
            .setTimestamp()
            .setFooter({ text: `Nouvelle suggestion générée par ${message.author.tag}!` });
        const poll = await client.channels.cache.get(`986643669991952444`).send({ embeds: [EmbedPoll] })

        await poll.react('✅');
        await poll.react('❌');
    },
    options: [
        {
            name: 'title',
            description: 'Tapper le titre de votre suggestion',
            type: 'STRING',
            required: true,
        },
        {
            name: 'content',
            description: 'Tapper la descrpition de votre suggestion',
            type: 'STRING',
            required: true,
        },
    ],
    async runInteraction(client, interaction) {
        const pollTitle = interaction.options.getString('title');
        const pollContent = interaction.options.getString('content');
      
        const EmbedPoll = new MessageEmbed()
            .setTitle(pollTitle)
            .setColor('RANDOM')
            .setDescription(pollContent)
            .setTimestamp()
            .setFooter({ text: `Nouvelle suggestion générée par ${interaction.user.tag}!` });

            const poll = await client.channels.cache.get(`986643669991952444`).send({ embeds: [EmbedPoll] });
            await interaction.deferReply({ephemeral: true});
        poll.react('✅');
        poll.react('❌');        
    },
};
