import { ProvisionalPreConsultation } from "../../../databaseConfig.js";

const patchProvisionalPreConsultationHandler = async(body)=>{
    const{
        preconsultationId,
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
        const existingPreconsultation = await ProvisionalPreConsultation.findOne({ where: { id: preconsultationId } });
        if (!existingPreconsultation) {
            throw new Error("No se encontró esta preconsulta");
        }
        await ProvisionalPreConsultation.update({
            lackOfAir: lackOfAir !== undefined ? lackOfAir : existingPreconsultation.lackOfAir,
            lackOfAirAsAlways: lackOfAirAsAlways !== undefined ? lackOfAirAsAlways : existingPreconsultation.lackOfAirAsAlways,
            lackOfAirIncremented: lackOfAirIncremented !== undefined ? lackOfAirIncremented : existingPreconsultation.lackOfAirIncremented,
            lackOfAirClasification: lackOfAirClasification !== undefined ? lackOfAirClasification : existingPreconsultation.lackOfAirClasification,
            chestPainAtRest: chestPainAtRest !== undefined ? chestPainAtRest : existingPreconsultation.chestPainAtRest,
            chestPainOnExertion: chestPainOnExertion !== undefined ? chestPainOnExertion : existingPreconsultation.chestPainOnExertion,
            chestPainOnExertionAmount: chestPainOnExertionAmount !== undefined ? chestPainOnExertionAmount : existingPreconsultation.chestPainOnExertionAmount,
            edemaPresence: edemaPresence !== undefined ? edemaPresence : existingPreconsultation.edemaPresence,
            edemaPresenceDescription: edemaPresenceDescription !== undefined ? edemaPresenceDescription : existingPreconsultation.edemaPresenceDescription,
            feelings: feelings !== undefined ? feelings : existingPreconsultation.feelings,
            healthChanges: healthChanges !== undefined ? healthChanges : existingPreconsultation.healthChanges,
            healthChangesDescription: healthChangesDescription !== undefined ? healthChangesDescription : existingPreconsultation.healthChangesDescription,
            healthWorsened: healthWorsened !== undefined ? healthWorsened : existingPreconsultation.healthWorsened,
            bodyPain: bodyPain !== undefined ? bodyPain : existingPreconsultation.bodyPain,
            mentalHealthAffected: mentalHealthAffected !== undefined ? mentalHealthAffected : existingPreconsultation.mentalHealthAffected,
            mentalHealthAffectedDescription: mentalHealthAffectedDescription !== undefined ? mentalHealthAffectedDescription : existingPreconsultation.mentalHealthAffectedDescription,
            energyStatus: energyStatus !== undefined ? energyStatus : existingPreconsultation.energyStatus,
            feed: feed !== undefined ? feed : existingPreconsultation.feed,
            hydrationStatus: hydrationStatus !== undefined ? hydrationStatus : existingPreconsultation.hydrationStatus,
            urineStatus: urineStatus !== undefined ? urineStatus : existingPreconsultation.urineStatus,
            exerciseStatus: exerciseStatus !== undefined ? exerciseStatus : existingPreconsultation.exerciseStatus,
            abnormalGlycemia: abnormalGlycemia !== undefined ? abnormalGlycemia : existingPreconsultation.abnormalGlycemia,
            lastAbnormalGlycemia: lastAbnormalGlycemia !== undefined ? lastAbnormalGlycemia : existingPreconsultation.lastAbnormalGlycemia,
            physicalExamination: physicalExamination !== undefined ? physicalExamination : existingPreconsultation.physicalExamination,
            laboratoryResults: laboratoryResults !== undefined ? laboratoryResults : existingPreconsultation.laboratoryResults,
            laboratoryResultsDescription: laboratoryResultsDescription !== undefined ? laboratoryResultsDescription : existingPreconsultation.laboratoryResultsDescription,
            electrocardiogram: electrocardiogram !== undefined ? electrocardiogram : existingPreconsultation.electrocardiogram,
            electrocardiogramDescription: electrocardiogramDescription !== undefined ? electrocardiogramDescription : existingPreconsultation.electrocardiogramDescription,
            rxThorax: rxThorax !== undefined ? rxThorax : existingPreconsultation.rxThorax,
            echocardiogram: echocardiogram !== undefined ? echocardiogram : existingPreconsultation.echocardiogram,
            walkTest: walkTest !== undefined ? walkTest : existingPreconsultation.walkTest,
            respiratoryFunctional: respiratoryFunctional !== undefined ? respiratoryFunctional : existingPreconsultation.respiratoryFunctional,
            tomographies: tomographies !== undefined ? tomographies : existingPreconsultation.tomographies,
            rightHeartCatheterization: rightHeartCatheterization !== undefined ? rightHeartCatheterization : existingPreconsultation.rightHeartCatheterization,
            ccg: ccg !== undefined ? ccg : existingPreconsultation.ccg,
            resonance: resonance !== undefined ? resonance : existingPreconsultation.resonance,
            leftHeartCatheterization: leftHeartCatheterization !== undefined ? leftHeartCatheterization : existingPreconsultation.leftHeartCatheterization,
            otherStudies: otherStudies !== undefined ? otherStudies : existingPreconsultation.otherStudies,
            pendingStudies: pendingStudies !== undefined ? pendingStudies : existingPreconsultation.pendingStudies,
            consultationReason: consultationReason !== undefined ? consultationReason : existingPreconsultation.consultationReason,
            importantSymptoms: importantSymptoms !== undefined ? importantSymptoms : existingPreconsultation.importantSymptoms,
            currentMedications: currentMedications !== undefined ? currentMedications : existingPreconsultation.currentMedications,
        },
        {where:{id:preconsultationId}})
        return await ProvisionalPreConsultation.findOne({ where: { id: preconsultationId } })
    } catch (error) {
        throw new Error("Error actualizando la preconsulta: " + error.message);
    }
}

export default patchProvisionalPreConsultationHandler