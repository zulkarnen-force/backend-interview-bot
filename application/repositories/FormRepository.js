import FormRepositoryMongoDB from "../../frameworks/database/mongoDB/repositories/FormRepositoryMongoDB.js";

export default function FormRepository(repositoryImpl) {
    const list = () => repositoryImpl.list();
    const findById = (id) => repositoryImpl.findById(id);
    const store = (id) => repositoryImpl.store(id);
    const saveNewRespondenDataFromForm = (form_id, userData) => repositoryImpl.saveNewRespondenDataFromForm(form_id, userData);
    return {
        list,
        findById,
        store,
        saveNewRespondenDataFromForm
    };
  }
  