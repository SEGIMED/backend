import { ProvisionalPreConsultation } from "../../../databaseConfig.js";
import { loadFile } from "../../../utils/cloudinary/cloudinary.js";

const patchProvisionalPreConsultationHandler = async (
  body,
  { transaction }
) => {
  const {
    appointmentSchedule,
    lackOfAir,
    // lackOfAirAsAlways,
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
    // physicalExamination,
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
    status,
  } = body;

  let studies = {
    electrocardiogram,
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
    laboratoryResults,
  };

  await Promise.all(
    Object.keys(studies).map(async (studio) => {
      if (studies[studio]) {
        // let parsetStudy = JSON.parse(studies[studio]);
        const file = await loadFile(studies[studio]);
        studies = { ...studies, [studio]: file?.url };
        return;
      }
    })
  );

  try {
    const existingPreconsultation = await ProvisionalPreConsultation.findOne({
      where: { appointmentSchedule },
    });
    if (!existingPreconsultation) {
      throw new Error("No se encontró esta preconsulta");
    }
    //TODO HACERLO como proissAll
    const [numberOfAffectedRows, updatedPreconsultation] =
      await ProvisionalPreConsultation.update(
        {
          lackOfAir:
            lackOfAir !== undefined
              ? lackOfAir
              : existingPreconsultation.lackOfAir,
          // lackOfAirAsAlways: lackOfAirAsAlways !== undefined ? lackOfAirAsAlways : existingPreconsultation.lackOfAirAsAlways,
          lackOfAirIncremented:
            lackOfAirIncremented !== undefined
              ? lackOfAirIncremented
              : existingPreconsultation.lackOfAirIncremented,
          lackOfAirClasification:
            lackOfAirClasification !== undefined
              ? lackOfAirClasification
              : existingPreconsultation.lackOfAirClasification,
          chestPainAtRest:
            chestPainAtRest !== undefined
              ? chestPainAtRest
              : existingPreconsultation.chestPainAtRest,
          chestPainOnExertion:
            chestPainOnExertion !== undefined
              ? chestPainOnExertion
              : existingPreconsultation.chestPainOnExertion,
          chestPainOnExertionAmount:
            chestPainOnExertionAmount !== undefined
              ? chestPainOnExertionAmount
              : existingPreconsultation.chestPainOnExertionAmount,
          edemaPresence:
            edemaPresence !== undefined
              ? edemaPresence
              : existingPreconsultation.edemaPresence,
          edemaPresenceDescription:
            edemaPresenceDescription !== undefined
              ? edemaPresenceDescription
              : existingPreconsultation.edemaPresenceDescription,
          feelings:
            feelings !== undefined
              ? feelings
              : existingPreconsultation.feelings,
          healthChanges:
            healthChanges !== undefined
              ? healthChanges
              : existingPreconsultation.healthChanges,
          healthChangesDescription:
            healthChangesDescription !== undefined
              ? healthChangesDescription
              : existingPreconsultation.healthChangesDescription,
          healthWorsened:
            healthWorsened !== undefined
              ? healthWorsened
              : existingPreconsultation.healthWorsened,
          bodyPain:
            bodyPain !== undefined
              ? bodyPain
              : existingPreconsultation.bodyPain,
          mentalHealthAffected:
            mentalHealthAffected !== undefined
              ? mentalHealthAffected
              : existingPreconsultation.mentalHealthAffected,
          mentalHealthAffectedDescription:
            mentalHealthAffectedDescription !== undefined
              ? mentalHealthAffectedDescription
              : existingPreconsultation.mentalHealthAffectedDescription,
          energyStatus:
            energyStatus !== undefined
              ? energyStatus
              : existingPreconsultation.energyStatus,
          feed: feed !== undefined ? feed : existingPreconsultation.feed,
          hydrationStatus:
            hydrationStatus !== undefined
              ? hydrationStatus
              : existingPreconsultation.hydrationStatus,
          urineStatus:
            urineStatus !== undefined
              ? urineStatus
              : existingPreconsultation.urineStatus,
          exerciseStatus:
            exerciseStatus !== undefined
              ? exerciseStatus
              : existingPreconsultation.exerciseStatus,
          abnormalGlycemia:
            abnormalGlycemia !== undefined
              ? abnormalGlycemia
              : existingPreconsultation.abnormalGlycemia,
          lastAbnormalGlycemia:
            lastAbnormalGlycemia !== undefined
              ? lastAbnormalGlycemia
                  ?.map((a) => parseInt(a))
                  .filter((a) => !isNaN(a))
              : existingPreconsultation.lastAbnormalGlycemia,
          // physicalExamination: physicalExamination !== undefined ? physicalExamination : existingPreconsultation.physicalExamination,
          laboratoryResults:
            laboratoryResults !== undefined
              ? studies.laboratoryResults
              : existingPreconsultation.laboratoryResults,
          laboratoryResultsDescription:
            laboratoryResultsDescription !== undefined
              ? laboratoryResultsDescription
              : existingPreconsultation.laboratoryResultsDescription,
          electrocardiogram:
            electrocardiogram !== undefined
              ? studies.electrocardiogram
              : existingPreconsultation.electrocardiogram,
          electrocardiogramDescription:
            electrocardiogramDescription !== undefined
              ? electrocardiogramDescription
              : existingPreconsultation.electrocardiogramDescription,
          rxThorax:
            rxThorax !== undefined
              ? studies.rxThorax
              : existingPreconsultation.rxThorax,
          echocardiogram:
            echocardiogram !== undefined
              ? studies.echocardiogram
              : existingPreconsultation.echocardiogram,
          walkTest:
            walkTest !== undefined
              ? studies.walkTest
              : existingPreconsultation.walkTest,
          respiratoryFunctional:
            respiratoryFunctional !== undefined
              ? studies.respiratoryFunctional
              : existingPreconsultation.respiratoryFunctional,
          tomographies:
            tomographies !== undefined
              ? studies.tomographies
              : existingPreconsultation.tomographies,
          rightHeartCatheterization:
            rightHeartCatheterization !== undefined
              ? studies.rightHeartCatheterization
              : existingPreconsultation.rightHeartCatheterization,
          ccg: ccg !== undefined ? studies.ccg : existingPreconsultation.ccg,
          resonance:
            resonance !== undefined
              ? studies.resonance
              : existingPreconsultation.resonance,
          leftHeartCatheterization:
            leftHeartCatheterization !== undefined
              ? studies.leftHeartCatheterization
              : existingPreconsultation.leftHeartCatheterization,
          otherStudies:
            otherStudies !== undefined
              ? studies.otherStudies
              : existingPreconsultation.otherStudies,
          pendingStudies:
            pendingStudies !== undefined
              ? pendingStudies
              : existingPreconsultation.pendingStudies,
          consultationReason:
            consultationReason !== undefined
              ? consultationReason
              : existingPreconsultation.consultationReason,
          importantSymptoms:
            importantSymptoms !== undefined
              ? importantSymptoms
              : existingPreconsultation.importantSymptoms,
          currentMedications:
            currentMedications !== undefined
              ? currentMedications
              : existingPreconsultation.currentMedications,
          status:
            status !== undefined ? status : existingPreconsultation.status,
        },
        {
          where: { appointmentSchedule },
          returning: true,
          transaction,
        }
      );

    return updatedPreconsultation[0];
  } catch (error) {
    throw new Error("Error actualizando la preconsulta: " + error.message);
  }
};

export default patchProvisionalPreConsultationHandler;
