import multer from "multer";
import makeContactController from "../../../adapters/controllers/contact.controller.js";
import ContactRepository from "../../../application/repositories/ContactRepository.js";
import MakeContactUseCase from "../../../application/use_cases/contact/MakeContactUseCase.js";
import ContactRepositoryMongoDB from "../../database/mongoDB/repositories/ContactRepositoryMongoDB.js";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${path.join(process.cwd(), '/uploads')}`);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });
// var storage = multer.memoryStorage();
// var upload = multer({ storage: storage });

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
    .route('/import')
    .post( upload.single('contacts'),
      controller.importContacts
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