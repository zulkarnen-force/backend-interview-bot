import GroupContact from "../model/GroupContact.js"


export default function GroupContactRepositoryMongoDB() 
{

    const list = async () => {
        return GroupContact.find().populate('contacts');
    }

    const getOne = async (id) => {
        try {
            return GroupContact.findById(id).populate('contacts');
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

      const getGroupContactsFrom = async (groupContactId, contactId) => {
        return await GroupContact.findOne({"_id": groupContactId, "contacts": contactId});
      } 

      const push = async (id, data) => {
        if (Array.isArray(data)) {
            throw new Error('jangan pake array!, pake string. e.g: {"contacts": "123c0nt4ctId45U"} ')
        }
        console.log('outer if is array')
        let existContact = await getGroupContactsFrom(id, data)
        if (existContact) {
            let error = new Error('contact is exists')
            throw error;
        }

        // not handling valid contact id
        
        let result = await GroupContact.updateOne({_id: id}, {$addToSet: {contacts: data}})
        console.log('result', result);
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