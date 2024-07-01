import {SociodemographicDetails} from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";


const createSociodemographicDetailHandler = async (body) => {
    const {patientId, birthDate, genreId, educationalLevelId, profession, civilStatusId, address, healthCarePlanId, healthCareNumber, emergencyContactPhone, dateOfDeathReport} = body;

    try {
        const newSociodemographicDetail = await SociodemographicDetails.create(
            {
                patient: patientId,
                birthDate,
                genre: genreId,
                educationalLevel: educationalLevelId,
                profession,
                civilStatus: civilStatusId,
                address,
                healthCarePlan: healthCarePlanId,
                healthCareNumber,
                emergencyContactPhone,
                dateOfDeathReport
            }
        )
        return newSociodemographicDetail
    } catch (error) {
        throw new SegimedAPIError('Hubo un error durante el proceso de registro de los datos.', 500)
    }
};

export default createSociodemographicDetailHandler;