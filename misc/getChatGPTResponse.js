// Get root of project
const path = require('path');
const root = path.resolve(__dirname, '..');
// Load environment variables from .env file based on root
require('dotenv').config({ path: path.join(root, '.env') });
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Async function to determine the bot's response based on the list of messages
async function getChatGPTResponse(messages) {
  // Example code:
  const chatCompletion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages
  });

  return chatCompletion.data.choices[0].message.content;
}

// Export
module.exports = getChatGPTResponse;
