var moment = require('moment');
var con = require('../database');
var config = require('../config.json');
const fetch = require("node-fetch");
const { MessageEmbed, Permissions } = require('discord.js');
const axios = require('axios').default;


module.exports = {
	name: 'tickets',
	description: 'Viser de 10 seneste tickets en person har lavet.',
	async execute(message, args) {

		if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send("Det må du ikke det der")

	let user = message.mentions.members.first();
		con.query("SELECT * FROM tickets WHERE author = ? ORDER BY id DESC LIMIT 10",[user.id], function (err, result, fields) {
			if (result) {
				if (typeof result[0] =="undefined") return message.channel.send("Ingen tickets fundet");
					const embed = new MessageEmbed();
				embed.setTitle("FiveM.dk - Top 10")
				embed.setAuthor("FiveM.dk")


				embed.setColor(0x00AE86)
				for (var i = 0; i < 10; i++) {
					var s = i + 1
					var date;
					var id;

					if (typeof result[i] !== "undefined") {
							date = result[i]['created'] || "Ukendt"
							id = result[i]['id']

						if (typeof result[i]['id'] =="undefined") {
							id = "Ukendt"
							i = 10
						}

						embed.addField(s+". " + id, "Oprettet: " + date, false)
					}
				}
				embed.setFooter(config.footer);

				message.channel.send({embeds: [embed]});

			}
		})








}

};
