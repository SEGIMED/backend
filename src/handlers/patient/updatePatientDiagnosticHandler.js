import {PatientDiagnostic} from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";



const updatePatientDiagnosticHandler = async (body) => {
    const {id} = body

    try {
        const updatedDiagnostic = await PatientDiagnostic.update(
            {
                disease : body.diseaseId,
                diagnosticNotes : body.diagnosticNotes,
            },
            {
                where: {
                    id: id
                },
                returning: true,
                plain: true
            }
        )
        return updatedDiagnostic[1]
    } catch (error) {
        throw new SegimedAPIError('Hubo un error durante el proceso.', 500)
    }
};

export default updatePatientDiagnosticHandler;