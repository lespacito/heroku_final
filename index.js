const { token, DBURL } = require('./config.json');
const { Client, Collection } = require('discord.js');
const mongoose = require('mongoose');
const client = new Client({ intents: 1539, partials: ['USER', 'CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'REACTION', 'GUILD_SCHEDULED_EVENT'] });
const Logger = require('./utils/Logger');

['commands', 'buttons'].forEach(x => client[x] = new Collection());
['CommandUtil', 'EventUtil', 'ButtonUtil'].forEach(handler => { require(`./utils/handlers/${handler}`)(client) });
require('./utils/Functions')(client);

process.on('exit', code => { Logger.client(`Le processus s'est arrêté avec le code: ${code}`); });
process.on('uncaughtException', (err, origin) => { 
    Logger.error(`UNCAUGHT_EXCEPTION: ${err}`);
    console.error(`Origine: ${origin}`)
});
process.on('unhandledRejection', (reason, promise) => { 
    Logger.warn(`UNHANDLED_REJECTION: ${reason}`);
    console.log(promise);
});
process.on('warning', (...args) => Logger.warn(...args));

mongoose.connect(DBURL, {
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
}).then(() => { Logger.client('- Connecté à la BDD') })
.catch(err => { Logger.error(err); });

client.on("ready", async() =>{
    let servers = await client.guilds.cache.size
    let servercount = await client.guilds.cache.reduce((a,b) => a+b.memberCount, 0)

    const activites = [
        `?help | ${servers} serveurs`,
        `Invitez moi maintenant !`,
        `Regarde ${servercount} membres`
    ]

    setInterval(()=>{
        const status = activites[Math.floor(Math.random()*activites.length)]

        client.user.setPresence({ activities : [{name: `${status}`}]})
    }, 5000)
})

client.login(token);

