var con = require('../database');
const config = require("../config.json");
const {MessageEmbed} = require('discord.js')

module.exports = {
	name: 'log',
	async execute(message, client) {
		let besked = message.content;
	  let person = message.author;
	  let person2 = message.author.tag;
	  let kanal = message.channel.name;

if(message.author.bot) return;

		var server = message.guild.id


			if (besked.includes("@")) {
				const logChannel = message.guild.channels.cache.find(channel => channel.name === "ghostping")
				if (logChannel) {
					const embed = new MessageEmbed();
					embed.setTitle(person2)
					embed.addField("Besked", besked, true)
					embed.addField("Kanal", kanal, true)
					embed.setFooter('FiveM.dk - Bragt til live af Lasse Mejdahl Christensen');
					logChannel.send({embeds: [embed]});
				}
			}
	},
};
