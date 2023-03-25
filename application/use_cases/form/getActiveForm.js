export default async function getActiveForm(repository) {
    try {
        let form = await repository.findActive();
        if (form === null) {
            throw new Error('active form not found')
        }
        return form;
    } catch (e) {
        throw e;
    }

    
}