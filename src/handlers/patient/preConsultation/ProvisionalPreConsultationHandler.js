import { ProvisionalPreConsultation } from "../../../databaseConfig.js";

const createPreConsultationHandler= async (body)=>{
    const{
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
        laboratoryResults,//array strings
        laboratoryResultsDescription,//array  strings
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
        otherStudies,//array  strings
        pendingStudies,
        consultationReason,
        importantSymptoms,
        currentMedications,//array  strings
    }=body
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
        laboratoryResults,//array strings
        laboratoryResultsDescription,//array  strings
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
        otherStudies,//array  strings
        pendingStudies,
        consultationReason,
        importantSymptoms, 
        currentMedications,//array  strings
    })
    return PreConsultation
        
    } catch (error) {
        throw new Error("Hubo un error al crear la preconsulta: " + error.message);
    }
}

export default createPreConsultationHandler