const { Client, Intents, Collection } = require('discord.js');
const fetch = require("node-fetch");
var fs = require('fs');
var con = require('./database');
var api = require('./api');
const client = new Client({intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_BANS', 'GUILD_EMOJIS_AND_STICKERS', 'GUILD_INTEGRATIONS', 'GUILD_WEBHOOKS', 'GUILD_INVITES', 'GUILD_VOICE_STATES', 'GUILD_PRESENCES', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILD_MESSAGE_TYPING', 'DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS', 'DIRECT_MESSAGE_TYPING']});
const config = require("./config.json");
var events = require('./handlers/events')(client);
var commands = require('./handlers/commands')(client);

const guildInvites = new Map();
global.stickyMessages = new Map();

process.on('unhandledRejection', error => {
    console.log('Test error:', error);
});

client.on('ready', () => {
	client.events.get('ready').execute(client)
	// client.guilds.cache.forEach(guild => {
	// 	guild.invites.fetch()
	// 	.then(invites => guildInvites.set(guild.id, invites))
	// 	.catch(err => console.log(err));
	// 	// console.log(`${guild.name} - ${guild.memberCount}`)
	// });


	client.guilds.cache.forEach((guild => {
		if ((guild.channels.cache.find(c => c.name.toLowerCase() === "ghostping"))) {
			console.log(`${guild.name} bruger ghostping`)
		}
	}));



	test = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)
	console.log(test)
});


// client.on("message", async message => {
// 	client.events.get('message').execute(message)
// 	client.events.get('log').execute(message)
// })

client.on('messageCreate', (message, member) => {
  if (message.content == "Hej <@777553366058008586>") {
		// message.delete().catch(O_o=>{});
		message.channel.send("Goddag!")
	}


	client.events.get('message').execute(message, client, commands)
	client.events.get('log').execute(message, member)});

// client.on('messageReactionAdd', (reaction, user) => {
// 	client.events.get('createTicket').execute(reaction, user)
// });

client.on('interactionCreate', async (button) => {
	if (button.isSelectMenu()) {
		button.deferUpdate();
	  client.events.get('menus').execute(button, client)
	}
	if (button.isButton()) {
		button.deferUpdate();
	  client.events.get('buttons').execute(button, client)
	}
});


// client.on('guildMemberAdd', member => {
// 	client.events.get('guildMemberAdd').execute(member, client)
// })



// client.on('guildMemberAdd', async member => {
// 		const cachedInvites = guildInvites.get(member.guild.id);
// 		const newInvites = await member.guild.fetchInvites();
// 		guildInvites.set(member.guild.id, newInvites);
// 		try {
// 				const usedInvite = newInvites.find(inv => cachedInvites.get(inv.code).uses < inv.uses);
//
// 				const logChannel = member.guild.channels.cache.find(channel => channel.name === "invites")
// 				if(logChannel) {
// 					if (usedInvite) {
// 						logChannel.send(`<@${member.user.id}> joinede **${member.guild.name}!** <@${member.user.id}> blev inviteret af ${usedInvite.inviter.tag}, (${usedInvite.inviter.tag} har hele **${usedInvite.uses}** invites)`)
// 					}
// 					else {
// 						logChannel.send(`<@${member.user.tag}> joinede **${member.guild.name}!**`)
// 					}
// 				}
//
// 		}
// 		catch(err) {
// 				// console.log(err);
// 		}
// });



client.login(config.token)
