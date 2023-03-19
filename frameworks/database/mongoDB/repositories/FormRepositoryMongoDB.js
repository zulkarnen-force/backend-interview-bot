import Form from "../model/Form.js"


export default function FormRepositoryMongoDB() 
{

    const list = async () => {
        return Form.find();
    }

    const findById = async (id) => {
        try {
            return Form.findById(id);
        } catch (e) {
            throw e;
        }
    }

    const store = (data) => {
        const newForm = new Form(
           data
        );
        return newForm.save();
      };

      const saveNewRespondenDataFromForm = (formId, respondenData) => {
        return Form.findOneAndUpdate({_id: formId}, {$push: {data: respondenData}})
      };




    return {
        list,
        findById,
        store,
        saveNewRespondenDataFromForm
    }
}