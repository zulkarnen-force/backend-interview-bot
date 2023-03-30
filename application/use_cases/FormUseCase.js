import FormRepository from '../repositories/FormRepository.js'

export default function FormUseCase(repository = FormRepository()) {

    const listForms = async () => {
        return repository.list();
    } 

    const findByQuery = async (query) => {
        let result  = await repository.findByQuery(query);
 
        if (result.length === 0) {
            throw new Error('forms with the bot id not found');
        }
        let response = result.map(res => {
            let resultJson = res.toJSON();
            return Object.assign({}, {id: resultJson._id, fields: resultJson.fields, goal: resultJson.goal});
        })
        
        return response;
    } 


    const updateForm = async (id, data) => {
        try {
            return repository.update(id, data);
        } catch (error) {
            throw error;
        }
    } 


    const deleteForm = async (id) => {
        try {
            let result = await repository.drop(id);
            if (!result) throw new Error('form not found');
            return result;
        } catch (error) {
            throw error;
        }
    } 

    return {
        listForms,
        updateForm,
        deleteForm,
        findByQuery
    }
}