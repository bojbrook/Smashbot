const smash = require('./static/quotes.json');
const random_reply= smash['reply'];
const f_reply = smash['f-reply'];
const he_ded_reply = smash['he_ded_reply']

//const catan = require('./static/catan.json');
//const CATAN_KEYWORD = "catan";

require('dotenv').config();
const { Client, RichEmbed }= require('discord.js');
const client = new Client();
const { createLogger, format, transports } = require('winston');


const SMASH_KEYWORD = "smash";
const WANNA_SMASH_KEYWORD = "wanna smash";
const SMASH_SPECIFIC_KEY = "/"
const LIST_SMASH_KEYWORD = "/list";
const ITS_TIME_KEYWORD = "its time";
const ITS_TIME1_KEYWORD = "its time!";
const HE_DED_KEYWORD = "he ded";
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

//code for Datadog dogstatsd  
var StatsD = require('hot-shots'),
c = new StatsD();


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
})

client.on('message', msg => {
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop.
  if(msg.author.bot) return;
  var content_lower_case = msg.content.toLowerCase();

  console.log(`Author:  ${msg.author.tag} bot: ${client.user.tag}`);
  var mention_everyone = msg.mentions.everyone;

  //wanna SMASH command
  if(content_lower_case === WANNA_SMASH_KEYWORD || content_lower_case === ITS_TIME_KEYWORD || content_lower_case === ITS_TIME1_KEYWORD){

    //Getting all the users in the channel
    var users = get_channel_users(msg.channel);
    //searching through users and sending the message
    for(var index = 0; index < users.length; index++){
      if (msg.author.id == users[index].id){
        console.log('skipping author');
        continue;
      }
      console.log(`Sending message to - ${users[index].username}`);
      //Getting a random message
      var message = get_random_smash_message();
      msg.channel.send(`${msg.author.username} is challenging you!!\n ${message['text']}` ,{reply: `${users[index].id}`, file: `${message['img']}`} );  
      }
    return;
  }

   //message for he ded
  if (content_lower_case.includes(HE_DED_KEYWORD)){
    var index = Math.floor(Math.random() * he_ded_reply.length);
    msg.channel.send({files:[he_ded_reply[index]['img']]})
    .catch(console.error);
    return;
  }
  
  //For an F in chat
  if(content_lower_case == "f"){
    console.log('Big f in chat');
    msg.channel.send(f_reply[0]['text'],  {files: [f_reply[0]['img']]});
    //Datadog loging 
    if (prod){
      logger.info("An F in chat occured",{author: `${msg.author.tag}`, file: `${[f_reply[0]['img']]}`, quote: `${[f_reply[0]['text']]}` });
    }else{
      logger.info("An F in chat occured",{author: `${msg.author.tag}`, file: `${[f_reply[0]['img']]}`, quote: `${[f_reply[0]['text']]}` });
      c.increment('smashbot.chat.f.count')
    }
    return;
  }

  //Checking for keywords in message
  if(content_lower_case.startsWith(SMASH_SPECIFIC_KEY)){

    //listing all of the keywords
    if (content_lower_case === LIST_SMASH_KEYWORD){
      console.log("Listing all the keys");
      var message = "Smash keys...\n";
  
      for (var i = 0; i < random_reply.length; i++){
        var line = `${i+1}: ${random_reply[i]['key']}\n`;
        message += line; 
      }
      msg.channel.send(message);
      return;
    }


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
        }else{
          logger.info(random_reply[i]['text'],{author: `${msg.author.tag}`, file: `${[random_reply[i]['img']]}` });
        }
        break;
      }
     
    }
    	return;
    }
  

  //smash command
  if(content_lower_case.includes(SMASH_KEYWORD)){
    if (mention_everyone){
      console.log("Everyone was mentioned!!")
    }
    //Getting a random message
    var message = get_random_smash_message();
    const embed = new RichEmbed()
      // Set the title of the field
      .setTitle(message['text'])
      // Set the color of the embed
      .setColor(0xFF0000)
      //set the imaage content of the embed
      .setImage(message['img']);
      // Send the embed to the same channel as the message
    msg.channel.send(embed);
    //Datadog loging 
    if (prod){
      logger.info(message.text,{author: `${msg.author.tag}`, file: `${[message.img]}` });
    }else{
      logger.info(message.text,{author: `${msg.author.tag}`, file: `${[message.img]}` });
    }      
	  return;
  }


})

client.login(process.env.BOT_TOKEN)


//Returns  all the users in a particular channel that aren't bots 
function get_channel_users(channel){
  var channel_users = channel.members.array();
  var users = [];
  for (var index = 0; index < channel_users.length; index++){
    //Not adding bots to users
    if(channel_users[index].user.bot)
      continue;
    var id = channel_users[index].user.id;
    var username = channel_users[index].user.username;
    var item = {id: id, username: username}
    // console.log(channel_users[index].user.username)
    users.push(item);
  }
  return users;
}

//Returns a random smash message
function get_random_smash_message(){
   //Getting a random message
   var index = Math.floor(Math.random() * random_reply.length);
   var message = {
     "text":  random_reply[index]['text'],
     "img":   random_reply[index]['img']  
   }
   return message;
}
