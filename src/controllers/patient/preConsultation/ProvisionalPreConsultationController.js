import SegimedAPIError from "../../../error/SegimedAPIError.js";
import createPreConsultationHandler from "../../../handlers/patient/preConsultation/ProvisionalPreConsultationHandler.js"
import createVitalSignsHandler from "../../../handlers/vitalSigns/createVitalSignsHandler.js"
import createPatientPainMapHandler from "../../../handlers/painMap/createPatientPainMapHandler.js"

const createPreConsultationController = async (req, res) => {
    try {
        const body = req.body;
        // console.log({ vitalSigns: req.body.vitalSigns, physicalExamination: req.body.bodySection });
        const bodyForm = {
            patient: body.patient,
            appointmentSchedule: body.appointmentSchedule,
            // Questions
            lackOfAir: body.questions.lackOfAir.active,
            lackOfAirIncremented: body.questions.lackOfAir.subquestions.lackOfAirIncremented.selectedOption,
            lackOfAirClasification: body.questions.lackOfAir.subquestions.lackOfAirClasification.selectedOption,
            chestPainAtRest: body.questions.chestPainAtRest.active,
            chestPainOnExertion: body.questions.chestPainOnExertion.active,
            chestPainOnExertionAmount: body.questions.chestPainOnExertion.subquestions.chestPainOnExertionAmount.selectedOption,
            edemaPresence: body.questions.edemaPresence.active,
            edemaPresenceDescription: body.questions.edemaPresence.subquestions.edemaPresenceDescription.selectedOption,
            feelings: body.questions.feelings.selectedOption,
            healthChanges: body.questions.healthChanges.active,
            healthChangesDescription: body.questions.healthChanges.description,
            healthWorsened: body.questions.healthWorsened.selectedOption,
            bodyPain: body.questions.bodyPain.active,
            mentalHealthAffected: body.questions.mentalHealthAffected.active,
            mentalHealthAffectedDescription: body.questions.mentalHealthAffected.description,
            energyStatus: body.questions.energyStatus.selectedOption,
            feed: body.questions.feed.selectedOption,
            hydrationStatus: body.questions.hydrationStatus.selectedOption,
            urineStatus: body.questions.urineStatus.selectedOption,
            exerciseStatus: body.questions.exerciseStatus.selectedOption,
            // Estudios
            abnormalGlycemia: body.tests.abnormalGlycemia.active,
            lastAbnormalGlycemia: body.tests.lastAbnormalGlycemia.selectedOption,
            physicalExamination: body.tests.physicalExamination.file,
            laboratoryResults: body.tests.laboratoryResults.file,
            laboratoryResultsDescription: body.tests.laboratoryResults.description,
            electrocardiogram: body.tests.electrocardiogram.file,
            electrocardiogramDescription: body.tests.electrocardiogram.description,
            rxThorax: body.tests.rxThorax.file,
            echocardiogram: body.tests.echocardiogram.file,
            walkTest: body.tests.walkTest.file,
            respiratoryFunctional: body.tests.respiratoryFunctional.file,
            tomographies: body.tests.tomographies.file,
            rightHeartCatheterization: body.tests.rightHeartCatheterization.file,
            ccg: body.tests.ccg.file,
            resonance: body.tests.resonance.file,
            leftHeartCatheterization: body.tests.leftHeartCatheterization.file,
            otherStudies: body.tests.otherStudies.file,
            pendingStudies: body.tests.pendingStudies.description,
            // Anamnesis
            consultationReason: body.anamnesis.consultationReason.description,
            importantSymptoms: body.anamnesis.importantSymptoms.description,
            // Tratamiento
            currentMedications: Object.values(body.tratamiento.currentMedications.selectedOptions),
        };
        console.log(bodyForm);
        // const preConsultation = await createPreConsultationHandler(req.body);
        // const vitalSigns = await createVitalSignsHandler(req.body.vitalSignsToCreate)//It receives an array of vital signs
        // const physicalExamination= await createPatientPainMapHandler(req.body.painRecordsToCreate[0])
        // return res.status(200).json({ preConsultation, vitalSigns, physicalExamination });
    } catch (error) {
        throw new SegimedAPIError('Hubo un error durante el proceso de creación', error, 500)
    }
}

export default createPreConsultationController