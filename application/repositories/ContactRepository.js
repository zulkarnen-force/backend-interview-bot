
export default function ContactRepository(repositoryImpl) {
    const list = () => repositoryImpl.list();
    const getOne = (id) => repositoryImpl.getOne(id);
    const store = (data) => repositoryImpl.store(data);
    const update = (id, data) => repositoryImpl.update(id, data);
    const destroy = async (id) => repositoryImpl.destroy(id);

    return {
        list,
        store,
        getOne,
        update,
        destroy,
    };
    
  }
  