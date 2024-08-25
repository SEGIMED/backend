export const mapVitalSingsME = (medicalEvents) => {
  // console.log(medicalEvents);
  return medicalEvents.map((medicalEvent) => {
    const groupHTP =
      medicalEvent.vitalSignDetailsMedicalEvent[0]?.measSourceUser.userHpGroups
        .dataValues;
    return {
      id: medicalEvent.id,
      timestamp: medicalEvent.appSch.scheduledEndTimestamp,
      reasonForConsultation: medicalEvent.appSch.reasonForConsultation,
      healthCenter: medicalEvent.appSch.healthCenterDetails.name,
      HTPGroup: { group: groupHTP.group, description: groupHTP.catHpG },
    };
  });
};
export const mapVitalDetailSingsDetail = (vitalSigns) => {
  return vitalSigns.map((vitalS) => {
    console.log(vitalS.dataValues);
    return {
      id: vitalS.id,
      measure: vitalS.measure,
      // measuteTypeId: vitalS.measure_type,
      // measuteType: vitalS.vitalSignMeasureType,
      measureNameSring: vitalS.vitalSignMeasureType.name,
      measureSring:
        vitalS.measure + " " + vitalS.vitalSignMeasureType.measUnit.name,
      // otros atributos
    };
  });
};
