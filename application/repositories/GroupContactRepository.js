
export default function GroupContactRepository(repositoryImpl) {
    const list = () => repositoryImpl.list();
    const getOne = (id) => repositoryImpl.getOne(id);
    const store = (data) => repositoryImpl.store(data);
    const update = (id, data) => repositoryImpl.update(id, data);
    const destroy = async (id) => repositoryImpl.destroy(id);
    const push = async (id, data) => repositoryImpl.push(id, data);

    return {
        list,
        store,
        push,
        getOne,
        update,
        destroy,
    };
    
  }
  