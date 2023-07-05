var moment = require('moment');
var con = require('../database');
var config = require('../config.json');
const fetch = require("node-fetch");
const Discord = require('discord.js')
const axios = require('axios').default;

module.exports = {
    name: 'stickymessage',
    description: 'Tilføj en stickymessage til en kanal',
    async execute(message, args) {
        if (message.guild.id == '661361742282096650') { // DK FiveM Guild
            const channel = message.channel;
            const content = args.join(' ');
            message.delete();
            channel.send({content: content}).then(msg => {
                global.stickyMessages.set(channel.id, {channel: channel, content: content, message: msg})
            })
        }
    }
};