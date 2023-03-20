import { Telegraf } from "telegraf";

export default function makeBot(config) {
    const bot = new Telegraf(config.bot.token);
    return bot
}
