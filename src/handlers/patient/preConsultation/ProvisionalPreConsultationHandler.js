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
  } = body;

  let studies = [
    { key: 'electrocardiogram', value: electrocardiogram },
    { key: 'rxThorax', value: rxThorax },
    { key: 'echocardiogram', value: echocardiogram },
    { key: 'walkTest', value: walkTest },
    { key: 'respiratoryFunctional', value: respiratoryFunctional },
    { key: 'tomographies', value: tomographies },
    { key: 'rightHeartCatheterization', value: rightHeartCatheterization },
    { key: 'ccg', value: ccg },
    { key: 'resonance', value: resonance },
    { key: 'leftHeartCatheterization', value: leftHeartCatheterization },
    { key: 'otherStudies', value: otherStudies },
    { key: 'laboratoryResults', value: laboratoryResults },
  ];

  await Promise.all(studies.map(async studio => {
    if (studio.value) {
      // let parsetStudy = JSON.parse(studio.value);
      const file = await loadFile(studio.value);
      // body[studio.key] = file?.url;
      return { key: studio.key, value: file };
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
      physicalExamination,
      laboratoryResults: body.laboratoryResults,
      laboratoryResultsDescription,
      electrocardiogram: body.electrocardiogram,
      electrocardiogramDescription,
      rxThorax: body.rxThorax,
      echocardiogram: body.echocardiogram,
      walkTest: body.walkTest,
      respiratoryFunctional: body.respiratoryFunctional,
      tomographies: body.tomographies,
      rightHeartCatheterization: body.rightHeartCatheterization,
      ccg: body.ccg,
      resonance: body.resonance,
      leftHeartCatheterization: body.leftHeartCatheterization,
      otherStudies: body.otherStudies,
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