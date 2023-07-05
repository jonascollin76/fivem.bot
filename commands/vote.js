var moment = require('moment');
var con = require('../database');
var config = require('../config.json');
const fetch = require("node-fetch");
const Discord = require('discord.js')
const axios = require('axios').default;


module.exports = {
	name: 'vote',
	description: 'Vote på en server',
	async execute(message, args) {

		const server = args.join(" ");
		const identifier = message.author.id;
		var url = "https://fivem.dk/api/v1/"+server
		axios.get(url)
			.then(function (response) {
				// handle success
				// console.log(response);

				if (server) {
					console.table(response['data'])
					if (typeof response['data']['result6'][0] === "undefined") {
						message.channel.send("Du har ikke defineret en server, ellers findes denne server ikke på vores liste. Tjek listen på https://fivem.dk")
						return;
					}


					con.query("SELECT * FROM votes WHERE identifier = ? AND curdate = CURDATE()", [identifier], function (err, result, fields) {
						// console.log(result);
						if (typeof result !== "undefined") {
							if (typeof result[0] !== "undefined") {
								message.channel.send("Du har allerede stemt i dag.")
							}
							else {
								var sql = "INSERT INTO votes (identifier, server, curdate) VALUES (?, ?, CURDATE())";
							  con.query(sql, [identifier, server], function (err, result) {
							    if (err) throw err;
									message.channel.send("Du har stemt på serveren ``"+server+"`` ("+response['data']['result6'][0]['name']+"), mange tak. - Husk at stem igen i morgen!\nHusk du kan stemme 2 gange hvis du også stemmer inde på https://fivem.dk");
									// message.channel.send(message.author.id)

										var sql = "UPDATE servers SET points=points+1 WHERE ip=?";
									  con.query(sql, [server], function (err, result) {
									    if (err) throw err;
									  });
							  });
							}

						}
						else {
							var sql = "INSERT INTO votes (identifier, server, curdate) VALUES (?, ?, CURDATE())";
						  con.query(sql, [identifier, server], function (err, result) {
						    if (err) throw err;
								message.channel.send("Du har stemt på serveren ``"+server+"`` ("+response['data']['result6'][0]['namr']+"), mange tak. - Husk at stem igen i morgen!");
								// message.channel.send(message.author.id)

									var sql = "UPDATE servers SET points=points+1 WHERE ip=?";
								  con.query(sql, [server], function (err, result) {
								    if (err) throw err;
								  });
						  });
						}
					});


				}
				else {
					guild = message.guild.id
					console.log(guild)
					con.query("SELECT ip AS server, name FROM servers WHERE guild = ?", [guild], function (err, fetch, fields) {
						if (typeof fetch == "undefined") { return message.channel.send("Der skete en fejl.") }
							if (typeof fetch[0] == "undefined") {
								return message.channel.send("Der skete en fejl.")
							}
							var server = fetch[0]['server'];
					con.query("SELECT * FROM votes WHERE identifier = ? AND curdate = CURDATE()", [identifier], function (err, result, fields) {
						// console.log(result);
						if (typeof result !== "undefined") {
							if (typeof result[0] !== "undefined") {
								message.channel.send("Du har allerede stemt i dag.")
							}
							else {
								var sql = "INSERT INTO votes (identifier, server, curdate) VALUES (?, ?, CURDATE())";
							  con.query(sql, [identifier, server], function (err, result) {
							    if (err) throw err;
									message.channel.send("Du har stemt på serveren ``"+fetch[0]['server']+"`` ("+fetch[0]['name']+"), mange tak. - Husk at stem igen i morgen!\nHusk du kan stemme 2 gange hvis du også stemmer inde på https://fivem.dk");
									// message.channel.send(message.author.id)

										var sql = "UPDATE servers SET points=points+1 WHERE ip=?";
									  con.query(sql, [server], function (err, result) {
									    if (err) throw err;
									  });
							  });
							}

						}
						else {
							var sql = "INSERT INTO votes (identifier, server, curdate) VALUES (?, ?, CURDATE())";
						  con.query(sql, [identifier, server], function (err, result) {
						    if (err) throw err;
								message.channel.send("Du har stemt på serveren ``"+fetch[0]['server']+"`` ("+fetch[0]['name']+"), mange tak. - Husk at stem igen i morgen!");
								// message.channel.send(message.author.id)

									var sql = "UPDATE servers SET points=points+1 WHERE ip=?";
								  con.query(sql, [server], function (err, result) {
								    if (err) throw err;
								  });
						  });
						}
					});
				})

					// message.channel.send("Du har ikke defineret en server, ellers findes denne server ikke på vores liste. Tjek listen på https://fivem.dk")
				}
			 })
			.catch(function (error) {
				// handle error
			 	console.log(error);
			 })
			.then(function () {
			 	// always executed
			});









	},
};
