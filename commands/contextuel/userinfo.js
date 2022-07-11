const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'userinfo',
    category: 'contextuel',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: false,
    usage: 'Utiliser le menu contextuel de Discord',
    examples: ['Utiliser le menu contextuel de Discord'],
    type: 'USER',
    async runInteraction(client, interaction) {
        const member = await interaction.guild.members.fetch(interaction.targetId);

        const userinfoEmbed = new MessageEmbed()
            .setAuthor({ name: `${member.user.tag} (${member.id})`, iconURL: member.user.bot ? 'https://www.internetandtechnologylaw.com/files/2019/06/iStock-872962368-chat-bots.jpg' : 'https://cdn3.vectorstock.com/i/1000x1000/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg' })
            .setColor('#8e48f7')
            .setThumbnail(member.user.displayAvatarURL())
            .addFields(
                { name: 'Nom', value: `${member.displayName}`, inline: true },
                { name: 'Modérateur', value: `${member.kickable ? '🔴' : '🟢'}`, inline: true },
                { name: 'Bot', value: `${member.user.bot ? '🟢' : '🔴'}`, inline: true },
                { name: 'Rôles', value: `${member.roles.cache.map(role => role).join(', ').replace(', @everyone', ' ')}` },
                { name: 'A crée son compte le', value: `<t:${parseInt(member.user.createdTimestamp / 1000)}:f> (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)` },
                { name: 'A rejoint le serveur le', value: `<t:${parseInt(member.joinedTimestamp / 1000)}:f> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)` },
            )

        interaction.reply({ embeds: [userinfoEmbed], ephemeral: true });
    }
};