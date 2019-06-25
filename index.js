require('dotenv').config();
const taunts = require('./quotes');

const taunt = require('./static/quotes.json');

const Discord = require('discord.js');
const client = new Discord.Client();


const SMASH_KEYWORD = "smash";
const PICTURE = "!p";

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(taunt);
  console.log(client.users.keys().next());
  var map = client.users.keys();
  var tp = map.next()
  console.log(tp)

  for(var index = 0; index < client.users.keys().length; index++){
    console.log(`Doing this for loop: ${client.users.keys()[index]}`)
  }

})

client.on('message', msg => {
  
    // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop.
  if(msg.author.bot) return;
  var content_lower_case = msg.content.toLowerCase();
  
  // // insult command
  // if (content_lower_case[0] ==='!' && content_lower_case.includes('insult')){
  //   console.log("got to this command");
  //   if(msg.isMemberMentioned){
  //     console.log(`User was mentioned`)
  //   }else{
  //     console.log('no user was mentioned')
  //   }
  // }

  console.log(`Author:  ${msg.author.tag} bot: ${client.user.tag}`);
  console.log("Content: " + content_lower_case);
  
  //smash command
  if(content_lower_case.includes(SMASH_KEYWORD)){
    console.log("I'm just here for the pictures")
    var index = Math.floor(Math.random() * taunt.length);
    msg.channel.send(taunt[index]['text'], {files: [taunt[index]['img']]})
  }

})


client.login(process.env.BOT_TOKEN)