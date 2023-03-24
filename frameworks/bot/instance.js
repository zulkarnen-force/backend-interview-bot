import { Telegraf } from "telegraf";

export default function makeBot(config) {
    const bot = new Telegraf(process.env.BOT_TOKEN);
    
    return bot
}
