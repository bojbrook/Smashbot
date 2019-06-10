require('dotenv').config();
const fs = require('fs');
const taunts = require('./quotes');
const Discord = require('discord.js');
const client = new Discord.Client();

fs.readdir('./events/', (err, files) => {});

fs.readdir('./events/', (err, files) => {
  files.forEach(file => {
    const eventHandler = require(`./events/${file}`);
  });
});


const SMASH_KEYWORD = "smash";

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(taunts);
})

client.on('message', msg => {
  // if (msg.content === 'ping' && msg.author.tag !== client.user.tag) {
  //   msg.reply('Pong!')
  // }
  console.log(`Author:  ${msg.author.tag} bot: ${client.user.tag}`)
  if (msg.author.tag !== client.user.tag){
    var content_lower_case = msg.content.toLowerCase()
    if(content_lower_case.includes(SMASH_KEYWORD))
      var index = Math.floor(Math.random() * taunts.length);
      console.log(`index: ${index} message: ${taunts[index]}`);
      msg.reply(taunts[index]);
  }
})

client.login(process.env.BOT_TOKEN)