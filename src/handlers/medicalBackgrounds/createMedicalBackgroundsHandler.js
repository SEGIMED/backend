import {PatientMedicalBackground} from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";


const medicalBackgroundHandler = async (body) => {
   

    try {
        const newMedicalBackground = await PatientMedicalBackground.bulkCreate(body);
        return newMedicalBackground
    } catch (error) {
        throw new SegimedAPIError('Hubo un error durante el proceso de registro.', 500)
    }
};

export default medicalBackgroundHandler;

