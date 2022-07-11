const rrModel = require ('../../models/reactionRoles');
const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
    name: 'panel',
    ownerOnly: true,
    category: 'reaction-roles',
    description: 'reaction role',
    permissions: ['MANAGE_ROLES'],
    usage: 'panel',
    examples: ['panel'],

    /**
     * 
     * @param {*Client} client 
     * @param {CommandInteraction} interaction 
     */
     async runInteraction(client, interaction) {
        
        const guildData = await rrModel.findOne({ guildId: interaction.guildId })
        
        if (!guildData?.roles) return interaction.reply("Ce n'est pas un rôle qui existe sur ce serveur ");

        const options = guildData.roles.map(x => {
            const role = interaction.guild.roles.cache.get(x.roleID);

            return {
                label: role.name,
                value: role.id,
                description: x.roleDescription || 'Pas de description',
                emoji: x.roleEmoji
            };
        });

        const panelEmbed = new MessageEmbed()
            .setTitle('Merci de séléctionner un rôle')
            .setColor('DARK_BLUE')

        const components = [
            new MessageActionRow().addComponents(new MessageSelectMenu().setCustomId('reaction-roles')
                .setMaxValues(1)
                .addOptions(options)
            )
        ];

        interaction.reply("Envoyé")
        interaction.channel.send({ embeds: [panelEmbed], components })
    }
}