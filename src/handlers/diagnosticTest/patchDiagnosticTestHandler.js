import {DiagnosticTest} from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";


const updateDiagnosticTestHandler = async (body) => {
    const {id} = body
    try {
        const updateDiagnosticTest = await DiagnosticTest.update(
            {
                testType : body.testTypeId,
                resultsInterpretation : body.resultsInterpretation,
                fileUrl : body.fileUrl,
                practicedTimestamp : body.practicedTimestamp
            },
            {
                where: {
                    id:id
                },
                returning : true,
                plain : true
            }
        )
        return updateDiagnosticTest[1]
    } catch (error) {
        throw new SegimedAPIError('Hubo un error durante el proceso.', 500)
    }
};

export default updateDiagnosticTestHandler;

