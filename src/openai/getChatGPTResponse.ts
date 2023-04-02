import dotenv from 'dotenv';
import { OpenAIApi, Configuration } from 'openai';

dotenv.config();

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

export default async function getChatGPTResponse(
  messages: {
    content: string;
    role: 'user' | 'system';
  }[]
) {
  // Example code:
  const chatCompletion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages,
  });

  return chatCompletion.data.choices[0].message.content;
}
