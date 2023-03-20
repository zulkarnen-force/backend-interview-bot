import { message } from "telegraf/filters";
import FormRepositoryMongoDB from "../../../frameworks/database/mongoDB/repositories/FormRepositoryMongoDB.js";
import util, { isCompleteData, isObject }  from "../../../utils/check.js";
import FormRepository from "../../repositories/formRepository.js";
import getUserResponse from "../form/getUserResponse.js";


export default function makeBotUseCases(bot, openai) {
    let isRunning = false;
    let history = {};
    let countChat = {};
    let userHasFilled = {};

    const repositoy  = FormRepository(FormRepositoryMongoDB());




    const toObjectJson = async (goal, fields, historyUser) => {
        try {
            const completion = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [
                  //   {role: "system", content: "I need the data: "+ fields.join(', ')+". Get it from text: "+historyUser+". Give me data in JSON format. Give value as '' if it is empty. Convert time as 'HH:MM'"}
                  {role: "system", content: "I need the data: "+ fields.join(', ')+". Get it from text: "+historyUser+  "Give me data in JSON format. Give value as '' if it is empty"}
                ],
              });
              let response_content =  completion.data.choices[0].message.content;  
            
              return response_content;
            } catch (err) {
                console.log('error from check Completion', err)
            }
        }
    

    const start = (goal, fields, formId) => {
        if (isRunning) throw new Error('bot is running, mau setting ulang? please stop dulu ya...')
        console.log(goal)
        set(goal, fields, formId);
        bot.launch();
        console.log(`{goal: ${goal} and fields ${fields}}`)
        isRunning = true;
    };
    const stop = () => {
        bot.stop;
        isRunning = false;
    };

    async function greeting(chatID, goal)
{
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {role: "system", content: "You are helpful and smart interviewer. Say that you want to do interview for the "+goal+" and collect some data needed. Give greeting to the user in Bahasa."}
    ],
  });
  let response_content =  completion.data.choices[0].message.content;
  history[chatID] += `${response_content} `;
  return response_content;
}

async function runInterview(txt, goal, fields, chatId)
{
  
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {role: "system", content: "You are helpful and smart interviewer. You have to collect user data for  "+ goal +". Data needed: "+ fields.join(', ') +". Start interview from " + fields[0] + ". Confirm user that all data is true. Do conversation in Bahasa. The record of user's data saved in Chat History. Chat History: "+ history[chatId]},
      {role: "user", content: txt}
    ],
  });
  let response_content =  completion.data.choices[0].message.content;
  history[chatId] += ` ${response_content}.`;
  return response_content;
}

async function closing(historyUser)
{
    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
              {role: "system", content: "provide special thanks for time of interview of this user and provide conclusion of history interview: " + historyUser + "in Bahasa"}
            ],
          });
          let response_content =  completion.data.choices[0].message.content;  
        
          return response_content;
    } catch (err) {
        console.log('error from checkCompletion', err)
    }
 
}
      const checkComplete  = async (goal, fields, historyUser) =>  {
        let jsonResultFromAi = await checkCompletion(goal, fields, historyUser);
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
    
    let userComplete = {};

      const set = (goal, fields, formId) => {
      bot.on(message('text'), async (ctx) => {
        
        let msg_in = ctx.message.text;
        let chatID = ctx.message.chat.id;
        if (userHasFilled[chatID] || false) {
          return ctx.reply('user has filled this form');
        }

        // let dataUserOnDb = await getUserResponse(repositoy, formId, chatID);
        // if (dataUserOnDb) {
        //   return ctx.reply('user has filled this form' + JSON.stringify(dataUserOnDb));
        // }
        
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
          let generatedObjByAi = await toObjectJson(goal, fields, history[chatID]);
          let {isComplete, objectData: result} =  util.isCompleteData(generatedObjByAi, fields)
          if (isComplete) {
            
            console.log(toRequestFormat(chatID, 'telegram', countChat[chatID], 'complete', history[chatID], result))
            // save to DB
           
            userHasFilled[chatID] = true;
            return ctx.reply(await closing(history[chatID]))
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

        
    //     if (countChat[chatID] > 3) {
    //         let resultFromAI = await checkCompletion(goal, fields, history[chatID])
    //         let request = {}
    //         console.log('result from ai', resultFromAI);
    //       if (isCompleteData(resultFromAI, fields)) {
    //         try {
    //             request.user_id = chatID;
    //             request.channel = 'telegram'
    //             request.chat_history = history[chatID];
    //             request.status = 'complete';
    //             request.data = JSON.parse(resultFromAI);
    //             let FORM_ID = "6416df3f8e46204e60f35800"
    //             let repositoryRequest = await repositoy.saveNewRespondenDataFromForm(FORM_ID, request)
    //             console.log(repositoryRequest)
    //             await ctx.reply('oke, berhasil disimpan')
    //         } catch (e) {
    //           console.log('error ', e)
    //         }
    //       }
    //     }

    //     let msg_out = "";
    //     if(history[chatID] === undefined)
    //     {
    //       msg_out = await greeting(chatID, goal);
    //     } else{
    //       msg_out = await runInterview(msg_in, goal, fields, chatID);
    //     }
    //     await ctx.reply(msg_out);
        
    //   });
    // }

    return {
        start,
        stop
    }
}