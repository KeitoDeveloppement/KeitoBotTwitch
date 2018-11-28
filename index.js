var tmi = require('tmi.js');
var request = require('request');
const fs = require('fs');

botdesc = require('./desc.json');

var options = {
    options: {
        debug: true
    },
    connection: {
        cluster: "aws",
        reconnect: true
    },
    identity: {
        username: "KeitoBot_",
        password: process.env.TOKEN
    },
    channels: ["Keito_"],
};

var bot = new tmi.client(options);
bot.connect();

bot.on('chat', function(channel, userstate, message, self) {
    if (self) return;
    let sender = userstate['display-name'];

    if(userstate['mod'] === false) {
        if(message.includes('www.') || message.includes('.com')) {
            bot.timeout(channel, sender, 30, "Merci de ne pas mettre de liens dans le chat !");
        }
    }

    if(userstate['mod'] === false) {
        if(message.includes('www.') || message.includes('.fr')) {
            bot.timeout(channel, sender, 30, "Merci de ne pas mettre de liens dans le chat !");
        }
    }

    if(message.toUpperCase().includes('PUTIN')) {
        bot.timeout(channel, sender, 30, "Merci de ne pas dire d'insultes !");
    }
    if(message.toUpperCase().includes('PUTAIN')) {
        bot.timeout(channel, sender, 30, "Merci de ne pas dire d'insultes !");
    }
    if(message.toUpperCase().includes('PUTE')) {
        bot.timeout(channel, sender, 30, "Merci de ne pas dire d'insultes !");
    }
    if(message.toUpperCase().includes('MERDE')) {
        bot.timeout(channel, sender, 30, "Merci de ne pas dire d'insultes !");
    }
    if(message.toUpperCase().includes('CONNARD')) {
        bot.timeout(channel, sender, 30, "Merci de ne pas dire d'insultes !");
    }
    if(message.toUpperCase().includes('CONNERIE')) {
        bot.timeout(channel, sender, 30, "Merci de ne pas dire d'insultes !");
    }
    if(message.toUpperCase().includes('TG')) {
        bot.timeout(channel, sender, 30, "Merci de ne pas dire d'insultes !");
    }
    if(message.toUpperCase().includes('CONNARD')) {
        bot.timeout(channel, sender, 30, "Merci de ne pas dire d'insultes !");
    }

    if(message === "!clear") {
        if (userstate.mod) {
            bot.clear("Keito_");
            bot.action('Keito_', "Tous les messages ont étés effacés !");
        } else {
            bot.action('Keito_', "Tu dois être Modérateur sur la chaîne pour pouvoir utiliser cette commande !");
            return;
        }
    }
    if(message === "!help") {
        bot.action('Keito_', "Voici la liste de mes commandes :\n\n!discord : Affiche le serveur Discord de Keito.\n\n!youtube : Affiche la chaîne YouTube de Keito.\n!twitter : Affiche le Twitter de Keito.\n!sens : Affiche les sensiblitées de Keito.\n!res : Affiche les résolutions de Keito en jeu.\n!param : Affiche les paramètres de Keito en jeu !\n!shop : Affiche le shop du jour sur Fortnite.\n!dons : Permet de donner de l'argent à Keito\n!uptime : Cette commande vous indique depuis combien de temps Keito est en live.\n!video : Affiche la dernière vidéo de Keito !");
    }
    if(message === "!discord") {
        bot.action('Keito_', "Le Discord de Keito est : https://discord.gg/B55ujrk");
    }
    if(message === "!youtube") {
        bot.action('Keito_', "La chaîne YouTube de Keito est : https://www.youtube.com/channel/UCu283gUmsWZ7TSbKYX2CpFw");
    }
    if(message === "!twitter") {
        bot.action('Keito_', "Le Twitter de Keito est : https://twitter.com/Im_Keito");
    }
    if(message === "!shop") {
        bot.action('Keito_', "Le shop du jour : https://fnbr.co/shop");
    }
    if(message === '!sens') {
        bot.action('Keito_', "Fortnite : 800 DPI et 0,09 / H1Z1 : 800 DPI et 9% dans tout")
    }
    if(message === '!res') {
        bot.action('Keito_', "Fortnite : 1440x900 / H1Z1 : 1440x900")
    }
    if(message === "!uptime") {
        if(body.stream === null) {
            reply("NashRay n'est pas en live !");
            return;
        } else {
            request('https://decapi.me/twitch/uptime?channel=Keito_', function (error, response, body, message) {
                console.log('body:', body);
                bot.action('Keito_', "Keito stream depuis : " + body);
            });
        }
    }
    if(message === "!param") {
        bot.action('Keito_', "Voici les paramètres de Keito : https://clips.twitch.tv/BelovedDelightfulToadFUNgineer")
    }
    if(message === "!dons") {
        bot.action('Keito_', "Si vous voulez soutenir Keito, cliquez sur ce lien : https://streamlabs.com/keito_")
    }
    if(message === "!followon") {
        if (userstate.mod) {
            bot.followersonly("Keito_", 0);
        } else {
            bot.action('Keito_', "Tu dois être modérateur pour pouvoir exécuter cette commande !")
        }
    }
    if(message === "!followoff") {
        if (userstate.mod) {
            bot.followersonlyoff("Keito_");
        } else {
            bot.action('Keito_', "Tu dois être modérateur pour pouvoir exécuter cette commande !")
        }
    }
    if(message === "!slowon") {
        if (userstate.mod) {
        bot.slow('Keito_', 30);
        }
    }
    if(message === "!slowoff") {
        if (userstate.mod) {
            bot.slowoff('Keito_');
        }
    }
    if(message.startsWith('!editvideo')) {
        if (userstate.mod) {
            editeddescription = message.slice (10);

            botdesc [sender] = {
                description: editeddescription
            }
            fs.writeFile('desc.json', JSON.stringify(botdesc, null, 4), err =>{
                if (err) throw err;
                bot.action('Keito_', "Description éditée");
            });
        } else {
            bot.action('Keito_', "Tu dois être Modérateur pour pouvoir utiliser cette commande !")
        }
    }
    if(message === '!video') {
        let botdescs = botdesc[sender].description;
        bot.action('Keito_', botdescs);
    }
});

bot.on('connected', function(address, port) {
    bot.action("Keito_", "Vous pouvez de nouveau utiliser mes commandes !");
});