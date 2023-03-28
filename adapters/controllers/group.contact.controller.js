import GroupContactUseCase from "../../application/use_cases/group/GroupContactUseCase.js";
import GroupContact from "../../frameworks/database/mongoDB/model/GroupContact.js";

export default function GroupContactController(repository) {
    let usecase = GroupContactUseCase(repository);
   
    const listGroupContacts = async (req, res, next) => {
        let groupsContacts = await usecase.listOfContact();

        let result = groupsContacts.map(res => {
            let resultJson = res.toJSON();
            return Object.assign(resultJson, {total_contacts:  resultJson.contacts.length});
        })

        return res.json({
            message: 'list of group contacts',
            data: result
        });
    }

    const storeGroup = async (req, res, next) => {
        try {
            let response = await usecase.storeContact(req.body)
            return await res.json({
                message: 'contact saved successfully',
                data: response
            });
        } catch (e) {
            return await res.status(400).json({
                errors: {
                    code: e.code,
                    message: e.message
                }
            });
        }
    }


    const addContact = async (req, res, next) => {
        try {
            let id = req.params.id;
            let data = req.body;
            let { contacts } = data;
            let response = await usecase.addContact(id, contacts)
            return await res.json({
                message: 'contact saved successfully',
                data: response
            });
        } catch (e) {
            return await res.status(400).json({
                errors: {
                    code: e.code,
                    message: e.message
                }
            });
        }
    }

    
    const getGroup = async (req, res, next) => {
        let id = req.params.id;
        try {
            let response = await usecase.getOneContact(id);
            let responseJson = response.toJSON();
            responseJson.total_contacts = responseJson.contacts.length;
            if (!response) {
                throw new Error('contact not found');
            }
            return res.json(responseJson);
        } catch (error) {
            return res.status(400).json({
                message: error.message
            });
        }
    }



    const updateGroup = async (req, res, next) => {
        try {
            let response = await usecase.updateContact(req.params.id, req.body);
            return res.json( {
                message: 'update contact successfully',
                response: response
            })
        } catch (error) {
            return res.json( {
               message: error.message
            })
        }
    }


    const deleteGroup = async (req, res, next) => {
        try {
            let response = await usecase.deleteContact(req.params.id);
            if (!response) {
                throw new Error('contact not found');
            }
            return res.json( {
                message: 'delete contact successfully',
                respoonse: response
            })
        } catch (error) {
            return res.status(400).json( {
               message: error.message
            })
        }
    }

    
    

    return {
        listGroupContacts,
        getGroup,
        storeGroup,
        addContact,
        deleteGroup,
        updateGroup
    }
} 