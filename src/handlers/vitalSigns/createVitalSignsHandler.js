import {VitalSignDetails} from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import moment from "moment-timezone";
import contextService from "request-context";


const newVitalSignHandler = async (body) => {
    const {vitalSignsToCreate} = body;

    const mappedVitalSignsToCreate = vitalSignsToCreate.map(vitalSign => {
        return {
            patient: vitalSign.patientId,
            measure: vitalSign.measure,
            measureSource: contextService.get('request:user').userId,
            measureType: vitalSign.measureType,
            measureTimestamp: moment().format("YYYY-MM-DD HH:mm:ss z"),
            scheduling: vitalSign.schedulingId,
            medicalEvent: vitalSign.medicalEventId
        }
    })

    try {
        const createdVitalSigns = await VitalSignDetails.bulkCreate(mappedVitalSignsToCreate)
        return createdVitalSigns
    } catch (error) {
        throw new SegimedAPIError('Hubo un error durante el proceso de registro.', 500)
    }
};

export default newVitalSignHandler;