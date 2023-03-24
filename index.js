import express from 'express';
import expressConfig from './frameworks/webserver/express.js';
import http from 'http'
import serverConfig from './frameworks/webserver/server.js';
import mongoDbConnection from './frameworks/database/mongoDB/connection.js';
import mongoose from 'mongoose';
import config from './config/config.js'
import routes from './frameworks/webserver/routes/index.js';
import * as dotenv from "dotenv";
import { Telegraf } from 'telegraf';
import TelegramBot from 'node-telegram-bot-api';

const app = express();
const server = http.createServer(app);
const bot = new TelegramBot(process.env.BOT_TOKEN)
const url = 'https://backend-interview-bot.vercel.app/';
const port = 3000;
bot.setWebHook(`https://backend-interview-bot.vercel.app/api/v1/bots/handle/webhook`);

bot.on('message', msg => {
    bot.sendMessage(msg.chat.id, 'I am alive!');
});

expressConfig(app);
serverConfig(app).startServer();
mongoDbConnection(mongoose, config).connectToMongo();
routes(app, express)


// let bot = new Telegraf(process.env.BOT_TOKEN)

// bot.launch({
//     allowedUpdates: 'message',
//     dropPendingUpdates: true,
//     webhook: { 
//         domain: "https://0289-2001-448a-4042-15d9-c73-2733-54c5-5fa6.ap.ngrok.io",
//         port:8000,
//         hookPath:"/api/v1/bots/handle/webhook/",
        
// }})

server.listen(3000)