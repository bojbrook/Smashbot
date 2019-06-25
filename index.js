require('dotenv').config();

const smash = require('./static/quotes.json');
const catan = require('./static/catan.json');

const Discord = require('discord.js');
const client = new Discord.Client();


const SMASH_KEYWORD = "smash";
const CATAN_KEYWORD = "catan";

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
})

client.on('message', msg => {
  
    // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop.
  if(msg.author.bot) return;
  var content_lower_case = msg.content.toLowerCase();

  console.log(`Author:  ${msg.author.tag} bot: ${client.user.tag}`);
  // console.log("Content: " + content_lower_case);
  
  //smash command
  if(content_lower_case.includes(SMASH_KEYWORD)){
    var index = Math.floor(Math.random() * smash.length);
    msg.channel.send(smash[index]['text'], {files: [smash[index]['img']]})
  }
  else if(content_lower_case.includes(CATAN_KEYWORD)){
    msg.channel.send(catan[0]['text'], {files: [catan[0]['img']]})
  }

})


client.login(process.env.BOT_TOKEN)
