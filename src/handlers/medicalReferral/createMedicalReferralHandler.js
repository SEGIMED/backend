import {MedicalReferral} from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import moment from "moment-timezone";
import contextService from "request-context";


const createMedicalReferralHandler = async (body) => {
    const {
        patientId,
        physicianSpecialtyId,
        description,
        medicalEvent
    } = body;

    try {
        const newReferral = await MedicalReferral.create(
            {
                patient: patientId,
                specialty: physicianSpecialtyId,
                description,
                prescribedBy: contextService.get('request:user').userId,
                timestamp: moment().format("YYYY-MM-DD HH:mm:ss z"),
                medicalEvent
            }
        )
        return newReferral
    } catch (error) {
        throw new SegimedAPIError('Hubo un error durante el proceso de remisión.', 500)
    }
};

export default createMedicalReferralHandler;