import makeContactController from "../../../adapters/controllers/contact.controller.js";
import ContactRepository from "../../../application/repositories/ContactRepository.js";
import MakeContactUseCase from "../../../application/use_cases/contact/MakeContactUseCase.js";
import ContactRepositoryMongoDB from "../../database/mongoDB/repositories/ContactRepositoryMongoDB.js";

export default function contactController(express = express()) {
    const router = express.Router();
    let repository = ContactRepository(ContactRepositoryMongoDB());
    const controller = makeContactController(repository);
  
    router
    .route('/')
    .get(
      controller.listOfContact
    );

    router
    .route('/')
    .post(
      controller.storeContact
    );


    router
    .route('/:id')
    .get(
      controller.getContact
    );

    router
      .route('/:id')
      .put(
        controller.updateContact
      );


      router
      .route('/:id')
      .delete(
        controller.deleteContact
      );
      
      return router;
  }