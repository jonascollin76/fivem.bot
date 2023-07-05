
const Discord = require('discord.js')
const config = require("../config.json");
module.exports = {
	name: 'test',
	description: 'Brug den her i "test" kanalen!',
	async execute(message, args, con) {
		if (!message.guild.id == "661361742282096650") return message.channel.send("Det må du ikke det der")

		  if(message.member.roles.cache.some(r => r.name === "Manager") ) {

				const embed = new Discord.MessageEmbed();
				embed.setTitle("test")
				embed.setAuthor("FiveM.dk")
				embed.setFooter('FiveM.dk - Bragt til live af Lasse Mejdahl Christensen');

				let btn = new disbut.MessageButton()
			          .setStyle('green') //default: blurple
			          .setLabel('1') //default: NO_LABEL_PROVIDED
			          .setID('rate') //note: if you use the style "url" you must provide url using .setURL('https://example.com')
			          // .setDisabled(); //disables the button | default: false
								let btn2 = new disbut.MessageButton()
												.setStyle('green') //default: blurple
												.setLabel('2') //default: NO_LABEL_PROVIDED
												.setID('rate') //note: if you use the style "url" you must provide url using .setURL('https://example.com')
												// .setDisabled(); //disables the button | default: false

			        await message.channel.send('', { buttons: [btn, btn2], embed: embed });
			}
	},
};
