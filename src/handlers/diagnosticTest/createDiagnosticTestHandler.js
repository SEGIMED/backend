import {DiagnosticTest} from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";


const createDiagnosticTestHandler = async (body) => {
    const {
        patientId,
        testTypeId,
        resultsInterpretation,
        fileUrl,
        practicedTimestamp,
        registeredTimestamp,
        schedulingId,
        medicalEventId
    } = body;

    try {
        const newDiagnosticTest = await DiagnosticTest.create(
            {
                patient : patientId,
                testType : testTypeId,
                resultsInterpretation,
                fileUrl,
                practicedTimestamp,
                registeredTimestamp,
                scheduling : schedulingId,
                medicalEvent : medicalEventId
            }
        )
        return newDiagnosticTest
    } catch (error) {
        throw new SegimedAPIError('Hubo un error durante el proceso.', 500)
    }
};

export default createDiagnosticTestHandler;

