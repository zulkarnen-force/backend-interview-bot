import { message } from "telegraf/filters";

export default function makeBotUseCases(bot, opeanai) {
    let isRunning = false;
    const start = () => {
        if (isRunning) throw new Error('bot is running, mau setting ulang? please stop dulu ya...')
        set();
        bot.launch();
        isRunning = true;
    };
    const stop = () => {
        bot.stop;
        isRunning = false;
    };

    const set = () => {
        bot.on(message('text'), (ctx) => {
            return ctx.reply('this set by api')
        })
    }

    return {
        start,
        stop
    }
}





