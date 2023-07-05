const Discord = require('discord.js')
var con = require('../database');

module.exports = {
	name: 'ready',
	async execute(client) {

    client.user.setActivity(`😍 Olaoluwa 😍`, {type: 'WATCHING'});

    console.log('Botten er startet.' + " Botten er på " + client.guilds.cache.size + " forskellige servere:");
  	const guildNames = client.guilds.cache.map(g => g.name).join("\n")

  		// console.log(guildNames)
	},
};
