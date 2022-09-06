import 'dotenv/config';
import express from 'express';
import {
  InteractionType,
  InteractionResponseType,
  InteractionResponseFlags,
  MessageComponentTypes,
  ButtonStyleTypes,
} from 'discord-interactions';
import { VerifyDiscordRequest, DiscordRequest } from './utils.js';

// Create an express app
const app = express();
// Get port, or default to 3000
const PORT = process.env.PORT || 3000;
// Parse request body and verifies incoming requests using discord-interactions package
app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));

app.post('/interactions', async function (req, res) {
  console.log(req.body);
  // Interaction type and data
  const { type, id, data } = req.body;  
  /**
   * Handle verification requests
   */
   if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }



  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;
    // "test" guild command
    if (name === 'foo') {
      // Send a message into the channel where command was triggered from
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          // Fetches a random emoji to send from a helper function
          content: 'Bar:)',
        },
      });
    }

    // "test" guild command
    if (name === 'smash') {
      // Send a message into the channel where command was triggered from
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          // Fetches a random emoji to send from a helper function
          content: `We about to smash @everyone`,
        },
      });
    }
  }
  
})

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});