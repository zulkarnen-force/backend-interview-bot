export default async function saveRespondenDataFromForm(repository, form_id, data) {
    console.log(await repository.findById(form_id));
    return repository.saveNewRespondenDataFromForm(form_id, data)
}