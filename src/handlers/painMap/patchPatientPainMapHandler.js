import SegimedAPIError from "../../../error/SegimedAPIError.js";
const patchPatientPainMapHandler = async (body)=> {
    const{painRecordsToUpdate}=body;
    try {
        
    } catch (error) {
        throw new SegimedAPIError('Hubo un error durante el proceso de creación.', 500)
        
    }
}