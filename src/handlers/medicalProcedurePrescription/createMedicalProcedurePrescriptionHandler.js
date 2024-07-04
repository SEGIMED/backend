import { MedicalProcedurePrescription } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import moment from "moment-timezone";
import contextService from "request-context";


const newMedicalProcedurePrescriptionHandler = async (body) => {
    const {
        patientId,
        medicalProcedureId,
        medicalEventId
    } = body;

    try {
        const newProcedure = await MedicalProcedurePrescription.create(
            {
                patient: patientId,
                medicalProcedure: medicalProcedureId,
                prescribedPhysician: contextService.get('request:user').userId,
                prescriptionTimestamp: moment().format("YYYY-MM-DD HH:mm:ss z"),
                medicalEvent: medicalEventId
            }
        )
        return newProcedure
    } catch (error) {
        throw new SegimedAPIError('Hubo un error durante el proceso de solicitud.', 500)
    }
};

export default newMedicalProcedurePrescriptionHandler;