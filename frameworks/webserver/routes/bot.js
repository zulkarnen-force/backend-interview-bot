import makeBotController from "../../../adapters/controllers/bot.controller.js";
import bot from "../../bot/instance.js";
import openai from "../../openai/instance.js";
import {message} from 'telegraf/filters'
export default function participantRouter(express) {
    const router = express.Router();

    const controller = makeBotController(
        bot,
        openai,
        message
    );
  
    router
      .route('/settings')
      .post(
        controller.start
      );

      router
      .route('/stop')
      .get(
        controller.stop
      );
  
    
    return router;
  }