export default async function getResponses(repository, formId) {
   let forms = await repository.findById(formId);
   // let responses = forms.map(res => {
   //    return {id: res._id, responses: res.responses}
   // });
   // return responses;
   // console.log(forms.responses)
   let responses = forms.responses;
   return responses;
}