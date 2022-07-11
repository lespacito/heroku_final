const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'guildMemberAdd',
    once: false,
    async execute(client, member){
        const fetchGuild = await client.getGuild(member.guild);
        
        const log = new MessageEmbed()
            .setAuthor({ name: `${member.user.tag} (${member.id})`, iconURL: member.user.banURL() })
            .setColor('#21ff81')
            .setDescription(`㊏ Nom d'utlisateur: ${member}
            ㊏ Crée le: <t:${parseInt(member.user.createdTimestamp / 1000)}:f> (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)
            ㊏ Rejoint le: <t:${parseInt(member.joinedTimestamp / 1000)}:f> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)
            `)
            .setTimestamp()
            .setFooter({ text: 'L\'utilisateur a rejoint!' });

        const logChannel = client.channels.cache.get(fetchGuild.welcomeChannel);
        logChannel.send({ embeds: [log] });
    },
};