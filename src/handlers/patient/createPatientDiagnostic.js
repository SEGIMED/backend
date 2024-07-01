import {PatientDiagnostic} from "../../databaseConfig.js";
import contextService from "request-context";
import moment from "moment-timezone";
import SegimedAPIError from "../../error/SegimedAPIError.js";


const createPatientDiagnosticHandler = async (body) => {
    const {
        patientId,
        diseaseId,
        diagnosticNotes,
        medicalEventId
    } = body;

    try {
        const newDiagnostic = await PatientDiagnostic.create(
            {
                patient : patientId,
                diagnosedBy : contextService.get('request:user').userId,
                timestamp : moment().format("YYYY-MM-DD HH:mm:ss z"),
                disease : diseaseId,
                diagnosticNotes,
                medicalEvent : medicalEventId
            }
        )
        return newDiagnostic
    } catch (error) {
        throw new SegimedAPIError('Hubo un error durante el proceso.', 500)
    }
};

export default createPatientDiagnosticHandler;

