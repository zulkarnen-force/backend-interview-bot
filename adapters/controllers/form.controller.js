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

    // GET /forms/bots/:id
    const getFormByBotId = async (req, res, next) => {
        console.log(req.params.botId);
        

        try {
            let result = await Form.find({botId: req.params.botId});
            if (result.length === 0) {
                throw new Error('forms with the bot id not found');
            }
            let response = result.map(res => {
                let resultJson = res.toJSON();
                return Object.assign({}, {id: resultJson._id, fields: resultJson.fields, goal: resultJson.goal});
            })
            return res.json(response);
        } catch (error) {
            return res.status(400).json({
                code: 400,
                message: error.message,
            })
        }
        
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
            let response = await usecase.setActive(req.params.formId);
            // await Form.updateMany({is_active: true}, {$set: {is_active: false}});
            // let response = await setActive(dbRepository, req.params.formId);
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
            let forms = await getResponses(dbRepository, req.params.formId);
            return res.json(forms);
        } catch (e) {
            console.error(e);
        }
    }

    function userExists(array, ayidi) {
        return array.some(function(el) {
          return el.user_id === ayidi;
        }); 
      }
      
    const storeNewResponse = async (req, res, next) => {
        try {
            let {user_id} = req.body;
            let a = await Form.find({_id: "6416df3f8e46204e60f35800", "responses.user_id":user_id});
            if (a.length !== 0) {
                throw new Error('user has filled this form and data is exists on database')
            }
            let result = await saveRespondenDataFromForm(dbRepository, req.params.formId, req.body)
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
        saveNewRespondedFromForm,
        getUserResponseForm,
        findActiveForm,
        formSetActive,
        listOfResponses,
        storeNewResponse,
        getFormByBotId
    }
} 