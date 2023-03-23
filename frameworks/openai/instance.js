import { Configuration, OpenAIApi } from "openai";
console.log("OPENAI_API_KEY ", process.env.OPENAI_API_KEY)
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  
  const openai = new OpenAIApi(configuration);

  export default openai;