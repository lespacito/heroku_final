const { mongoose } = require("mongoose");

const guildSchema = mongoose.Schema({
    id: String,
    prefix: { 'type': String, 'default': '!' },
    logChannel: { 'type': String, 'default': '990690595817279549' },
    welcomeChannel: { 'type': String, 'default': '986640251088949288' },
});

module.exports = mongoose.model('Guild', guildSchema);