import findById from "../../application/use_cases/form/findById.js";
import getActiveForm from "../../application/use_cases/form/getActiveForm.js";
import getUserResponse from "../../application/use_cases/form/getUserResponse.js";
import getResponses from "../../application/use_cases/form/getResponses.js";
import list from "../../application/use_cases/form/list.js";
import saveRespondenDataFromForm from "../../application/use_cases/form/saveRespondenDataFromForm.js";
import setActive from "../../application/use_cases/form/setActive.js";
import store from "../../application/use_cases/form/store.js";
import Form from "../../frameworks/database/mongoDB/model/Form.js";

export default function makeFormController(
    formDbRepository,
    formDbImpl, 
) {
    const dbRepository = formDbRepository(formDbImpl()); 

    const listOfForm = async (req, res, next) => {
        let queryBotId = req.query.botid;
        if (queryBotId) {
            try {
                let result = await Form.find({botId: queryBotId});
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
        return list(dbRepository).then(e => res.json(e))
    }

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
        let result = await Form.updateOne({_id: req.params.formId}, req.body);
        res.json(result);
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
            let a = await Form.find({_id: req.params.formId}).lean();
            let responses = a[0].responses;
            let isExsits = userExists(responses, req.body.user_id);
            if (isExsits) {
                return res.status(400).json(
                    {
                        message: 'data is exists',
                    }
                )
            }
            // Form(req.body)
            let result = await saveRespondenDataFromForm(dbRepository, req.params.formId, req.body)
            return res.json(
                {
                    message: 'new response data inserted successfully',
                    data: result
                }
            )
        } catch (e) {
            console.error(e);
        }
    }

    return {
        listOfForm,
        findFormById,
        storeNewForm,
        updateForm,
        saveNewRespondedFromForm,
        getUserResponseForm,
        findActiveForm,
        formSetActive,
        listOfResponses,
        storeNewResponse,
        getFormByBotId
    }
} 