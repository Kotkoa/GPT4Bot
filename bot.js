const { DISCORD_API_KEY } = require('./config.json');

const { ask } = require('./ai.js');
const { Client, Events, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.MessageCreate, async (message) => {
  // Ignore messages from bots
  if (message.author.bot) return;

  // Respond to the message "hi" with "Hello!"
  if (message.content.toLowerCase() === 'hi') {
    await message.channel.send('Hello!');
  }
});

client.on(Events.MessageCreate, async (message) => {
  if (message.content.substring(0, 1) === '!') {
    const prompt = message.content.substring(1); //remove the exclamation mark from the message
    const answer = await ask(prompt); //prompt GPT-3
    client.channels.fetch(message.channelId).then((channel) => channel.send(answer));
  }
});

client.login(DISCORD_API_KEY);
