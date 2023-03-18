import participantRoutes from './participant.js';

export default function routes(app, express) {
  app.use('/api/v1/participants', participantRoutes(express));
}
