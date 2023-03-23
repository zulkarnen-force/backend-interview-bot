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
dotenv.config();
console.log('config ', process.env.MONGO_URL)

const app = express();
const server = http.createServer(app);

expressConfig(app);
serverConfig(app).startServer();
mongoDbConnection(mongoose, config).connectToMongo();
routes(app, express)

let bot = new Telegraf(process.env.BOT_TOKEN)

bot.launch({
    webhook: { 
        domain: "https://backend-interview-bot.vercel.app/",
        port:8000,
        hookPath:"/api/v1/bots/handle/webhook/"
}})

server.listen()