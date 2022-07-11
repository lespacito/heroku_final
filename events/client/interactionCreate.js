const OwnerId = "378102572910641162";

module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(client, interaction){
        let guildSettings = await client.getGuild(interaction.guild);

        if (!guildSettings) {
            await client.createGuild(interaction.guild);
            guildSettings = await client.getGuild(interaction.guild);
            return interaction.reply('Le bot a mis à jour la BDD pour votre serveur, retapez la commande !');
        }

        // Reaction Roles
        if(interaction.isSelectMenu()){
            if(interaction.customId !== 'reaction-roles') return;

            await interaction.deferReply({ ephemeral: true })
            const roleId = interaction.values[0];
            const role = interaction.guild.roles.cache.get(roleId)
            const memberRoles = interaction.member.roles

            const hasRole = memberRoles.cache.has(roleId);

            if(hasRole){
                memberRoles.remove(roleId)
                interaction.followUp(`${role.name} a bien été enlevé pour vous`, { ephemeral: true })
            }else {
                memberRoles.add(roleId)
                interaction.followUp(`${role.name} a bien été rajouté pour vous`, { ephemeral: true })
            }
        }

        if (interaction.isButton()){
            const btn = client.buttons.get(interaction.customId);
            if (!btn) return interaction.reply('Ce bouton n\'existe pas!');
            btn.runInteraction(client, interaction, guildSettings);
        }
        else if (interaction.isCommand || interaction.isContextMenu()) {
            const cmd = client.commands.get(interaction.commandName);
            if (!cmd) return interaction.reply('Cette commande n\'existe pas!');

            if (cmd.OwnerOnly){
                if (interaction.user.id !== OwnerId) return interaction.reply('La seule personne pouvant tapper cette commande est l\'auteur du bot');
            }

            if (!interaction.member.permissions.has([cmd.permissions])) return interaction.reply({ content: `Vous n'avez pas la/les permission(s) requise(s) (\`${cmd.permissions.join(', ')}\`) pour tapper cette commande!`, ephemeral: true });

            cmd.runInteraction(client, interaction, guildSettings);
        }
    },
};