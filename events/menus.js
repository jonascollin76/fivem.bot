
var con = require('../database');
const config = require("../config.json");



module.exports = {
	name: 'menus',
	async execute(menu, client) {
		menu.id = menu.values[0]
		if (menu.id === 'dev') {
		 	menu.channel.send(`Du har valgt rollen **Verified Udvikler**. Vent venligst.`);




			const kenya = await menu.guild.members.fetch('258363717584945162').catch(console.error);
			const willy = await menu.guild.members.fetch('415548975677046795').catch(console.error);

			try {
				await menu.channel.permissionOverwrites.edit(kenya.id, {
					SEND_MESSAGES: true,
					VIEW_CHANNEL: true,
					ATTACH_FILES: true
				})

				await menu.channel.permissionOverwrites.edit(willy.id, {
					SEND_MESSAGES: true,
					VIEW_CHANNEL: true,
					ATTACH_FILES: true
				})

			} catch (e) {
				
			}



		}
		if (menu.id === 'grafik') {
		 	menu.channel.send(`Du har valgt rollen **Verified Grafiker/Skinner**. Vent venligst.`);
		}
		if (menu.id === '3ddev') {
		 	menu.channel.send(`Du har valgt rollen **Verified 3D Udvikler**. Vent venligst.`);
		}
		if (menu.id === 'botdev') {
		 	menu.channel.send(`Du har valgt rollen **Verified Bot Udvikler**. Vent venligst.`);
		}



	},
};
