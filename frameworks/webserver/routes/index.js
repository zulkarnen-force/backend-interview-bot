import participantRoutes from './participant.js';
import botRoutes from './bot.js';
import formRoutes from './form.js';
import BotRouter from './bot.js';

export default function routes(app, express) {
  app.use('/api/v1/participants', participantRoutes(express));
  app.use('/api/v1/bots', BotRouter(express));
  app.use('/api/v1/forms', formRoutes(express));
}
