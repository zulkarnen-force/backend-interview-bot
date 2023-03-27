import findById from "../../application/use_cases/form/findById.js";
import getActiveForm from "../../application/use_cases/form/getActiveForm.js";
import getUserResponse from "../../application/use_cases/form/getUserResponse.js";
import getResponses from "../../application/use_cases/form/getResponses.js";
import saveRespondenDataFromForm from "../../application/use_cases/form/saveRespondenDataFromForm.js";
import setActive from "../../application/use_cases/form/setActive.js";
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
        return store(dbRepository, req.body).then(e => res.json(e)).catch(err => res.json(err))
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

    const findActiveForm = async (req, res, next) => {
        try {
            let activeForm = await getActiveForm(dbRepository);
            return res.json(activeForm);
        } catch (e)  {
            return res.status(404).json({code: 404, message: e.message})
        }
    }


    const formSetActive = async (req, res, next) => {
        try {
            await Form.updateMany({is_active: true}, {$set: {is_active: false}});
            let response = await setActive(dbRepository, req.params.formId);
            return res.json( {
                'message': 'this form has been activated',
                data: response
            }
            )
        } catch (e)  {
            return res.status(404).json({code: 404, message: e.message})
        }
    }

    const listOfResponses = async (req, res, next) => {
        try {
            let forms = await getResponses(dbRepository);
            return res.json(forms);
        } catch (e) {
            console.error(e);
        }
    }

    return {
        listOfForm,
        findFormById,
        storeNewForm,
        saveNewRespondedFromForm,
        getUserResponseForm,
        findActiveForm,
        formSetActive,
        listOfResponses
    }
} 