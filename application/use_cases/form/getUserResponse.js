export default async function getUserResponse(repository, formId, userId) {
    let form = await repository.findById(formId);
    let responses = form.responses;
    let userResponse = responses.filter(response => response.user_id == userId);
    return userResponse;
}