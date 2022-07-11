module.exports = {
    name: "refuse-button",
    async runInteraction(client, interaction){
        try {
            await interaction.member.send(`Tu n'a pas accepté le réglement du coup je t'ai kick!`)
        }catch (e) {
            await interaction.reply(`Le membre ${interaction.member.displayName} n'a pas accepté le réglement je l'ai kick!`)
        }

        await interaction.member.kick(`Il n'a pas accepter le réglement`);

        await client.channels.cache.get(`990690595817279549`).send(`Le membre ${interaction.member.displayName} n'a pas accepter le réglement je l'ai kick`)
    }
};