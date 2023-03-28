import GroupContact from "../model/GroupContact.js"


export default function GroupContactRepositoryMongoDB() 
{

    const list = async () => {
        return GroupContact.find();
    }

    const getOne = async (id) => {
        try {
            return GroupContact.findById(id);
        } catch (e) {
            throw e;
        }
    }

    const store = (data) => {
        const newContact = new GroupContact(
           data
        );
        return newContact.save();
      };

      const push = (id, data) => {
        return GroupContact.updateOne({_id: id}, {$push: {contacts: data}})
      };


      const update = async (id, data) => {
        try {
            return GroupContact.findOneAndUpdate(id, data);
        } catch (error) {
            throw error;
        }
      };


      const destroy = async (id, data) => {
        try {
            return GroupContact.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
      };




    return {
        list,
        getOne,
        store,
        update,
        destroy,
        push
    }
}