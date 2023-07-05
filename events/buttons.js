
var con = require('../database');
const config = require("../config.json");


const { MessageActionRow, MessageButton, MessageSelectMenu, MessageMenu, MessageEmbed, MessageAttachment } = require('discord.js')

module.exports = {
	name: 'buttons',
	async execute(button, client) {




		if (button.customId === 'open_ticket') {
			if (typeof button.user.id == "undefined") return button.channel.send("Der skete en fejl. Prøv at tryk igen");

				if (typeof button.guild.id == "undefined") return button.channel.send("Der skete en fejl. Prøv at tryk igen2");
	    // button.channel.send(`${button.user.tag} clicked button!`);
			// console.log(button.message)
			con.query(`SELECT * FROM discords WHERE guild = ${button.guild.id}`, function (err, result, fields) {
				if (typeof result[0] !== "undefined") {
					const ticketCategory = result[0]['ticketCategory'];

					const date = new Date();
					con.query(`INSERT INTO tickets (author, created) VALUES (?, ?)`, [button.user.id, date])

					con.query(`SELECT * FROM tickets ORDER BY id DESC LIMIT 1`, (err, row) => {
							if (err) throw err;
							num = row[0].id


					// num = Math.floor(Math.random() * 1000000)

					button.guild.channels.create("ticket-"+num, "text").then((channel) => {

							channel.setParent(ticketCategory).then((parent) => {

							button.member.send(`Du har oprettet en ticket. Find den her ${channel}`, true);

								let role = button.guild.roles.cache.find(r => r.name === "@everyone");
								let moderator = button.guild.roles.cache.find(r => r.name === ""+result[0]['role']+"");
								let trainee = button.guild.roles.cache.find(r => r.name === ""+result[0]['role2']+"");
								// console.log(result[0]['role'])
								channel.permissionOverwrites.set([
									{
										type: 'role',
											id: role.id,
											deny: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES']
									},
									{
										type: 'role',
										id: moderator.id,
										allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES']
									},
									{
										type: 'role',
										id: trainee.id,
										allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES']
									},
									{
										id: button.user.id,
										allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES'],
									}

								]);



									var embed = new MessageEmbed()
											.setTitle("Hej!")
											.setDescription("Stil dit spørgsmål her.");

											let btn = new MessageButton()
											.setStyle('DANGER')
											.setLabel('Luk ticket')
											.setCustomId('close_ticket')

											const close = new MessageActionRow()
														.addComponents(
															btn
														);

											parent.send({ content: 'Tryk på knappen for at lukke din ticket', components: [close] });

												var embed2 = new MessageEmbed()
														.setTitle("Hej!")
														.setDescription("Stil dit spørgsmål her.");

														let btn2 = new MessageButton()
														.setStyle('PRIMARY')
														.setLabel('Jeg vil gerne ha\' min server på listen')
														.setCustomId('server_help')
														let btn3 = new MessageButton()
														.setStyle('PRIMARY')
														.setLabel('Debat')
														.setCustomId('debat_help')
														let btn4 = new MessageButton()
														.setStyle('PRIMARY')
														.setLabel('Verified rolle')
														.setCustomId('verified_help')
														let btn5 = new MessageButton()
														.setStyle('PRIMARY')
														.setLabel('Partner/shop')
														.setCustomId('partner_help')
														let btn6 = new MessageButton()
														.setStyle('PRIMARY')
														.setLabel('Tilbyder/søger')
														.setCustomId('dba_help')
														let btn7 = new MessageButton()
														.setStyle('PRIMARY')
														.setLabel('Andet')
														.setCustomId('other_help')
														let btn8 = new MessageButton()
														.setStyle('PRIMARY')
														.setLabel('18+')
														.setCustomId('18_help')
														let btn9 = new MessageButton()
														.setStyle('DANGER')
														.setLabel('STAFF')
														.setCustomId('staff_help')

														const choices = new MessageActionRow()
																	.addComponents(
																		btn2, btn3, btn4, btn5, btn6
																	);
																	const choices2 = new MessageActionRow()
																				.addComponents(
																					btn7, btn8, btn9
																				);

															parent.send({ content: 'Hej <@' + button.user.id + '>! Du har oprettet en ticket på FiveM.dk, og har nu følgende muligheder.', components: [choices, choices2] });


									// parent.send(embed);
									// message.reactions.resolve("✉️").users.remove(user);
							}).catch(err => {
								console.log(err)
									// message.channel.send("Der skete en fejl");
							});

					}).catch(err => {
							// message.channel.send("Der skete en fejl");
					});

				});

			}
		})
	  }
		if (button.customId === 'close_ticket') {
			// if (!button.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Det må du ikke det der")

			guild = button.guild.id
				con.query(`SELECT ticketCategory from discords WHERE guild = ?`, [guild], function (err, result, fields) {
					if (typeof result[0] !== "undefined") {
						const categoryId = result[0]['ticketCategory']; //gør så man kun kan lukke tickets i den category som tickets bliver oprettet i
					  if (button.channel.parentId == categoryId) {

					    var embed = new MessageEmbed();
					      embed.setTitle("Ticket: " + button.message.channel.name)
					      embed.setDescription(
					        `Ticket: ${button.channel.name} blev afsluttet af ${button.user}.`
					      )
					      embed.setTimestamp();

					    const logChannel = button.guild.channels.cache.find(channel => channel.name === "logs")
					    if (!logChannel)
					      return button.channel.send("Kan ikke finde log kanalen");

								chat = button.channel.id;
								// console.log(button.channel)
								const channel = client.channels.cache.get(chat);
								channel.messages.fetch({ limit:100 }).then(async fetched => {

								// fetched = fetched.array().reverse();

								id = button.channel.name
								ticketId = id.replace("ticket-", "");

								const mapped = fetched.map(msg => `${msg.author.tag}: ${msg.content}`).join('\n');
								const attachment = new MessageAttachment(Buffer.from(mapped), 'transcript.txt');

								con.query(`UPDATE tickets SET transcript = ?, closed = 1 WHERE id = ?`, [mapped, ticketId])

								// logChannel.send("Log", { files: [attachment] });

								logChannel.send({embeds: [embed]});
								const embed2 = new MessageEmbed().setTitle('Chatlog for ticket-'+ticketId);
								logChannel.send({ embeds: [embed2], files: [attachment] });

								con.query(`SELECT author from tickets WHERE id = ?`, [ticketId], function (err, row, fields) {

									let warnmedlem = '' + row[0].author + '';
									logChannel.guild.members.fetch(warnmedlem, false).then((user) => {
										 user.send({embeds: [embed2], files: [attachment]});
										});
									})

								button.channel.delete();
								});
					  } else {
					    return button.channel.send("Denne kanal er ikke i ticket kategorien.")
					  }
					}
				})
		}


		if (button.customId === 'rate') {

			button.defer()
			switch(button.customId) {
        case "1": {
          button.edit("Rated 1", [button])
          break;
        }
        case "2": {
          button.edit("Rated 2",  [button])
          break;
        }
			}

		}

		if (button.customId === 'server_help') {
      await button.channel.send('Du har valgt: **Tilføjelse af server på FiveM.dk**. Find følgende til os:\n**1.** cfx IP\n**2.** Discord invite (kun de sidste cifre)\n**3.** Servernavn i dit kælenavn her på discorden\n**4.** Serveren skal være live\n\nHerefter vil vores staffteam hjælpe dig hurtigst muligt.');
		}
		if (button.customId === 'debat_help') {
      await button.channel.send('Du har valgt: **Debat**. For at kunne behandle din ticket hurtigst muligt, ber vi dig om at skrive en Overskrift til din debat, og en kort beskrivelse af hvilket indhold debatten skal foregå.');
		}
		if (button.customId === 'verified_help') {




			let option = [{
				label: 'Verified Udvikler',
				description: 'Pew',
				value: 'dev',
			}]

			let option2 = [{
				label: 'Verified Grafiker/Skinner',
				description: 'Pew',
				value: 'grafik',
			}]

			let option3 = [{
				label: 'Verified 3D Udvikler',
				description: 'Pew',
				value: '3ddev',
			}]

			let option4 = [{
				label: 'Verified Bot Udvikler',
				description: 'Pew',
				value: 'botdev',
			}]


			// const row = new MessageSelectMenu()
			// .addComponents(
			// 	new MessageSelectMenu()
			// 	.setCustomId('customid')
			// 	.setPlaceholder('Vælg hvilken rolle du vil ansøge om')
			// 	.addOptions(option[0])
			// 	.addOptions(option2)
			// 	.addOptions(option3)
			// 	.addOptions(option4)
			// );

			const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Nothing selected')
					.addOptions([option, option2, option3, option4]),
			);


	await button.channel.send({ content: 'Du har valgt **Verified rolle**. Vælg venligst hvilken rolle du gerne vil ansøge om.', components: [row] });

		}
		if (button.customId === 'partner_help') {
      await button.channel.send('Du har valgt: **Partner/Shop**. For at kunne behandle din ticket hurtigst muligt ber vi dig om at sende de sidste cifre af et discord invite link (f.eks. https://discord.gg/ cifre). Du **SKAL** have mindst en verified rolle på vores Discord.');
		}
		if (button.customId === 'dba_help') {
      await button.channel.send('Du har valgt: **Tilbyder/Søger**. Skriv venligst din tekst her som du vil have ind i <#740369585873748029>, så kigger vi på det og svarer dig hurtigst muligt.');
		}
		if (button.customId === 'other_help') {
      await button.channel.send('Du har valgt: **Andet**. Vores staffteam vil hjælpe dig så hurtigt som muligt.');
		}
		if (button.customId === '18_help') {
      await button.channel.send('Du har valgt: **18+**. Send venligst et billede af dit sygesikring/kørekort/pas. Slør de sidste 4 i dit CPR nr. Denne ticket skal kunne ses i baggrunden. Vores staffteam vil hjælpe dig så hurtigt som muligt.');
		}
		if (button.customId === 'staff_help') {
			id = button.channel.name

			const staff = button.member.id;
			if(button.member.roles.cache.some(r => r.name === "Moderator") || button.member.roles.cache.some(r => r.name === "Manager") ) {

				if (!id.includes("ticket-")) return message.channel.send("Det må du ikke det der")

				ticketId = id.replace("ticket-", "");
				con.query(`UPDATE tickets SET staff = ? WHERE id = ?`, [staff, ticketId])
				button.channel.setTopic(`<@${staff}> har ansvaret for denne ticket.`)
				button.channel.send(`<@${staff}> har påtaget sig din ticket. <@${staff}> vil hjælpe dig så godt som muligt.`)

			}
			else {
				button.channel.send(`${staff} kun staff kan påtage sig opgaver.`)
			}

		}

		//Tildel rolle funktion
		if (button.customId === 'dev_rankAdd') {
			await button.member.roles.add("663369657150865440").catch(e => {})
			// await button.member.send({ content: 'Rollen **Udvikler** blev tildelt', ephemeral: true});
			await sendPrivateMessage(button, 'Rollen **Udvikler** blev tildelt')
		}
		if (button.customId === 'mapping_rankAdd') {
			await button.member.roles.add("736905737082634253").catch(e => {})
			// await button.member.send({ content: 'Rollen **Mapping** blev tildelt', ephemeral: true});
			await sendPrivateMessage(button, 'Rollen **Mapping** blev tildelt')
		}
		if (button.customId === 'skinner_rankAdd') {
			await button.member.roles.add("662377187034398720").catch(e => {})
			// await button.member.send({ content: 'Rollen **Skinner** blev tildelt', ephemeral: true});
			await sendPrivateMessage(button, 'Rollen **Skinner** blev tildelt')
		}
		if (button.customId === 'grafiker_rankAdd') {
			await button.member.roles.add("661910897878368266").catch(e => {})
			// await button.member.send({ content: 'Rollen **Grafiker** blev tildelt', ephemeral: true});
			await sendPrivateMessage(button, 'Rollen **Grafiker** blev tildelt')
		}
		if (button.customId === 'botdev_rankAdd') {
			await button.member.roles.add("834887706542473236").catch(e => {})
			// await button.member.send({ content: 'Rollen **Bot Udvikler** blev tildelt', ephemeral: true});
			await sendPrivateMessage(button, 'Rollen **Bot Udvikler** blev tildelt')
		}



		//Fjern rolle funktion
		if (button.customId === 'dev_rankRemove') {
			await button.member.roles.remove("663369657150865440").catch(e => {})
			// await button.member.send({ content: 'Rollen **Udvikler** blev fravalgt', ephemeral: true});
			await sendPrivateMessage(button, 'Rollen **Udvikler** blev fravalgt')
		}
		if (button.customId === 'mapping_rankRemove') {
			await button.member.roles.remove("736905737082634253").catch(e => {})
			// await button.member.send({ content: 'Rollen **Mapping** blev fravalgt', ephemeral: true});
			await sendPrivateMessage(button, 'Rollen **Mapping** blev fravalgt')
		}
		if (button.customId === 'skinner_rankRemove') {
			await button.member.roles.remove("662377187034398720").catch(e => {})
			// await button.member.send({ content: 'Rollen **Skinner** blev fravalgt', ephemeral: true});
			await sendPrivateMessage(button, 'Rollen **Skinner** blev fravalgt')
		}
		if (button.customId === 'grafiker_rankRemove') {
			await button.member.roles.remove("661910897878368266").catch(e => {})
			// await button.member.send({ content: 'Rollen **Grafiker** blev fravalgt', ephemeral: true});
			await sendPrivateMessage(button, 'Rollen **Grafiker** blev fravalgt')
		}
		if (button.customId === 'botdev_rankRemove') {
			await button.member.roles.remove("834887706542473236").catch(e => {})
			// await button.member.send({ content: 'Rollen **Bot Udvikler** blev fravalgt', ephemeral: true});
			await sendPrivateMessage(button, 'Rollen **Bot Udvikler** blev fravalgt')
		}



		async function sendPrivateMessage(button, message) {

				// button.member.send({content: message, ephemeral: true}).catch(console.log("Rolle tildelt/fravalgt"));
				// button.reply({content: message, ephemeral: true}).catch(console.log("Rolle tildelt/fravalgt"));
		}

	},
};
