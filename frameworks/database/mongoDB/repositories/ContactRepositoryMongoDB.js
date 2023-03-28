import Contact from "../model/Contact.js"


export default function ContactRepositoryMongoDB() 
{

    const list = async () => {
        return Contact.find();
    }

    const getOne = async (id) => {
        try {
            return Contact.findById(id);
        } catch (e) {
            throw e;
        }
    }

    const store = (data) => {
        const newContact = new Contact(
           data
        );
        return newContact.save();
      };


      const update = async (id, data) => {
        try {
            return Contact.findOneAndUpdate(id, data);
        } catch (error) {
            throw error;
        }
      };


      const destroy = async (id, data) => {
        try {
            return Contact.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
      };




    return {
        list,
        getOne,
        store,
        update,
        destroy
    }
}