import dotenv from 'dotenv'
import axios from 'axios';

dotenv.config()

let url = `https://discord.com/api/v8/applications/${process.env.APP_ID}/guilds/${process.env.GUILD_ID}/commands`

const headers = {
  "Authorization": `Bot ${process.env.BOT_TOKEN}`,
  "Content-Type": "application/json"
}

let command_data = {
  "name": "foo",
  "type": 1,
  "description": "replies with bar ;/",
}

const SMASH_COMMAND = {
    "name": "smash",
    "type": 1,
    "description": "Invite everyone to play smash",
}

axios.post(url, JSON.stringify(command_data), {
  headers: headers,
})

axios.post(url, JSON.stringify(SMASH_COMMAND), {
  headers: headers,
})