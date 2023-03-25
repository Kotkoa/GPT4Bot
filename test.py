import discord
import openai

DISCORD_TOKEN  = "MTA4ODM3NzczMDcxNTg5Mzc3MA.GRG1b-.h6IA5c1YvXxVSSI1aWk3XQ5GMgvgPgH13Bv1q0"
OPENAI_API_KEY = "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"

openai.api_key = OPENAI_API_KEY

ivents = discord.Intents.default()
ivents.members = True

class ChatBot (discord.Client) :
  async def on_ready(self):
    print(f'{self.user} is connected to Discord!')

async def on_message(self, message):
  if message.author == self.user:
    return

  input_content = [message.content]

  if message.attachments:
    for attachment in message.attachments:
      image_bytes = await attachment.read()
      input_content.append({"image": image_bytes})
  
  response = openai.ChatCompletion.create(
    model="gpt-4",
    messages=[{"role": "user", "content": input_content}]
  )

    assistant_response = response['choices'][0]['message']['content'] 
    await message.channel.send(assistant_response)

client = ChatBot()
client.run(DISCORD_TOKEN)
