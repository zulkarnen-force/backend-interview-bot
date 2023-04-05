import FormRepositoryMongoDB from "../../frameworks/database/mongoDB/repositories/FormRepositoryMongoDB.js";

export default function FormRepository(repositoryImpl) {
    const list = () => repositoryImpl.list();
    const findById = (id) => repositoryImpl.findById(id);
    const store = (data) => repositoryImpl.store(data);
    const update = (id, data) => repositoryImpl.update(id, data);
    const storeResponse = (form_id, userData) => repositoryImpl.storeResponse(form_id, userData);
    const getUserResponse = async (formId, userId) => repositoryImpl.getUserResponse(formId, userId);
    const findActive = async () => repositoryImpl.findActive();
    const setActive = async (formId) => repositoryImpl.setActive(formId);
    const findByQuery = async (query) => repositoryImpl.findByQuery(query);
    const drop = async (id) => repositoryImpl.drop(id);
    const deactiveAll = async () => repositoryImpl.deactiveAll();
    const userHasFilled = async (formId, userId) =>  repositoryImpl.userHasFilled(formId, userId); // {hasFilled, data}
    const destroyUserResponse = async (formId, userId) => repositoryImpl.destroyUserResponse(formId, userId);
    const destroyUserTarget = async (formId) => repositoryImpl.destroyUserTarget(formId);

    
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
        userHasFilled,
        destroyUserResponse,
        destroyUserTarget
    };
    
  }
  