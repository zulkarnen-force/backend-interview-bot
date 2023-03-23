import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import config from "../../../config/config.js";
import makeBot from "../../../frameworks/bot/instance.js";

export default function start (bot, goal, fields, formId) {

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

    bot.launch()


  }; // set bot


let bot =  new Telegraf('6150107976:AAEha3FUSQFDDdNpkUH4JMBIiy3rqzvHzYA');

start(bot, 'test', ['satu'], 'asd')