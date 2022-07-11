const rrModel = require ('../../models/reactionRoles');
const { Client, CommandInteraction } = require('discord.js');

module.exports = {
    name: 'remove-role',
    ownerOnly: true,
    category: 'reaction-roles',
    description: 'Ajouter un reaction role',
    permissions: ['MANAGE_ROLES'],
    usage: 'remove-role [role], <description>, <emoji>',
    examples: ['remove-role [role], <description>, <emoji>'],
    options: [
        {
            name: 'role',
            description: 'Role que tu aimerais supprimer',
            type: 'ROLE',
            required: true
        },

    ],

    /**
     * 
     * @param {*Client} client 
     * @param {CommandInteraction} interaction 
     */
     async runInteraction(client, interaction) {
        const role = interaction.options.getRole("role");
        
        const guildData = await rrModel.findOne({ guildId: interaction.guildId })
        
        if (!guildData) return interaction.reply("Ce n'est pas un rôle qui existe sur ce serveur ");

        const guildRoles = guildData.roles;

        const findRole = guildRoles.find((x) => x.roleID === role.id);
        if (!findRole) return interaction.reply("Ce rôle n'a pas été ajouté dans la liste")

        const filteredRoles= guildRoles.filter((x) => x.roleID !== role.id)
        guildData.roles = filteredRoles;

        await guildData.save()

        interaction.reply(`Suppression: ${role.name}`);
    }
}