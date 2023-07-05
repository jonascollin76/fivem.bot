// const disbut = require('discord-buttons');
const { MessageActionRow, MessageButton, MessageMenuOption, MessageMenu, MessageEmbed } = require('discord.js')
const config = require("../config.json");
module.exports = {
	name: 'roles',
	description: 'Brug den her i "roller" kanalen!',
	async execute(message, args, con) {
		if (!message.guild.id == "661361742282096650") return message.channel.send("Det må du ikke det der")

		  if(message.member.roles.cache.some(r => r.name === "Manager") ) {

				const embed = new MessageEmbed();
				embed.setTitle("Select roles")
				embed.setAuthor("FiveM.dk")
				embed.setDescription("Select the roles that you want to assign")
				// embed.setFooter('FiveM.dk - Bragt til live af Lasse Mejdahl Christensen');

				//Giv rolle knapper
				let btn = new MessageButton()
			     .setStyle('SUCCESS')
			     .setLabel('Developer 🛠️')
			     .setCustomId('dev_rankAdd')
				let btn2 = new MessageButton()
						.setStyle('SUCCESS')
						.setLabel('Mapping 🏗️️')
						.setCustomId('mapping_rankAdd')
 				let btn3 = new MessageButton()
 						.setStyle('SUCCESS')
 						.setLabel('Skinning 🏡️')
 						.setCustomId('skinner_rankAdd')
 				let btn4 = new MessageButton()
 						.setStyle('SUCCESS')
 						.setLabel('Graphics 🎑️')
 						.setCustomId('grafiker_rankAdd')
 				let btn5 = new MessageButton()
 						.setStyle('SUCCESS')
 						.setLabel('Bot Developer 🤖️')
 						.setCustomId('botdev_rankAdd')


						const aembed = new MessageEmbed();
						aembed.setTitle("Remove roles")
						// aembed.setAuthor("FiveM.dk")
						aembed.setDescription("Select the roles that you want to reassign")
						aembed.setFooter('FiveM.dk - Bragt til live af Lasse Mejdahl Christensen');

						//Fjern rolle knapper
						let abtn = new MessageButton()
					     .setStyle('DANGER')
					     .setLabel('Developer 🛠️')
					     .setCustomId('dev_rankRemove')
						let abtn2 = new MessageButton()
								.setStyle('DANGER')
								.setLabel('Mapping 🏗️️')
								.setCustomId('mapping_rankRemove')
		 				let abtn3 = new MessageButton()
		 						.setStyle('DANGER')
		 						.setLabel('Skinning 🏡️')
		 						.setCustomId('skinner_rankRemove')
		 				let abtn4 = new MessageButton()
		 						.setStyle('DANGER')
		 						.setLabel('Graphics 🎑️')
		 						.setCustomId('grafiker_rankRemove')
		 				let abtn5 = new MessageButton()
		 						.setStyle('DANGER')
		 						.setLabel('Bot Developer 🤖️')
		 						.setCustomId('botdev_rankRemove')


								const addRoles = new MessageActionRow()
											.addComponents(
												btn, btn2, btn3, btn4, btn5
											);
								const remRoles = new MessageActionRow()
											.addComponents(
												abtn, abtn2, abtn3, abtn4, abtn5
											);




							await message.channel.send({ embeds: [embed], components: [addRoles] });
							await message.channel.send({ embeds: [aembed], components: [remRoles] });
			}
	},
};
