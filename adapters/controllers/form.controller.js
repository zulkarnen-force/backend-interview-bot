import findById from "../../application/use_cases/form/findById.js";
import getUserResponse from "../../application/use_cases/form/getUserResponse.js";
import list from "../../application/use_cases/form/list.js";
import saveRespondenDataFromForm from "../../application/use_cases/form/saveRespondenDataFromForm.js";
import store from "../../application/use_cases/form/store.js";
import Form from "../../frameworks/database/mongoDB/model/Form.js";

export default function makeFormController(
    formDbRepository,
    formDbImpl, 
) {
    const dbRepository = formDbRepository(formDbImpl()); 

    const listOfForm = (req, res, next) => {
        return list(dbRepository, req.params.id).then(e => res.json(e))
    }

    const findFormById = (req, res, next) => {
        return findById(dbRepository, req.params.id).then(e => res.json(e)).catch(err => console.log(err.message))
    }


    const storeNewForm = (req, res, next) => {
        return store(dbRepository, req.body).then(e => res.json(e))
    }


    const saveNewRespondedFromForm = (req, res, next) => {
        const {form_id, responden_id} = req.params;
        return saveRespondenDataFromForm(dbRepository, form_id, req.body).then(e => res.json(e))
    }

    
    const getUserResponseForm = async (req, res, next) => {
        const {formId, userId} = req.params;
        let response = await getUserResponse(dbRepository, formId, userId);
        return res.json(response);
    }

    return {
        listOfForm,
        findFormById,
        storeNewForm,
        saveNewRespondedFromForm,
        getUserResponseForm
    }
} 