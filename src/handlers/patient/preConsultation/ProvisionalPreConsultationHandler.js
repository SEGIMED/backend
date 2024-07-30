import { ProvisionalPreConsultation } from "../../../databaseConfig.js";
import { loadFile } from "../../../utils/cloudinary/cloudinary.js";

const createPreConsultationHandler = async (body) => {
  let {
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

  await Promise.all(Object.keys(studies).map(async studio => {
    if (studies[studio]) {
      // let parsetStudy = JSON.parse(studies[studio]);
      const file = await loadFile(studies[studio]);
      studies = { ...studies, [studio]: file?.url }
      return;
    }
  }));
  

  try {
    const PreConsultation = await ProvisionalPreConsultation.create({
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
      // physicalExamination,
      laboratoryResults: studies.laboratoryResults,
      laboratoryResultsDescription,
      electrocardiogram: studies.electrocardiogram,
      electrocardiogramDescription,
      rxThorax: studies.rxThorax,
      echocardiogram: studies.echocardiogram,
      walkTest: studies.walkTest,
      respiratoryFunctional: studies.respiratoryFunctional,
      tomographies: studies.tomographies,
      rightHeartCatheterization: studies.rightHeartCatheterization,
      ccg: studies.ccg,
      resonance: studies.resonance,
      leftHeartCatheterization: studies.leftHeartCatheterization,
      otherStudies: studies.otherStudies,
      pendingStudies: pendingStudies,
      consultationReason,
      importantSymptoms,
      currentMedications,
    });
    return PreConsultation;
  } catch (error) {
    throw new Error("Hubo un error al crear la preconsulta: " + error.message);
  }
};

export default createPreConsultationHandler;