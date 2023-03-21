import FormRepository from "../../application/repositories/formRepository.js";
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
        try {
            useCases.start(goal, fields, req.params.id)
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

    return {
        start,
        stop
    }
}

