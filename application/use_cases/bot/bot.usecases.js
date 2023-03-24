import { Telegram } from "telegraf";
import { message } from "telegraf/filters";
import FormRepositoryMongoDB from "../../../frameworks/database/mongoDB/repositories/FormRepositoryMongoDB.js";
import util, { isCompleteData, isObject }  from "../../../utils/check.js";
import FormRepository from "../../repositories/FormRepository.js";
import getUserResponse from "../form/getUserResponse.js";
import saveRespondenDataFromForm from '../form/saveRespondenDataFromForm.js'


export default function makeBotUseCases(bot, openai) {
    let isRunning = false;
    let history = {};
    let countChat = {};
    let userHasFilled = {};
    let usedUsersToken = {}
    let userComplete = {};

    let repositoy  = FormRepository(FormRepositoryMongoDB());
    let telegram = new Telegram(process.env.BOT_TOKEN)

    const increaseUserToken = (chatId, token) => {
      if (usedUsersToken[chatId] === undefined) usedUsersToken[chatId] = 0;
      usedUsersToken[chatId] += token;
    }

    const closing = async (chatId) => {
      try {
          const completion = await openai.createChatCompletion({
              model: "gpt-3.5-turbo",
              // model: "gpt-4",
              messages: [
                // {role: "system", content: "provide special thanks for time of interview of this user and provide conclusion of history interview: " + historyUser + "in Bahasa and and get users to influence people to use this bot by clicking on the following link: http://t.me/ekspresi_interview_bot"}
                {role: "system", content: "as a good interviewer, give thanks to those who have been in the conversation. And provide the following link:  http://t.me/ekspresi_interview_bot and orders to spread and use the link in Bahasa"}
              ],
            });
            let response_content =  completion.data.choices[0].message.content; 
            let totalToken = completion.data.usage.total_tokens;
            increaseUserToken(chatId, totalToken);
          
            return response_content;
      } catch (err) {
          console.log('error from checkCompletion', err)
      }
    }

    const greeting = async (chatId, goal) => {
      const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      // model: "gpt-4",
      messages: [
        {role: "system", content: "You are helpful and smart interviewer. Say that you want to do interview for the "+goal+" and collect some data needed. Give greeting to the user in Bahasa."}
      ],
     });
      let response_content =  completion.data.choices[0].message.content;
      let totalToken = completion.data.usage.total_tokens;
      increaseUserToken(chatId, totalToken);
      history[chatId] += `${response_content} `;
      return response_content;
    }

    const toObjectJson = async (goal, fields, chatId) => {
        try {
            const completion = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                // model: "gpt-4",
                messages: [
                  //   {role: "system", content: "I need the data: "+ fields.join(', ')+". Get it from text: "+historyUser+". Give me data in JSON format. Give value as '' if it is empty. Convert time as 'HH:MM'"}
                  {role: "system", content: "I need the data: "+ fields.join(', ')+". Get it from text: "+history[chatId] +  "Give me data in JSON format. Give value as '' if it is empty"}
                ],
              });
              let response_content =  completion.data.choices[0].message.content; 
              let totalToken = completion.data.usage.total_tokens;

              increaseUserToken(chatId, totalToken);
              
              return response_content;
            } catch (err) {
                console.log('error from check Completion', err)
            }
    }
    
        const set = (goal, fields, formId) => {
          bot.on(message('text'), async (ctx) => {
            
            let msg_in = ctx.message.text;
            let chatID = ctx.message.chat.id;
            if (userHasFilled[chatID] || false) {
              return ctx.reply('user has filled this form');
            }
    
            let dataUserOnDb = await getUserResponse(repositoy, formId, chatID);
            console.log(dataUserOnDb);
            if (dataUserOnDb.length !== 0) {
              return ctx.reply('user has filled this form' + JSON.stringify(dataUserOnDb));
            }
            
            history[chatID] += ` ${msg_in}`;
            if (!(history[chatID] === '' && history[chatID] === 'undefined')) {
            }
            if (countChat[chatID] === undefined) countChat[chatID] = 0;
            countChat[chatID] += 1;
    
            
            console.log(`message in ${msg_in}`)
            console.log(`count chat ${countChat[chatID]}`)
            if (history[chatID].includes('undefined')) {
              history[chatID] = history[chatID].replace('undefined', '')
            }
    
            if (countChat[chatID] > 3) {
              let generatedObjByAi = await toObjectJson(goal, fields, chatID);
              let {isComplete, objectData: result} =  util.isCompleteData(generatedObjByAi, fields)
              if (isComplete) {
                
                let requestFormat = toRequestFormat(chatID, 'telegram', usedUsersToken[chatID], 'complete', history[chatID], result)
                // save to DB
                saveRespondenDataFromForm(repositoy, formId, requestFormat).then(r => console.log(`save databases `, r))
               
                userHasFilled[chatID] = true;
                return ctx.reply(await closing(chatID))
              }
              
            } // if count chat > 3;
    
            let msg_out = "";
            if ( history[chatID] === undefined ) {
              msg_out = await greeting(chatID, goal);
            } else {
              msg_out = await runInterview(msg_in, goal, fields, chatID);
            }
            await ctx.reply(msg_out);
    
          }) // on message
        }; // set bot
    

    const start = async (goal, fields, formId) => {
        if (isRunning) throw new Error('bot is running, mau setting ulang? please stop dulu ya...')
        console.log(goal)
        console.log(`bot ${bot}`);
        set(goal, fields, formId);
        console.log(`{goal: ${goal} and fields ${fields}}`)
        isRunning = true;
        bot.on( message('text'), (ctx) => {
          console.log(ctx);
          ctx.reply('oke from vercel')
        })
        bot.launch({
          webhook: { 
              domain: "https://backend-interview-bot.vercel.app/",
              port:8000,
              hookPath:"/api/v1/bots/handle/webhook/"
          }
      })
    };

    const stop = () => {
        bot.stop();
        isRunning = false;
    };

    

async function runInterview(txt, goal, fields, chatId)
{
  
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    // model: "gpt-4",
    messages: [
      {role: "system", content: "You are helpful and smart interviewer. You have to collect user data for  "+ goal +". Data needed: "+ fields.join(', ') +". Start interview from " + fields[0] + ". Confirm user that all data is true. Do conversation in Bahasa. The record of user's data saved in Chat History. Chat History: "+ history[chatId]},
      {role: "user", content: txt}
    ],
  });

  let totalToken = completion.data.usage.total_tokens;
  let response_content =  completion.data.choices[0].message.content;
  increaseUserToken(chatId, totalToken);
  history[chatId] += ` ${response_content}.`;
  return response_content;

}

    
    const toRequestFormat = (chatId, channel, totalToken, status, chat_history, data) => {
      let request = {};
      request.user_id = chatId;
      request.channel = 'telegram'
      request.chat_history = chat_history;
      request.status = 'complete';
      request.data = data
      request.total_token = totalToken
      request.status = status
      return request;
    }
    



    const handleWebhookUpadate = async (req, res) => {
      console.info('incoming update')
      console.log(req.body)
      let formId = "641c04778ecc6dd3ddd0ffe5"
      let {goal, fields} = await repositoy.findById("641c04778ecc6dd3ddd0ffe5");
      let from = req.body.message.from
      let chatId = req.body.message.chat.id;
      let message = req.body.message.text;
      console.log(`history${chatId}`, history[chatId])
      console.log(`message ${message}`);
      console.log(`goal ${goal}`);
      console.log(`fields ${fields}`);

      if (countChat[chatId] === undefined) countChat[chatId] = 0;
      countChat[chatId] += 1;

      // after history is enough to check is complete data;
      if (countChat[chatId] > 3) {
        let generatedObjByAi = await toObjectJson(goal, fields, chatId);
        let {isComplete, objectData: result} =  util.isCompleteData(generatedObjByAi, fields)
        if (isComplete) {
          
          let requestFormat = toRequestFormat(chatId, 'telegram', usedUsersToken[chatId], 'complete', history[chatId], result)
          // save to DB
          saveRespondenDataFromForm(repositoy, formId, requestFormat).then(r => console.log(`save databases `, r))
         
          userHasFilled[chatId] = true;
          return ctx.reply(await closing(chatId))
        }
        
      } // if count chat > 3;

      let msg_out = "";
      if ( history[chatId] === undefined ) {
        console.log('if')
        history[chatId] = message;
        msg_out = await greeting(chatId, goal);
      } else {
        console.log('else')
        history[chatId] += message;
        msg_out = await runInterview(message, goal, fields, chatId);
      }
      console.log(`sending message to user`)

      telegram.sendMessage(chatId, msg_out);

    }
      
    return {
        start,
        stop,
        handleWebhookUpadate
    }
}