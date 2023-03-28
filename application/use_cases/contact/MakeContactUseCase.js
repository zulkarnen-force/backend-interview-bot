import ContactRepository from "../../repositories/ContactRepository.js"

export default function MakeContactUseCase(repository = ContactRepository()) {
    const  listOfContact = async () => {
        return await repository.list();
    }

    const  storeContact = async (data) => {
        try {
        let response = await repository.store(data);
        return response
        } catch (error) {
            throw error;
        }
    }


    const  getOneContact = async (id) => {
        try {
            let contact = await repository.getOne(id);
            return contact
        } catch (error) {
            throw error;
        }
    }


    const  updateContact = async (id, data) => {
        try {
            data.updated_at = Date.now();
            let contact = await repository.update(id, data);
            return contact
        } catch (error) {
            throw error;
        }
    }


    const  deleteContact = async (id, data) => {
        try {
            let contact = await repository.destroy(id);
            return contact
        } catch (error) {
            throw error;
        }
    }


    return {
        listOfContact,
        storeContact,
        getOneContact,
        updateContact,
        deleteContact
    }
}