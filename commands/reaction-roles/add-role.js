const rrModel = require ('../../models/reactionRoles');
const { Client, CommandInteraction } = require('discord.js');
 
module.exports = {
    name: 'add-role',
    ownerOnly: true,
    category: 'reaction-roles',
    description: 'Ajouter un reaction role',
    permissions: ['MANAGE_ROLES'],
    usage: 'add-role [role], <description>, <emoji>',
    examples: ['add-role [role], <description>, <emoji>'],
    options: [
        {
            name: 'role',
            description: 'Role que tu aimerais',
            type: 'ROLE',
            required: true
        },
        {
            name: 'description',
            description: 'Description du rôle',
            type: 'STRING',
            required: false
        },
        {
            name: 'emoji',
            description: 'emoji pour le rôle',
            type: 'STRING',
            required: false
        },
 
    ],
 
    /**
     * 
     * @param {*Client} client 
     * @param {CommandInteraction} interaction 
     */
    async runInteraction(client, interaction) {
        const role = interaction.options.getRole("role");
        const roleDescription = interaction.options.getString("description") || null;
        const roleEmoji = interaction.options.getString("emoji") || null;
        
        if (role.position >= interaction.guild.me.roles.highest.position) 
            return interaction.reply("Je ne peux pas assigner ce rôle il est plus élevé ou égal au mien "
            );
 
        const guildData = await rrModel.findOne({ guildId: interaction.guildId })
 
        const newRole = {
            roleID: role.id,
            roleDescription,
            roleEmoji,
        }
 
        if (guildData) {
            const roleData = guildData.roles.find((x) => x.roleId === role.id)
 
            if (roleData) {
                roleData = newRole;
            }else {
                guildData.roles = [...guildData.roles, newRole]
            }
 
            await guildData.save()
        }else{
            await rrModel.create({
                guildId: interaction.guildId,
                roles: newRole
            })
        }
 
        interaction.reply(`Création du rôle: ${role.name}`);
    }
}