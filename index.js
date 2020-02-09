const smash = require('./static/quotes.json');
const catan = require('./static/catan.json');

require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const { createLogger, format, transports } = require('winston');


const SMASH_KEYWORD = "smash";
const CATAN_KEYWORD = "catan";
const LIST_SMASH_KEYWORD = "\list";

var PROD = true;
//Code for logging in production
if (process.env.ENV == "PROD"){
  PROD = true;
  console.log("Running in production");
  const logger = createLogger({
    level: 'info',
    exitOnError: false,
    format: format.json(),
    transports: [
      new transports.File({ filename: "/var/log/smashbot/bot.log" }),
    ],
  });
}else{
  console.log("Running in Development");
  PROD = false;
}


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
})

client.on('message', msg => {
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop.
  if(msg.author.bot) return;
  var content_lower_case = msg.content.toLowerCase();

  console.log(`Author:  ${msg.author.tag} bot: ${client.user.tag}`);

  //For an F in chat
  if(content_lower_case == "f"){
    console.log('Big f in chat');
    msg.channel.send(smash[12]['text'],  {files: [smash[12]['img']]});
    if (process.env.ENV == "PROD"){
//	logger.info("An F in chat occured",{author: `${msg.author.tag}`, file: `${[smash[12]['img']]}`, quote: `${[smash[12]['text']]}` });
	console.log("I'm very dissapointed");
    }
  }

  //smash command
  if(content_lower_case.includes(SMASH_KEYWORD)){
    	var index = Math.floor(Math.random() * smash.length);
      msg.channel.send(smash[index]['text'], {files: [smash[index]['img']]});
      //Datadog loging 
      if (process.env.ENV == "PROD"){
    	 // logger.info(smash[index]['text'],{author: `${msg.author.tag}`, file: `${[smash[index]['img']]}` });
      	console.log("I'm very dissapointed");
      }

  }
  if (content_lower_case.includes(LIST_SMASH_KEYWORD)){
  	console.log("Listing all the possibilites");
    console.log(`Length: ${smash.length}`);
    var i;
    for (i = 0; i < smash.length; i++){
      msg.channel.send(smash[i]['text'], {files: [smash[i]['img']]})
	}
  }
  else if(content_lower_case.includes(CATAN_KEYWORD)){
    msg.channel.send(catan[0]['text'], {files: [catan[0]['img']]})
  }

})

client.login(process.env.BOT_TOKEN)
