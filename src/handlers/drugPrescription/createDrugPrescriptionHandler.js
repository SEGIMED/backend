import {DrugPrescription} from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import contextService from "request-context";
import moment from "moment-timezone";


const createDrugPrescriptionHandler = async (body) => {
    const {
        patientId,
        drugId,
        prescribedDose,
        quantity,
        medicalEventId
    } = body;

    try {
        const newPrescription = await DrugPrescription.create(
            {
                patient : patientId,
                prescribedPhysician : contextService.get('request:user').userId,
                prescriptionTimestamp : moment().format("YYYY-MM-DD HH:mm:ss z"),
                drug : drugId ,
                prescribedDose,
                quantity,
                medicalEvent : medicalEventId
            }
        )
        return newPrescription
    } catch (error) {
        throw new SegimedAPIError('Hubo un error durante en la prescripción.', 500)
    }
};

export default createDrugPrescriptionHandler;

