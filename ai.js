// const axios = require('axios');
const { OPENAI_API_KEY } = require('./config.json');
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function ask(prompt) {
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const answer = response.data.choices[0].message.content;
    console.log(answer);

    if (!answer || answer.trim() === '') {
      return 'I could not generate a response. Please try again.';
    }

    return answer;
  } catch (error) {
    console.error('Error:', error);
    return 'An error occurred. Please try again.';
  }
}

module.exports = {
  ask,
};
