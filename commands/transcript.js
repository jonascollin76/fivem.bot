var moment = require('moment');
var con = require('../database');
var config = require('../config.json');
const fetch = require("node-fetch");
const Discord = require('discord.js');
const axios = require('axios').default;


module.exports = {
	name: 'transcript',
	description: 'Viser de 10 seneste tickets en person har lavet.',
	async execute(message, args) {

		if (!message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send("Det må du ikke det der")

	const id = args.join(" ");
		con.query("SELECT transcript FROM tickets WHERE id = ?",[id], function (err, result, fields) {
			if (result) {
				if (typeof result[0] =="undefined") return message.channel.send("Ingen ticket fundet");

				const attachment = new Discord.MessageAttachment(Buffer.from(result[0]['transcript']), 'transcript.txt');
				// message.channel.send("Chatlog", { files: [attachment] });

				const embed = new Discord.MessageEmbed().setTitle('Chatlog for ticket-'+id);
				message.channel.send({ embeds: [embed], files: [attachment] });

			}
		})








}

};
