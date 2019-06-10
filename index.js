require('dotenv').config()

const Discord = require('discord.js')
const client = new Discord.Client()

const SMASH_KEYWORD = "smash"

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg => {
  // if (msg.content === 'ping' && msg.author.tag !== client.user.tag) {
  //   msg.reply('Pong!')
  // }
  console.log(`Author:  ${msg.author.tag} bot: ${client.user.tag}`)
  if (msg.author.tag !== client.user.tag){
    // if(msg.content )
    msg.reply(msg.content )
  }
})

client.login(process.env.BOT_TOKEN)