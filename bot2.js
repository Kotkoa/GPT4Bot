const { Client, Intents } = require('discord.js');
const OpenAI = require('openai');
const fetch = require('node-fetch');

const DISCORD_KEY = 'MTA4ODM3NzczMDcxNTg5Mzc3MA.GRG1b-.h6IA5c1YvXxVSSI1aWk3XQ5GMgvgPgH13Bv1q0';
const OPENAI_KEY = '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';

OpenAI.apiKey = OPENAI_API_KEY;

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.once('ready', () => {
  console.log(`${client.user.tag} is connected to Discord!`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const inputContent = [message.content];

  if (message.attachments.size > 0) {
    for (const attachment of message.attachments.values()) {
      const imageBuffer = await (await fetch(attachment.url)).buffer();
      inputContent.push({ image: imageBuffer });
    }
  }

  const response = await OpenAI.ChatCompletion.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: inputContent }],
  });

  const assistantResponse = response.choices[0].message.content;
  await message.channel.send(assistantResponse);
});

client.login(process.env.DISCORD_API_KEYn);
