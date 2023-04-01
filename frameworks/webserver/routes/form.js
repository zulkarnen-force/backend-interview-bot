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
    .route('/:formId')
    .put(
      controller.updateForm
    );

    router
    .route('/:id/response')
    .post(
      controller.storeNewResponse
    );


    router
    .route('/:id')
    .delete(
      controller.destoryForm
    );



    router
    .route('/active')
    .get(
      controller.findActiveForm
    );

    

    router
      .route('/:id')
      .get(
        controller.findFormById
      );


      router
      .route('/:id/responses')
      .get(
        controller.listOfResponses
      );



      router
      .route('/:id/active')
      .get(
        controller.formSetActive
      );

      router
      .route('/')
      .post(
        controller.storeNewForm
      );

      router
      .route('/:formId/responden/:userId/response')
      .get(
        controller.getUserResponseForm
      );





  







    
  
    
    return router;
  }