export const mapVitalSingsME = (medicalEvents, groupHTP) => {
  return medicalEvents.map((medicalEvent) => {
    return {
      id: medicalEvent.id,
      timestamp: medicalEvent.appSch.scheduledEndTimestamp,
      reasonForConsultation: medicalEvent.appSch.reasonForConsultation,
      healthCenter: medicalEvent.appSch.healthCenterDetails.name,
      HTPGroup: groupHTP,
    };
  });
};

export const mapVitalSingsSEE = (SEEvents, groupHTP) => {
  return SEEvents.map((SEEvent) => {
    return {
      id: SEEvent.id,
      timestamp: SEEvent.dataValues.created_at,
      reasonForConsultation: "Autoevaluación de signos vitales",
      healthCenter: "Autoevaluación Online",
      HTPGroup: groupHTP,
    };
  });
};

export const mapVitalDetailSingsDetail = (vitalSigns) => {
  return vitalSigns.map((vitalS) => {
    return {
      id: vitalS.id,
      measure: vitalS.measure,
      measureNameSring: vitalS.vitalSignMeasureType.name,
      measureSring:
        vitalS.measure + " " + vitalS.vitalSignMeasureType.measUnit.name,
    };
  });
};
