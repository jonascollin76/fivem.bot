const {
	Permissions,
	MessageEmbed
} = require('discord.js')
var con = require('../database');
const config = require("../config.json");

module.exports = {
	name: 'message',
	async execute(message, client, commands) {
		let besked = message.content;
		let person = message.author;
		let kanal = message.channel.name;
		if (typeof message.guild.id == "undefined") return false;
		var server = message.guild.id

		if (message.author.id != client.user.id && message.guild.id == '661361742282096650') { // DK FiveM Guild
			if (global.stickyMessages.has(message.channel.id)) {
				var data = global.stickyMessages.get(message.channel.id);
				data.message.delete();
				data.channel.send({
					content: data.content
				}).then(msg => {
					global.stickyMessages.set(data.channel.id, {
						channel: data.channel,
						content: data.content,
						message: msg
					})
				})
			}
		}

		if (message.author.bot) return;

		var server = message.guild.id
		// con.connect(function(err) {
		// 	con.query("SELECT points FROM servers WHERE guild = '"+server+"'", function (err, result, fields) {
		// 				// console.log(result);
		// 				if (typeof result == "undefined") { return }
		// 				if (typeof result[0] == "undefined") { return }
		// 		if (message.guild.me.permission.has(Permissions.ADMINISTRATOR)) {
		//
		// 		if (result) {
		// 			message.guild.me.setNickname('FiveM.dk | '+result[0]['points']+' points');
		// 		}
		// 		else {
		// 			message.guild.me.setNickname('FiveM.dk');
		// 		}
		// 	}
		// 	});
		// });

		if (message.content.indexOf(config.prefix) !== 0) return;
		const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
		const command = args.shift().toLowerCase();



		con.connect(function (err) {
			con.query("SELECT * FROM commands", function (err, result, fields) {
				// console.log(result);
				if (result) {

					for (var i = 0; i < result.length; i++) {
						if (message.content.toLowerCase() == "!" + result[i]['command'].toLowerCase()) {
							// console.log("test")

							const embed = new MessageEmbed();
							embed.setTitle(result[i]['shortcut'])
							embed.setAuthor("FiveM.dk")
							embed.addField("Svar", result[i]['answer'], true)
							embed.setFooter('FiveM.dk - Bragt til live af Lasse Mejdahl Christensen');
							message.channel.send({
								embeds: [embed]
							});
						}
					}
				}
			});
		});

		if (!client.commands.has(command)) return;

		try {
			client.commands.get(command).execute(message, args);
		} catch (error) {
			console.error(error);
			message.reply('Der skete en fejl');
		}
	},
};