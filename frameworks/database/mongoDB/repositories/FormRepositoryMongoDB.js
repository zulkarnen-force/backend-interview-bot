import { Document, get } from "mongoose";
import Child from "../model/Child.js";
import Contact from "../model/Contact.js";
import Form from "../model/Form.js"
import Parent from "../model/Parent.js";


export default function FormRepositoryMongoDB() 
{

    const list = async () => {
      let a = await Form.find({}).populate({
        path: 'targets',
        strictPopulate: false,
      })
      return a;
    }

    const update = async (id, data) => {
      return Form.updateOne({_id: id}, data)
    }

    const drop = async (id) => {
      return Form.findOneAndDelete({_id: id})
    }

    const findById = async (id) => {
        try {
            return Form.findById(id).populate('targets');
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


      const userHasFilled = async (formId, userId) => {
        try {
          let form = await Form.find({_id: formId, "responses.user_id": userId});
          return form.length !== 0;
        } catch (error) {
          throw error;
        }
      };

      const storeResponse = (formId, respondenData) => {
        return Form.findOneAndUpdate({_id: formId}, {$push: {responses: respondenData}})
      };


      const getUserResponse = (userId) => {
        return Form.findOne({'responses.data.user_id': userId})
      };

      const findActive = () => {
        return Form.findOne({is_active: true})
      };

      const deactiveAll = async () => {
        await Form.updateMany({is_active: true}, {$set: {is_active: false}});
      }

      const setActive = async (formId) => {
        try {
            let form = await Form.findOneAndUpdate({_id: formId}, {is_active: true});
            return form
        } catch (e) {
            throw e;
        }
      };




    return {
        list,
        findById,
        findByQuery,
        store,
        storeResponse,
        update,
        drop,
        getUserResponse,
        findActive,
        setActive,
        deactiveAll,
        userHasFilled
    }
}