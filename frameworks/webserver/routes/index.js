import participantRoutes from './participant.js';
import botRoutes from './bot.js';
import formRoutes from './form.js';
import contactController  from './contact.js';


export default function routes(app, express) {
  app.use('/api/v1/participants', participantRoutes(express));
  app.use('/api/v1/bots', botRoutes(express));
  app.use('/api/v1/forms', formRoutes(express));
  app.use('/api/v1/contacts', contactController(express));
}
