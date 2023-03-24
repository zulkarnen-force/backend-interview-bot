import { Telegraf } from "telegraf";

export default function makeBot(config) {
    try {
        const bot = new Telegraf(process.env.BOT_TOKEN);
        return bot
    } catch (err) {
        console.errpr('error form instace of bot ' + err.message)
    }

}
