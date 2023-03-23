import { Telegraf } from "telegraf";

export default function makeBot(config) {
    const bot = new Telegraf({
        webhook: { 
            domain: "https://backend-interview-bot.vercel.app/",
            port:8000,
            hookPath:"/api/v1/start/forms"
        }
    }
    );
    return bot
}
