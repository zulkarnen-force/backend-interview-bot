import makeBotUseCases from "../../application/use_cases/bot/bot.usecases.js";

export default function makeBotController(
    bot, 
    openai,
    message
) {
    
    let useCases = makeBotUseCases(bot, openai);

    const start = (req, res, next) => {
        try {
            useCases.start()
            return res.json( {
                message:'bot started successfully',
            });
        } catch (e) {
            return res.status(400).json({message: 'failed to start bot ' + e.message})
        }
        
    }

    const stop = (req, res, next) => {
        try {
            useCases.stop()
            return res.json('bot stopped successfully');
        } catch (e) {
            return res.status(400).json(e.message)
        }
    }

    return {
        start,
        stop
    }
}

