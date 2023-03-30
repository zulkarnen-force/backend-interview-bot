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

    return {
        listForms,
        findByQuery
    }
}