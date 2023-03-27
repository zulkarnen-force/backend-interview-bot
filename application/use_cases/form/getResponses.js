export default async function getResponses(repository) {
   let forms = await repository.list();
   let responses = forms.map(res => {
      return {id: res._id, responses: res.responses}
   });
   return responses;

}