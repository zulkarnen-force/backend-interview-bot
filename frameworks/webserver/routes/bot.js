import makeBotController from "../../../adapters/controllers/bot.controller.js";
import bot from "../../bot/instance.js";
import openai from "../../openai/instance.js";
import FormRepository from "../../../application/repositories/formRepository.js";
import FormRepositoryMongoDB from "../../database/mongoDB/repositories/formRepositoryMongoDB.js";
import { message } from "telegraf/filters";

export default function BotRouter(express) {
    const router = express.Router();

    const controller = makeBotController(
        bot,
        openai,
        message,
        FormRepository, FormRepositoryMongoDB
    );
  
    router
      .route('/start/forms/:id')
      .get(
        controller.start
      );

      router
      .route('/stop')
      .get(
        controller.stop
      );
  
    
    return router;
  }