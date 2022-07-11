const { promisify } = require('util');
const { glob } = require('glob');
const pGlob = promisify(glob);

module.exports = async (client) => {
    (await pGlob(`${process.cwd()}/buttons/*/*.js`)).map(async (btnFile) => {

        const btn = require(btnFile);

        if (!btn.name) return Logger.warn(`Commande non-chargée: pas de nom ⬇\nFichier -> ${btnFile}`);

        client.buttons.set(btn.name, btn);

    });
};