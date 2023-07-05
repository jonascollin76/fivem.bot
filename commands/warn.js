const Discord = require("discord.js");
var con = require('../database');

function makeid(length) {
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result.push(characters.charAt(Math.floor(Math.random() *
        charactersLength)));
    }
   return result.join('');
}

module.exports = {
	name: 'warn',
	description: 'Warner en person',
	async execute(message, args, member) {

        let id = makeid(9)

        function viewwarns(brugerid, message){
            con.query(`SELECT warns.*, DATE_FORMAT(warns.time, '%d/%m-%Y %H:%i') AS 'timestamp' FROM warns WHERE userid = ?`, [brugerid], (err, row) => {
                if (err) throw err;
                if(row[0]) {



                    const embed = new Discord.MessageEmbed();
          					embed.setTitle("Advarsler for " + bruger.user.tag)

                    for (var i = 0; i < row.length; i++) {
                      embed.addField(row[i]['reason'], "Givet af: " + row[i]['author'] + " | Dato: " + row[i]['timestamp'] + " | Warn ID: " + row[i]['nr'] + "")
                    }

          					embed.setFooter('FiveM.dk - Bragt til live af Lasse Mejdahl Christensen');
                    message.channel.send({embeds: [embed]});
                } else {
                    message.channel.send("Ingen warns på denne person");
                }
            });
        }

        function givewarn(brugerid, author, reason) {
            con.query(`SELECT * FROM warns WHERE userid = ?`, [brugerid], (err, row) => {
                if (err) throw err;
                    con.query(`SELECT * FROM warns WHERE userid = ?`, [brugerid], (err1, row1) => {
                        if (err1) throw err;
                            con.query(`INSERT INTO warns (userid, reason, author, authorid, nr, ban) VALUES (?,?,?,?,?, 0)`,
                            [brugerid, reason, warner, warnerid, id])
                    });
            });
        }

        function ban(brugerid, author, banreason) {
            con.query(`SELECT * FROM warns WHERE userid = ?`, [brugerid], (err, row) => {
                if (err) throw err;
                    con.query(`SELECT * FROM warns WHERE userid = ?`, [brugerid], (err1, row1) => {
                        if (err1) throw err;
                            con.query(`INSERT INTO warns (userid, reason, author, authorid, nr, ban) VALUES (?,?,?,?,?, 1)`,
                            [brugerid, banreason, warner, warnerid, id])
                            
                    });
            });
        }

         function removewarn(nr) {
            con.query(`SELECT * FROM warns WHERE nr = ?`, [nr], (err, row) => {
                if (err) throw err;
                if(row[0]) {
                    con.query(`DELETE FROM warns WHERE nr = ?`, [nr])
                    status = "Advarsel blev fjernet"
                    log(status, row[0].userid, row[0].reason, message.author.username, row[0].nr)
                    let remembed = new Discord.MessageEmbed()
                    .setColor('#00ff00')
                    .setTitle(`Warning fjernet | ${message.guild.name}`)
                    .setDescription(`**Du har fået fjernet følgende warning!**\n${row[0].reason}\n\n**Din warning blev fjernet af:** ${message.author.username}\n\n**Warn ID:** ${row[0].nr}`)
                    .setFooter(`Advarselssystem af Ezague#0020 | FiveM.dk | Bragt til live af Lasse Mejdahl Christensen | lassemc.dk`)
                    let warnmedlem = '' + row[0].userid + '';
                    message.guild.members.fetch(warnmedlem, false).then((user) => {
                       user.send({embeds: [remembed]});
                      });
                } else {
                    message.channel.send(`Nummeret ${nr} findes ikke.`);
                }
            });
        }

        function log(status, userid, reason, author, nr) {
          const logChannel = message.guild.channels.cache.find(channel => channel.name === "warns")
  				if (logChannel) {
  					const embed = new Discord.MessageEmbed();
  					embed.setTitle(status)
  					embed.addField("Bruger", "<@"+userid+">", true)
  					embed.addField("Grund", reason, true)
  					embed.addField("Tildelt af", author, true)
  					embed.addField("Nr", nr, true)
  					embed.setFooter('FiveM.dk - Bragt til live af Lasse Mejdahl Christensen');
  					logChannel.send({embeds: [embed]});
  				}

        }


        if (!message.guild.id == "661361742282096650") return message.channel.send("Det må du ikke det der")
        if(!message.member.roles.cache.some(r => r.name === "Moderator") && !message.member.roles.cache.some(r => r.name === "Manager") && !message.member.roles.cache.some(r => r.name === "Trainee") ) return message.channel.send("Du har ikke adgang til det her");
        const warner = message.author.username;
        const warnerid = message.author.id;
        const bruger = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let brugerid = null;
        if (bruger) {
            brugerid = bruger.id;
        };

        switch(args[0]){
            case "se":
                viewwarns(brugerid, message)
                break;
            case "giv":
                const reason = args.splice(2).join(" ");
                if (!reason) return;
                givewarn(brugerid, warner, reason)
                status = "Advarsel givet"
                log(status, brugerid, reason, warner, id)
                let embed = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle(`Warning | ${message.guild.name}`)
                .setDescription(`**Du har fået en advarsel med følgende grundlag:**\n${reason}\n\n**Du blev warned af:** ${warner}\n**Warn ID:** ${id}`)
                .setFooter(`Advarselssystem af Ezague#0020 | FiveM.dk | Bragt til live af Lasse Mejdahl Christensen | lassemc.dk`)
                bruger.send({embeds: [embed]});
                break;
            case "ban":
                const banreason = args.splice(2).join(" ");
                if (!banreason) return;
                ban(brugerid, warner, banreason)
                status = "Ban givet"
                log(status, brugerid, banreason, warner, id)
                let banembed = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle(`Ban | ${message.guild.name}`)
                .setDescription(`**Du er blevet bannet med følgende grundlag:**\n${banreason}\n\n**Du blev warned af:** ${warner}\n**Warn ID:** ${id}`)
                .setFooter(`Advarselssystem af Ezague#0020 | FiveM.dk | Bragt til live af Lasse Mejdahl Christensen | lassemc.dk`)
                bruger.send({embeds: [banembed]});
                bruger.ban({banreason})
                break;
            case "fjern":
                removewarn(args[1])
                break;
            default:
                break;
        }

        setTimeout(() => message.delete(), 500);
    },
};
