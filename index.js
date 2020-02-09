const smash = require('./static/quotes.json');
const random_reply= smash['reply'];
const f_reply = smash['f-reply'];

//const catan = require('./static/catan.json');
//const CATAN_KEYWORD = "catan";

require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const { createLogger, format, transports } = require('winston');


const SMASH_KEYWORD = "smash";
const SMASH_SPECIFIC_KEY = "smash /"
const LIST_SMASH_KEYWORD = "/list";
var prod;
var LOG_FILE;

//Code for logging in production:
if (process.env.ENV == "PROD"){
 console.log("Running in Production");
 prod = true;
 LOG_FILE = "/var/log/smashbot/bot.log";
}else{
 console.log("Running in Development");
 prod = false;
 LOG_FILE = "D:\\Programming\\DiscordBots\\Smashbot\\bot.log"
}

//setting up the loger
const logger = createLogger({
    level: 'info',
    exitOnError: false,
    format: format.json(),
    transports: [
      new transports.File({ filename: LOG_FILE }),
    ],
  });
module.exports = logger;
 



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
    msg.channel.send(f_reply[0]['text'],  {files: [f_reply[0]['img']]});
    //Datadog loging 
    if (prod){
      logger.info("An F in chat occured",{author: `${msg.author.tag}`, file: `${[f_reply[0]['img']]}`, quote: `${[smash[0]['text']]}` });
    }
    return;
  }

  //Checking for keywords in message
  if(content_lower_case.startsWith(SMASH_SPECIFIC_KEY)){
    index_of_backslash = content_lower_case.indexOf("/");
    var keyword = content_lower_case.substr(index_of_backslash);
    console.log(keyword);

    //Searching for specific saying
    for (var i= 0; i < random_reply.length; i++){
      if (random_reply[i]['key'] == keyword){
        msg.channel.send(random_reply[i]['text'], {files: [random_reply[i]['img']]});
         //Datadog loging 
        if (prod){
          logger.info(random_reply[i]['text'],{author: `${msg.author.tag}`, file: `${[random_reply[i]['img']]}` });
        }
        break;
      }
     
    }
    	return;
    }
  

  //smash command
  if(content_lower_case.includes(SMASH_KEYWORD)){
    	var index = Math.floor(Math.random() * random_reply.length);
      msg.channel.send(random_reply[index]['text'], {files: [random_reply[index]['img']]});
      //Datadog loging 
      if (prod){
        logger.info(random_reply[index]['text'],{author: `${msg.author.tag}`, file: `${[random_reply[index]['img']]}` });
      }	      
	return;
  }

  //list all the keywords
  if (content_lower_case.includes(LIST_SMASH_KEYWORD)){
  	console.log("Listing all the possibilites");
    console.log(`Length: ${random_reply}`);
    var message = "Smash keys...\n";

    for (var i = 0; i < random_reply.length; i++){
      var line = `${i+1}: ${random_reply[i]['key']}\n`;
      message += line; 
    }
    msg.channel.send(message);
    return;
  }

  /*
  else if(content_lower_case.includes(CATAN_KEYWORD)){
    msg.channel.send(catan[0]['text'], {files: [catan[0]['img']]})
  }
  */

})

client.login(process.env.BOT_TOKEN)
