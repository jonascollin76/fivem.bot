var moment = require('moment');
var con = require('../database');
var config = require('../config.json');
const fetch = require("node-fetch");
const { Permissions } = require('discord.js');
const axios = require('axios').default;


module.exports = {
	name: 'tickettake',
	description: 'Påtag dig en ticket',
	async execute(message, args) {
		id = message.channel.name

		if (!id.includes("ticket-")) return message.channel.send("Det må du ikke det der")

		const staff = message.author.id;
		ticketId = id.replace("ticket-", "");
		con.query(`UPDATE tickets SET staff = ? WHERE id = ?`, [staff, ticketId])
		message.channel.setTopic(`<@${staff}> har ansvaret for denne ticket.`)
		message.channel.send(`<@${staff}> har påtaget sig din ticket. <@${staff}> vil hjælpe dig så godt muligt.`)





}

};
