import models from "../../../../databaseConfig.js";

const patchPreconsultationHandler = async ({
  id,
  preconsultation,
  transaction,
}) => {
  try {
    console.log("Datos de preconsulta:", preconsultation);

    const medicalEvent = await models.MedicalEvent.findByPk(id);
    const existingPreconsultation =
      await models.ProvisionalPreConsultation.findOne({
        where: { appointmentSchedule: medicalEvent.scheduling },
      });

    if (!existingPreconsultation) {
      throw new Error("No se encontró la preconsulta con el ID proporcionado.");
    }

    const updatedData = {
      lackOfAir:
        preconsultation.lackOfAir !== undefined
          ? preconsultation.lackOfAir
          : existingPreconsultation.lackOfAir,
      lackOfAirAsAlways:
        preconsultation.lackOfAirAsAlways !== undefined
          ? preconsultation.lackOfAirAsAlways
          : existingPreconsultation.lackOfAirAsAlways,
      lackOfAirClasification:
        preconsultation.lackOfAirClasification !== undefined
          ? preconsultation.lackOfAirClasification
          : existingPreconsultation.lackOfAirClasification,
      chestPainAtRest:
        preconsultation.chestPainAtRest !== undefined
          ? preconsultation.chestPainAtRest
          : existingPreconsultation.chestPainAtRest,
      chestPainOnExertion:
        preconsultation.chestPainOnExertion !== undefined
          ? preconsultation.chestPainOnExertion
          : existingPreconsultation.chestPainOnExertion,
      chestPainOnExertionAmount:
        preconsultation.chestPainOnExertionAmount !== undefined
          ? preconsultation.chestPainOnExertionAmount
          : existingPreconsultation.chestPainOnExertionAmount,
      edemaPresence:
        preconsultation.edemaPresence !== undefined
          ? preconsultation.edemaPresence
          : existingPreconsultation.edemaPresence,
      edemaPresenceDescription:
        preconsultation.edemaPresenceDescription !== undefined
          ? preconsultation.edemaPresenceDescription
          : existingPreconsultation.edemaPresenceDescription,
      feelings:
        preconsultation.feelings !== undefined
          ? preconsultation.feelings
          : existingPreconsultation.feelings,
      healthChanges:
        preconsultation.healthChanges !== undefined
          ? preconsultation.healthChanges
          : existingPreconsultation.healthChanges,
      healthChangesDescription:
        preconsultation.healthChangesDescription !== undefined
          ? preconsultation.healthChangesDescription
          : existingPreconsultation.healthChangesDescription,
      healthWorsened:
        preconsultation.healthWorsened !== undefined
          ? preconsultation.healthWorsened
          : existingPreconsultation.healthWorsened,
      bodyPain:
        preconsultation.bodyPain !== undefined
          ? preconsultation.bodyPain
          : existingPreconsultation.bodyPain,
      mentalHealthAffected:
        preconsultation.mentalHealthAffected !== undefined
          ? preconsultation.mentalHealthAffected
          : existingPreconsultation.mentalHealthAffected,
      mentalHealthAffectedDescription:
        preconsultation.mentalHealthAffectedDescription !== undefined
          ? preconsultation.mentalHealthAffectedDescription
          : existingPreconsultation.mentalHealthAffectedDescription,
      energyStatus:
        preconsultation.energyStatus !== undefined
          ? preconsultation.energyStatus
          : existingPreconsultation.energyStatus,
      feed:
        preconsultation.feed !== undefined
          ? preconsultation.feed
          : existingPreconsultation.feed,
      hydrationStatus:
        preconsultation.hydrationStatus !== undefined
          ? preconsultation.hydrationStatus
          : existingPreconsultation.hydrationStatus,
      urineStatus:
        preconsultation.urineStatus !== undefined
          ? preconsultation.urineStatus
          : existingPreconsultation.urineStatus,
      exerciseStatus:
        preconsultation.exerciseStatus !== undefined
          ? preconsultation.exerciseStatus
          : existingPreconsultation.exerciseStatus,
      abnormalGlycemia:
        preconsultation.abnormalGlycemia !== undefined
          ? preconsultation.abnormalGlycemia
          : existingPreconsultation.abnormalGlycemia,
      physicalExamination:
        preconsultation.physicalExamination !== undefined
          ? preconsultation.physicalExamination
          : existingPreconsultation.physicalExamination,
      respiratoryFunctional:
        preconsultation.respiratoryFunctional !== undefined
          ? preconsultation.respiratoryFunctional
          : existingPreconsultation.respiratoryFunctional,
      pendingStudies:
        preconsultation.pendingStudies !== undefined
          ? preconsultation.pendingStudies
          : existingPreconsultation.pendingStudies,
      consultationReason:
        preconsultation.consultationReason !== undefined
          ? preconsultation.consultationReason
          : existingPreconsultation.consultationReason,
      importantSymptoms:
        preconsultation.importantSymptoms !== undefined
          ? preconsultation.importantSymptoms
          : existingPreconsultation.importantSymptoms,
      currentMedications:
        preconsultation.currentMedications !== undefined
          ? preconsultation.currentMedications
          : existingPreconsultation.currentMedications,
      lackOfAirIncremented:
        preconsultation.lackOfAirIncremented !== undefined
          ? preconsultation.lackOfAirIncremented
          : existingPreconsultation.lackOfAirIncremented,
    };

    console.log(existingPreconsultation);
    console.log("Datos a actualizar:", updatedData);
    existingPreconsultation.set(updatedData);
    await existingPreconsultation.save({ transaction });

    return true;
  } catch (error) {
    console.error(error);
    throw new Error(
      "Ocurrió un error al guardar los datos de la preconsulta: " +
        error.message
    );
  }
};

export default patchPreconsultationHandler;
