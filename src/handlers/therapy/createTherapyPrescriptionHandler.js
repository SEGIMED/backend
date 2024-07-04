import { TherapyPrescription } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import moment from "moment-timezone";
import contextService from "request-context";


const createTherapyPrescriptionHandler = async (body) => {
    const {
        patientId,
        therapyId,
        descriptionTherapy,
        quantityTherapy,
        medicalEventId
    } = body;

    try {
        const newTherapy = await TherapyPrescription.create(
            {
                patient: patientId,
                therapy: therapyId,
                description: descriptionTherapy,
                quantity: quantityTherapy,
                prescribedPhysician: contextService.get('request:user').userId,
                timestamp: moment().format("YYYY-MM-DD HH:mm:ss z"),
                medicalEvent: medicalEventId
            }
        )
        return newTherapy
    } catch (error) {
        throw new SegimedAPIError('Hubo un error durante el proceso de remisión.', 500)
    }
};

export default createTherapyPrescriptionHandler;