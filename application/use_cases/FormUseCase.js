import { response } from 'express';
import FormRepository from '../repositories/FormRepository.js'
import Form from '../../frameworks/database/mongoDB/model/Form.js';

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


    const setActive = async (id) => {
        try {
            await repository.deactiveAll();
            let result = await repository.setActive(id);
            return result;
        } catch (error) {
            throw error;
        }
    } 


    const findForm = async (id) => {
        try {
            return repository.findById(id); 
        } catch (error) {
            throw error;
        }
    } 


    const listOfResponses  = async (id) => {
        try {
            let form = await repository.findById(id);
            console.log(form)
            let responses = form.responses;
            return responses;
        } catch (e) {
            throw e;
        }
    }


    const storeResponse  = async (formId, userId, data) => {
        try {
            let userHasFilled = await repository.userHasFilled(formId, userId);
            console.log(`user has filled ${userHasFilled}`)
            if (userHasFilled) {
                throw new Error('user has filled this form')
            }
            let result = await repository.storeResponse(formId, data);
            return result;
        } catch (e) {
            throw e;
        }
    }

    const getFormActive = async () => {
        try {
            let form = await repository.findActive();
            if (form === null) {
                throw new Error('active form not found')
            }
            return form;
        } catch (e) {
            throw e;
        }
    }
    

    return {
        listForms,
        listOfResponses,
        storeResponse,
        findForm,
        updateForm,
        deleteForm,
        findByQuery,
        setActive,
        getFormActive
    }
}