module.exports = {
    name: 'clear',
    category: 'moderation',
    permissions: ['MANAGE_MESSAGES'],
    ownerOnly: false,
    usage: 'clear [NombreMessages] <@cible>',
    examples: ['clear 50', 'clear 50 @lespacito'],
    description: 'Supprimer un nombre de message spécifié sur un salon ou un utilisateur',
    async run(client, message, args) {
        const amountToDelete = args[0];
        if (isNaN(amountToDelete) || !args[0] || amountToDelete > 100 || amountToDelete < 0) return message.reply('Le \`nombre\` doit être compris entre 1 et 100');
        const target = message.mentions.users.find(u => u.id);
        await message.delete();

        const messageToDelete = await message.channel.messages.fetch();

        if(target){
            let i = 0;
            const filteredTargetMessages = [];
            (await messageToDelete).filter(msg => {
                if (msg.author.id === target.id && amountToDelete > i){
                    filteredTargetMessages.push(msg); i++;
                }
            });
            
            await message.channel.bulkDelete(filteredTargetMessages, true).then(messages => {
                message.channel.send(`J'ai supprimé ${messages.size} messages sur l'utilisateur ${target}`);
            });
        } else {
            await message.channel.bulkDelete(amountToDelete, true).then(messages => {
                message.channel.send(`J'ai supprimé ${messages.size} messages sur ce salon`);
            });
        }
    },
        options: [
        {
            name: 'message',
            description: 'Le nombre de message à supprimer',
            type: 'NUMBER',
            required: true,
        },
        {
            name: 'target',
            description: 'Séléctionner l\'utilisateur pour la suppression de message',
            type: 'USER',
            required: false,
        },
    ],
    async runInteraction(client, interaction) {
        const amountToDelete = interaction.options.getNumber('message');
        if (amountToDelete > 100 || amountToDelete < 0) return interaction.reply('Le \`nombre\` doit être compris entre 1 et 100');
        const target = interaction.options.getMember('target');

        const messageToDelete = await interaction.channel.messages.fetch();

        if(target){
            let i = 0;
            const filteredTargetMessages = [];
            (await messageToDelete).filter(msg => {
                if (msg.author.id === target.id && amountToDelete > i){
                    filteredTargetMessages.push(msg); i++;
                }
            });
            
            await interaction.channel.bulkDelete(filteredTargetMessages, true).then(messages => {
                interaction.reply(`J'ai supprimé ${messages.size} messages sur l'utilisateur ${target}`);
            });
        } else {
            await interaction.channel.bulkDelete(amountToDelete, true).then(messages => {
                interaction.reply(`J'ai supprimé ${messages.size} messages sur ce salon`);
            });
        }
    }
};
