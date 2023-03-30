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

    const findByQuery = async (query) => {
      try {
          return Form.find(query);
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
        return Form.findOneAndUpdate({_id: formId}, {$push: {responses: respondenData}})
      };


      const getUserResponse = (userId) => {
        return Form.findOne({'responses.data.user_id': userId})
      };

      const findActive = () => {
        return Form.findOne({is_active: true})
      };

      const setActive = async (formId) => {
        console.log(formId)
        try {
            let form = await Form.findOneAndUpdate({_id: formId}, {is_active: true} );
            return form;
        } catch (e) {
            console.error('error activated form ' + e)
        }
      };




    return {
        list,
        findById,
        findByQuery,
        store,
        saveNewRespondenDataFromForm,
        getUserResponse,
        findActive,
        setActive
    }
}