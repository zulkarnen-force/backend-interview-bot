import makeFormController from "../../../adapters/controllers/form.controller.js";
import FormRepository from "../../../application/repositories/FormRepository.js";
import FormRepositoryMongoDB from "../../database/mongoDB/repositories/FormRepositoryMongoDB.js";

export default function participantRouter(express) {
    const router = express.Router();

    const controller = makeFormController(FormRepository, FormRepositoryMongoDB);
  
    router
    .route('/')
    .get(
      controller.listOfForm
    );

    

    router
      .route('/:id')
      .get(
        controller.findFormById
      );

      router
      .route('/')
      .post(
        controller.storeNewForm
      );

      router
      .route('/:form_id/responden')
      .post(
        controller.saveNewRespondedFromForm
      );





    
  
    
    return router;
  }