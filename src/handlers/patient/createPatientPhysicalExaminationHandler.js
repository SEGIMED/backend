import {PatientPhysicalExamination} from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";


const newPhysicalExaminationHandler = async (body) => {
    const {
        physicalSubsystemId,
        description,
        medicalEventId
    } = body;

    try {
        const newPhysicalExamination = await PatientPhysicalExamination.create(
            {
                physicalSubsystem: physicalSubsystemId,
                description,
                medicalEvent: medicalEventId
            }
        )
        return newPhysicalExamination
    } catch (error) {
        throw new SegimedAPIError('Hubo un error durante el proceso.', 500)
    }
};

export default newPhysicalExaminationHandler;