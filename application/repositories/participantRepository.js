export default function partisipantRepository(repository) {
    const findAll = () => repository.findAll();
    const countAll = (params) => repository.countAll(params);
    const findById = (id) => repository.findById(id);
    const store = (partisipant) => repository.store(partisipant);
    const updateById = (id, post) => repository.updateById(id, post);
    const deleteById = (id) => repository.deleteById(id);
  
    return {
      findAll,
      countAll,
      findById,
      store,
      updateById,
      deleteById
    };
  }
  