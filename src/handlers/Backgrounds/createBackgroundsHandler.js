import {Backgrounds} from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import moment from "moment-timezone";


const createBackgroundsHandler = async (body) => {
    const {
        patientId,
        surgicalBackground,
        pathologicBackground,
        nonPathologicBackground,
        familyBackground,
        pediatricBackground,
        pharmacologicalBackground,
        vaccinationBackground,
        allergicBackground,
        medicalEventId
    } = body;

    try {
        const now = moment()
        const newBackground = await Backgrounds.create(
            {
                patient: patientId,
                surgicalBackground,
                pathologicBackground,
                nonPathologicBackground,
                familyBackground,
                pediatricBackground,
                pharmacologicalBackground,
                vaccinationBackground,
                allergicBackground,
                timestamp: now.format("YYYY-MM-DD HH:mm:ss z"),
                medicalEvent: medicalEventId

            }
        )
        return newBackground
    } catch (error) {
        throw new SegimedAPIError('Hubo un error durante el proceso de registro.', 500)
    }
};

export default createBackgroundsHandler;

