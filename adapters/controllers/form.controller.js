import findById from "../../application/use_cases/form/findById.js";
import getActiveForm from "../../application/use_cases/form/getActiveForm.js";
import getUserResponse from "../../application/use_cases/form/getUserResponse.js";
import getResponses from "../../application/use_cases/form/getResponses.js";
import saveRespondenDataFromForm from "../../application/use_cases/form/saveRespondenDataFromForm.js";
import setActive from "../../application/use_cases/form/setActive.js";
import store from "../../application/use_cases/form/store.js";
import Form from "../../frameworks/database/mongoDB/model/Form.js";
import FormUseCase from "../../application/use_cases/FormUseCase.js";

export default function makeFormController(
    formDbRepository,
    formDbImpl, 
) {
    const dbRepository = formDbRepository(formDbImpl());
    const usecase = FormUseCase(dbRepository);

    const listOfForm = async (req, res, next) => {
        let queryBotId = req.query.botid;
        
        if (queryBotId) {
            try {
                let result = await usecase.findByQuery({botId: queryBotId})
                return res.json(result);
            } catch (error) {
                return res.status(400).json({
                    code: 400,
                    message: error.message,
                })
            }
        }

        let forms = await usecase.listForms();
        return res.json(forms);
    }

   


    const updateForm = async (req, res, next) => {
        try {
            console.log('update')
            console.log(req.body);
            let resultUpdate = await usecase.updateForm(req.params.formId, req.body);
            return res.json({
                message: 'form updated successfully',
                data: resultUpdate,
            })
        } catch (error) {
            return res.status(400).json({
                code: 400, 
                message: error.message
            })
        }

    }

    const destoryForm = async (req, res, next) => {
        try {
            let response = await usecase.deleteForm(req.params.id);
            return res.json({
                message: 'form deleted successfully',
                data: response,
            })
        } catch (error) {
            return res.status(400).json({
                code: 400, 
                message: error.message
            })
        }
    }

    const findFormById = async (req, res, next) => {
        try {
            let id = req.params.id;
            let result = await usecase.findForm(id);
            return res.json(result)
        } catch (error) {
            return res.json({message: error.message})
        }   
    }


    const storeNewForm = (req, res, next) => {
        return store(dbRepository, req.body).then(e => res.json(e)).catch(err => res.json(err))
    }




    
    const getUserResponseForm = async (req, res, next) => {
        const {formId, userId} = req.params;
        let response = await getUserResponse(dbRepository, formId, userId);
        return res.json(response);
    }

    const findActiveForm = async (req, res, next) => {
        try {
            let activeForm = await usecase.getFormActive();
            return res.json(activeForm);
        } catch (e)  {
            return res.status(404).json({code: 404, message: e.message})
        }
    }


    const formSetActive = async (req, res, next) => {
        try {
            let response = await usecase.setActive(req.params.id);
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
        let id = req.params.id
        try {
            let responses = await usecase.listOfResponses(id)
            return res.json({
                message: 'responses of user this form',
                data: responses
            });
        } catch (e) {
            console.error(e);
        }
    }


      
    const storeNewResponse = async (req, res, next) => {
        try {
            let {user_id} = req.body;
            let {id} = req.params;
            let data = req.body
            let result = await usecase.storeResponse(id, user_id, data)
            return res.json({
                    message: 'new response data inserted successfully',
                })
        } catch (e) {
            return res.status(400).json({
                code: 400, 
                message: e.message
            });
        }
    }

    return {
        listOfForm,
        findFormById,
        storeNewForm,
        updateForm,
        destoryForm,
        getUserResponseForm,
        findActiveForm,
        formSetActive,
        listOfResponses,
        storeNewResponse,
    }
} 