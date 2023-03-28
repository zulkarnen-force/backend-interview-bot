import GroupContactController from "../../../adapters/controllers/group.contact.controller.js";
import GroupContactRepository from "../../../application/repositories/GroupContactRepository.js";
import GroupContactRepositoryMongoDB from "../../database/mongoDB/repositories/GroupContactRepositoryMongoDB.js";

export default function groupContactController(express = express()) {
    const router = express.Router();
    let repository = GroupContactRepository(GroupContactRepositoryMongoDB());
    const controller = GroupContactController(repository);
  
    router
    .route('/')
    .get(
      controller.listGroupContacts
    );

    router
    .route('/')
    .post(
      controller.storeGroup
    );

    
    router
    .route('/:id')
    .post(
      controller.addContact
    );





    router
    .route('/:id')
    .get(
      controller.getGroup
    );

    router
      .route('/:id')
      .put(
        controller.updateGroup
      );


      router
      .route('/:id')
      .delete(
        controller.deleteGroup
      );
      
      return router;
  }