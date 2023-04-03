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

      const getGroupContactsFrom = async (groupContactId, contactsData) => {
        return await GroupContact.findOne({"_id": groupContactId, contacts: {$in: contactsData}});
      } 

      const _findDuplicate = (request = [], result = []) => {
        let temp =[];
        for (let i = 0; i < request.length; i++) {
            for (let j = 0; j < result.length; j++) {
                if (request[i] === String(result[j])) {
                    temp.push(request[i]);
                    break;
                }
            }
        }
        return temp;
      }

      const push = async (id, data) => {
  
        let existContact = await getGroupContactsFrom(id, data)
        if (existContact) {
            let error = new Error('contact is exists')
            throw error;
        }

        // not handling valid contact id
        let result = await GroupContact.updateOne({_id: id}, {$addToSet: {contacts: data}})

        console.log('result', result);
        let contactDuplicate = _findDuplicate(data, result.contacts);
        
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