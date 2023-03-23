import makeBotController from "../../../adapters/controllers/bot.controller.js";
import bot from "../../bot/instance.js";
import openai from "../../openai/instance.js";
import FormRepository from "../../../application/repositories/FormRepository.js";
import FormRepositoryMongoDB from "../../database/mongoDB/repositories/FormRepositoryMongoDB.js";
import { message } from "telegraf/filters";
import makeBot from "../../bot/instance.js";
import config from "../../../config/config.js";

export default function BotRouter(express) {
    const router = express.Router();

    const controller = makeBotController(
        makeBot(config),
        openai,
        message,
        FormRepository, FormRepositoryMongoDB
    );
  
    router
      .route('/start/forms/:id')
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