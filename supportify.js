const commando = require('discord.js-commando');
const client = new commando.Client;
const config = require("./config.json");
const Sequelize = require('sequelize');
const fs = require("fs");
const embed = require('discord-embed-maker');






const prefix = config.prefix;

const sequelize = new Sequelize('tickets', 'supportify', 'support', {
	host: 'MSI',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'tickets.sqlite',
});
const ticketinfo = sequelize.define('ticketinfo', {
  ticketid: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
ticketcontext: Sequelize.STRING,
});
client.on('ready', () => {

    console.log('I am ready master!'); //how you know it is on

    client.user.setPresence({
        game: {
            name: 'Writing Support Tickets',
            type: 0
        }
    });
		ticketinfo.sync();
    });
		

client.registry.registerGroup('support', 'Support');

client.registry.registerDefaults();

client.registry.registerCommandsIn(__dirname + "/commands");

client.login(config.token);
