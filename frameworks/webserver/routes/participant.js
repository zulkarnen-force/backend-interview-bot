import participantController from '../../../adapters/controllers/participantController.js';
import participantRepository from '../../../application/repositories/participantRepository.js'
import participantRepositoryMongoDB from '../../database/mongoDB/repositories/participantRepositoryMongoDB.js';

export default function participantRouter(express) {
  const router = express.Router();

  // load controller with dependencies
  const controller = participantController(
    participantRepository,
    participantRepositoryMongoDB
  );

  // GET endpoints
  router
    .route('/')
    .get(
      controller.fetchAllPosts
    );

  router
    .route('/:id')
    .get(
      controller.fetchPostById
    );

  // POST endpoints
  router.route('/').post(controller.addNewPartisipant);

  // PUT endpoints
  router.route('/:id').put( controller.updatePostById);

  // DELETE endpoints
  router.route('/:id').delete( controller.deletePostById);

  return router;
}
