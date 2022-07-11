const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    category: 'utils',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: false,
    usage: 'ping',
    examples: ['ping'],
    description: 'La commande ping envoie la latence du bot et de l\'API',
    async run(client, message, args) {
        const tryPing = await message.channel.send("On essaye de ping... un instant!"); 

        const pingEmbed = new MessageEmbed()
            .setTitle('🏓 Pong!')
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(
                { name: "Latence API", value: `\`\`\`${client.ws.ping}ms\`\`\``, inline: true },
                { name: "Latence BOT", value: `\`\`\`${tryPing.createdTimestamp - message.createdTimestamp}ms\`\`\``, inline: true }
            )
            .setTimestamp()
            .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL() });

        tryPing.edit({ content: null, embeds: [pingEmbed] });
    },
    async runInteraction(client, interaction) {
        const tryPing = await interaction.reply({ content: "On essaye de ping... un instant!", fetchReply: true }); 

        const pingEmbed = new MessageEmbed()
            .setTitle('🏓 Pong!')
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(
                { name: "Latence API", value: `\`\`\`${client.ws.ping}ms\`\`\``, inline: true },
                { name: "Latence BOT", value: `\`\`\`${tryPing.createdTimestamp - interaction.createdTimestamp}ms\`\`\``, inline: true }
            )
            .setTimestamp()
            .setFooter({ text: interaction.user.username, iconURL: interaction.user.displayAvatarURL() });

        interaction.editReply({ content: null, embeds: [pingEmbed] });
    }
};
