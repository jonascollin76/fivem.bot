const Discord = require('discord.js');

module.exports = {
	name: 'botsend',
	description: 'Sender en besked til en bruger',
	async execute(message, args) {


		message.delete();
        if (!message.guild.id == "661361742282096650") return message.channel.send("Det må du ikke det der")

		if(message.member.roles.cache.some(r => r.name === "Moderator") || message.member.roles.cache.some(r => r.name === "Manager") ) {

            let bruger = message.mentions.members.first() || message.guild.members.get(args[0]);
            let besked = args.splice(1).join(" ");

            if(!bruger) return message.channel.send("Stop at lave systembrud på den der måde").then(msg => (msg.delete({ timeout: 5000 })));

            if(!besked) return message.channel.send("Du skal lige huske beskeden du vil sende igås?").then(msg => (msg.delete({ timeout: 5000 })));

            let embed = new Discord.MessageEmbed()
            embed.setDescription(`Besked fra ${message.guild.name}`)
            embed.setColor("#00ff00")
            embed.addField(`Besked:`, `**${besked}**`)
            embed.setFooter(`Mvh\nDK FiveM\nHjemmeside: http://fivem.dk/\nE-Mail: kontakt@fivem.dk`);

							bruger.send({ embeds: [embed] }).catch(console.log("Privat besked måske sendt."))

            let logembed = new Discord.MessageEmbed()
            logembed.setDescription(`${message.member} skrev en besked til ${bruger}`)
            logembed.addField(`Besked:`, `${besked}`);



                const logChannel = message.guild.channels.cache.find(channel => channel.name === "logs")
				if (!logChannel) return message.channel.send("Kan ikke finde log kanalen");
				logChannel.send({embeds: [logembed]});

        }
        else {
            message.channel.send("Du har ikke permission til at rode med det her :)")
        }
    }
};
