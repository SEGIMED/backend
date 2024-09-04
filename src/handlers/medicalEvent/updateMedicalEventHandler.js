import {MedicalEvent} from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";


const updateMedicalEventHandler = async (body) => {
    const {id} = body
    try {
        const updateMedicalEvent = await MedicalEvent.update(
            {
                physicianComments: body.physicianComments,
                chiefComplaint: body.chiefComplaint,
                historyOfPresentIllness: body.historyOfPresentIllness,
                reviewOfSystems: body.reviewOfSystems,
                treatmentPlan: body.treatmentPlan,
                pendingDiagnosticTest: body.pendingDiagnosticTest,
                alarmPattern: body.alarmPattern,
                diagnostic: body.diagnostic
            },
            {
                where: {
                    id: id
                },
                returning: true,
                plain: true
            }
        )
        return updateMedicalEvent[1]
    } catch (error) {
        throw new SegimedAPIError('Hubo un error durante la actualización.', 500)
    }
};

export default updateMedicalEventHandler;