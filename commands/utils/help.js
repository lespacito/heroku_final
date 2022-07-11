const { MessageEmbed } = require('discord.js');
const { readdirSync } = require('fs');
const commandFolder = readdirSync('./commands');

const contextDescription = {
    userinfo : 'Renvoie des infos sur l\'utilisateur'
}

module.exports = {
    name: 'help',
    category: 'utils',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: false,
    usage: 'help <command>',
    examples: ['help', 'help ping'],
    description: 'Renvoie une liste de commande filtrée par catégories',
    async run(client, message, args, guildSettings) {

        const prefix = guildSettings.prefix;
        if (!args.length){
            const noArgsEmbed = new MessageEmbed()
                .setColor('#6e4aaf')
                .addField('Liste des commandes', `Une liste de toutes les catégories disponibles et leurs commandes.\nPour plus d'informations sur une commande, tapez \`${prefix}help <commande>\``)

            for (const category of commandFolder){
                noArgsEmbed.addField(
                    `+ ${category.replace(/(^\w|\s\w)/g, firstLetter => firstLetter.toUpperCase())}`,
                    `\`${client.commands.filter(cmd => cmd.category === category.toLowerCase()).map(cmd => cmd.name).join(', ')}\``
                );
            }

            return message.channel.send({ embeds: [noArgsEmbed] });
        }

        const cmd = client.commands.get(args[0]);
        if (!cmd) return message.reply(`Cette commande n'existe pas!`);

        return message.channel.send(`
\`\`\`makefile
[Help: Commande -> ${cmd.name}] ${cmd.ownerOnly ? '/!\\ Pour les admins du bot uniquement /!\\' : ''}
 
${cmd.description ? cmd.description : contextDescription[`${cmd.name}`]}

utilisation: ${prefix}${cmd.usage}
Exemples: ${prefix}${cmd.examples.join(` | ${prefix}`)}
Permissions: ${cmd.permissions.join(', ')}

---

${prefix} = préfixe utilisé pour le bot (/commands sont aussi dispos)
{} = sous-commande(s) dispo(s) | [] = option(s) obligatoire(s) | <> = option(s) optionnelle(s)
Ne pas inclure ces caractères -> {}, [] et <> dans vos commandes

\`\`\``);
    },
    options: [
        {
            name: 'command',
            description: 'Tapper le nom de votre commande',
            type: 'STRING',
            required: false,
        },
    ],
    async runInteraction(client, interaction,guildSettings) {
        const prefix = guildSettings.prefix;
        const cmdName = interaction.options.getString('command');

        if (!cmdName){
            const noArgsEmbed = new MessageEmbed()
                .setColor('#6e4aaf')
                .addField('Liste des commandes', `Une liste de toutes les catégories disponibles et leurs commandes.\nPour plus d'informations sur une commande, tapez \`${prefix}help <commande>\``)

            for (const category of commandFolder){
                noArgsEmbed.addField(
                    `+ ${category.replace(/(^\w|\s\w)/g, firstLetter => firstLetter.toUpperCase())}`,
                    `\`${client.commands.filter(cmd => cmd.category === category.toLowerCase()).map(cmd => cmd.name).join(', ')}\``
                );
            }

            return interaction.reply({ embeds: [noArgsEmbed], ephemeral: true });
        }

        const cmd = client.commands.get(cmdName);
        if (!cmd) return interaction.reply({content: `Cette commande n'existe pas!`, ephemeral: true});

        return interaction.reply({content :`
\`\`\`makefile
[Help: Commande -> ${cmd.name}] ${cmd.ownerOnly ? '/!\\ Pour les admins du bot uniquement /!\\' : ''}
 
${cmd.description ? cmd.description : contextDescription[`${cmd.name}`]}

utilisation: ${prefix}${cmd.usage}
Exemples: ${prefix}${cmd.examples.join(` | ${prefix}`)}
Permissions: ${cmd.permissions.join(', ')}

---

${prefix} = préfixe utilisé pour le bot (/commands sont aussi dispos)
{} = sous-commande(s) dispo(s) | [] = option(s) obligatoire(s) | <> = option(s) optionnelle(s)
Ne pas inclure ces caractères -> {}, [] et <> dans vos commandes

\`\`\``, ephemeral: true});
    }
};
