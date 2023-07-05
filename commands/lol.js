var moment = require('moment');
var con = require('../database');
var config = require('../config.json');
const fetch = require("node-fetch");
const Discord = require('discord.js')
const axios = require('axios').default;


module.exports = {
	name: 'test12',
	description: 'Top 10.',
	async execute(message, args) {


		con.query("SELECT author from tickets WHERE id = 791", function (err, result, fields) {
			console.log(result);
			
		})








}

};
