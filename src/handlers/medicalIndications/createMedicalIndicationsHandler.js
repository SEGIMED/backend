import {MedicalIndications} from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import moment from "moment-timezone";
import contextService from "request-context";


const createMedicalIndicationsHandler = async (body) => {
    const {patientId, description, medicalEventId} = body;

    try {
        const newMedicalIndication = await MedicalIndications.create(
            {
                patient: patientId,
                description,
                prescribedPhysician: contextService.get('request:user').userId,
                medicalEvent: medicalEventId,
                timestamp: moment().format("YYYY-MM-DD HH:mm:ss z")
            }
        )
        return newMedicalIndication
    } catch (error) {
        throw new SegimedAPIError('Hubo un error durante el proceso de creación.', 500)
    }
};

export default createMedicalIndicationsHandler;