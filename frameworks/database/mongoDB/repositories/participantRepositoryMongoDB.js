import PartisipantBot from "../model/things.js";

// import PartisipantBot from "../model/participant.js";

function omit(obj, ...props) {
  const result = { ...obj };
  props.forEach((prop) => delete result[prop]);
  return result;
}

export default function ParticipantRepositoryMongoDB() {
  const findAll = async () => {return await PartisipantBot.find()};
  const countAll = (params) =>
    PartisipantBot.countDocuments(omit(params, 'page', 'perPage'));
  const findById = (id) => PartisipantBot.findById(id);
  
  const store = (data) => {
    const newParticipant = new PartisipantBot(
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

    return PartisipantBot.findOneAndUpdate(
      { _id: id },
      { $set: updatedParticipant },
      { new: true }
    );
  };

  const deleteById = (id) => PartisipantBot.findByIdAndRemove(id);

  return {
    findAll,
    countAll,
    findById,
    store,
    updateById,
    deleteById
  };
}
