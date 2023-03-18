import ParticipantModel from "../model/participant.js";

function omit(obj, ...props) {
  const result = { ...obj };
  props.forEach((prop) => delete result[prop]);
  return result;
}

export default function ParticipantRepositoryMongoDB() {
  const findAll = async () => {return await ParticipantModel.find()};
  const countAll = (params) =>
    ParticipantModel.countDocuments(omit(params, 'page', 'perPage'));
  const findById = (id) => ParticipantModel.findById(id);
  
  const store = (data) => {
    const newParticipant = new ParticipantModel(
       data
    );
    return newParticipant.save();
  };

  const updateById = (id, ParticipantEntity) => {
    const updatedParticipant = {
      title: ParticipantEntity.getTitle(),
      description: ParticipantEntity.getDescription(),
      isPublished: ParticipantEntity.isPublished()
    };

    return ParticipantModel.findOneAndUpdate(
      { _id: id },
      { $set: updatedParticipant },
      { new: true }
    );
  };

  const deleteById = (id) => ParticipantModel.findByIdAndRemove(id);

  return {
    findAll,
    countAll,
    findById,
    store,
    updateById,
    deleteById
  };
}
