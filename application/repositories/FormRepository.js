import FormRepositoryMongoDB from "../../frameworks/database/mongoDB/repositories/FormRepositoryMongoDB.js";

export default function FormRepository(repositoryImpl) {
    const list = () => repositoryImpl.list();
    const findById = (id) => repositoryImpl.findById(id);
    const store = (id) => repositoryImpl.store(id);
    const update = (id, data) => repositoryImpl.update(id, data);
    const storeResponse = (form_id, userData) => repositoryImpl.storeResponse(form_id, userData);
    const getUserResponse = async (formId, userId) => repositoryImpl.getUserResponse(formId, userId);
    const findActive = async () => repositoryImpl.findActive();
    const setActive = async (formId) => repositoryImpl.setActive(formId);
    const findByQuery = async (query) => repositoryImpl.findByQuery(query);
    const drop = async (id) => repositoryImpl.drop(id);
    const deactiveAll = async () => repositoryImpl.deactiveAll();
    const userHasFilled = async (formId, userId) =>  repositoryImpl.userHasFilled(formId, userId);
    
    return {
        list,
        findById,
        store,
        drop,
        update,
        storeResponse,
        getUserResponse,
        findActive,
        setActive,
        findByQuery,
        deactiveAll,
        userHasFilled
    };
    
  }
  