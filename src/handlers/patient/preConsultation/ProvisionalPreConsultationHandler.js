import { ProvisionalPreConsultation } from "../../../databaseConfig.js";
import { loadImage } from "../../../utils/cloudinary/cloudinary.js";

const createPreConsultationHandler= async (body)=>{
    let{
        patient,
        appointmentSchedule,
        lackOfAir,
        lackOfAirAsAlways,
        lackOfAirIncremented,
        lackOfAirClasification,
        chestPainAtRest,
        chestPainOnExertion,
        chestPainOnExertionAmount,
        edemaPresence,
        edemaPresenceDescription,
        feelings,
        healthChanges,
        healthChangesDescription,
        healthWorsened,
        bodyPain,
        mentalHealthAffected,
        mentalHealthAffectedDescription,
        energyStatus,
        feed,
        hydrationStatus,
        urineStatus,
        exerciseStatus,
        abnormalGlycemia,
        lastAbnormalGlycemia,
        physicalExamination,
        laboratoryResults,
        laboratoryResultsDescription, 
        electrocardiogram,
        electrocardiogramDescription,
        rxThorax,
        echocardiogram,
        walkTest,
        respiratoryFunctional,
        tomographies,
        rightHeartCatheterization,
        ccg,
        resonance,
        leftHeartCatheterization,
        otherStudies,
        pendingStudies,
        consultationReason,
        importantSymptoms,
        currentMedications,
    }=body

    if(tomographies){
        tomographies = JSON.parse(tomographies)
        const Imagen = await loadImage(patient, tomographies)
        tomographies = Imagen?.url;
      }

    try {
        
        const PreConsultation= await ProvisionalPreConsultation.create({
        patient,
        appointmentSchedule,
        lackOfAir,
        lackOfAirAsAlways,
        lackOfAirIncremented,
        lackOfAirClasification,
        chestPainAtRest,
        chestPainOnExertion,
        chestPainOnExertionAmount,
        edemaPresence,
        edemaPresenceDescription,
        feelings,
        healthChanges,
        healthChangesDescription,
        healthWorsened,
        bodyPain,
        mentalHealthAffected,
        mentalHealthAffectedDescription,
        energyStatus,
        feed,
        hydrationStatus,
        urineStatus,
        exerciseStatus,
        abnormalGlycemia,
        lastAbnormalGlycemia,
        physicalExamination,
        laboratoryResults,
        laboratoryResultsDescription,
        electrocardiogram,
        electrocardiogramDescription,
        rxThorax,
        echocardiogram,
        walkTest,
        respiratoryFunctional,
        tomographies,
        rightHeartCatheterization,
        ccg,
        resonance,
        leftHeartCatheterization,
        otherStudies,
        pendingStudies,
        consultationReason,
        importantSymptoms, 
        currentMedications,
    })
    return PreConsultation
        
    } catch (error) {
        throw new Error("Hubo un error al crear la preconsulta: " + error.message);
    }
}

export default createPreConsultationHandler