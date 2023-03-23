import makeBotUseCases from "../../application/use_cases/bot/bot.usecases.js";

export default function makeBotController(
    bot, 
    openai,
    message,
    FormRepository,
    FormRepositoryImpl
) {

    let useCases = makeBotUseCases(bot, openai);
    let repository = FormRepository(FormRepositoryImpl());

    const start = async (req, res, next) => {
        let formData = await repository.findById(req.params.id)
        let {fields, goal} = formData;
        console.log(fields)
        try {
            await useCases.start(goal, fields, req.params.id)
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
            return res.status(400).json({message: e.message})
        }
    }


    const handleWebhook = async (req, res, next) => {
        try {
            // bot.on(message('text'), (context) => {
            //     context.reply('oke bos')
            // })
            // bot.launch()
            useCases.handleWebhookUpadate('goal', 'fields');
        } catch (e) {
            // return res.status(400).json({message: e.message})
        }
    }

    return {
        start,
        stop,
        handleWebhook,
    }
}

