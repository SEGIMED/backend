import { mapVitalSign } from "./vitalSignsMapper.js";
import { mapSociodemographicDetails } from "./sociodemographicDetailsMapper.js";

export const mapPatient = (patient) => {
  return {
    userId: patient?.id,
    name: patient?.name,
    email: patient?.email,
    lastname: patient?.lastname,
    geolocation: patient?.geolocation,
    cellphone: patient?.cellphone,
    avatar: patient?.avatar,
    currentLocationCity: patient?.currentLocationUser?.city || null,
    currentLocationCountry: patient?.currentLocationUser?.country || null,
    lastLogin: patient?.lastLogin,
    vitalSigns: patient.patientVitalSignDetails
      ? getLatestVitalSignsMeasures(
          patient.patientVitalSignDetails.map((vitalSign) =>
            mapVitalSign(vitalSign)
          )
        )
      : [],
    sociodemographicDetails: patient.socDemDet
      ? mapSociodemographicDetails(patient.socDemDet)
      : null,
    backgrounds: patient.backgrounds.length > 0 ? patient.backgrounds[0] : null,

    patientPulmonaryHypertensionGroups: patient?.userHpGroups
      ? {
          group: patient?.userHpGroups?.catHpGroup?.name || null,
          timestamp: patient?.userHpGroups?.timestamp,
        }
      : null,
    patientPulmonaryHypertensionRisks:
      patient.patPHRisks.length > 0
        ? {
            risk:
              patient.patPHRisks[0].catHpRisk?.name ||
              null,
            timestamp:
              patient.patPHRisks[0].registerTimestamp,
          }
        : null,
    patientCardiovascularRisks: patient?.ptCvRsks?.catCvRisk
      ? {
          risk: patient.ptCvRsks.catCvRisk?.name || null,
          timestamp: patient.ptCvRsks.registerTimestamp,
        }
      : null,
    patientSurgicalRisks: patient?.patSgRisks
      ? {
          risk: patient.patSgRisks.catSurgicalRisk?.name || null,
          timestamp: patient.patSgRisks.timestamp,
        }
      : null,
    lastMedicalEventDate:
      patient.patientAppScheds.length > 0
        ? patient.patientAppScheds[0].scheduledStartTimestamp
        : null,
    currentPhysician:
      patient.patientAppScheds.length > 0
        ? {
            name: patient.patientAppScheds[0].physicianThatAttend?.name || null,
            lastname:
              patient.patientAppScheds[0].physicianThatAttend?.lastname || null,
            speciality: patient.patientAppScheds[0].specialty?.name || null,
          }
        : null,
  };
};


// Función para obtener las últimas medidas de signos vitales por tipo de medida
function getLatestVitalSignsMeasures(vitalSignsArray) {
  const measuresMap = new Map();
  vitalSignsArray.forEach((vitalSign) => {
    if (vitalSign) {
      if (measuresMap.has(vitalSign.measureType)) {
        if (
          measuresMap.get(vitalSign.measureType).measureTimestamp <
          vitalSign.measureTimestamp
        ) {
          measuresMap.set(vitalSign.measureType, vitalSign);
        }
      } else {
        measuresMap.set(vitalSign.measureType, vitalSign);
      }
    }
  });
  return Array.from(measuresMap.values());
}

export const mapPatients = (patients) => {
  return patients.map((patient) => {
    const { favorites, ...patientData } = patient.toJSON();

    return {
      ...patientData,
      patientPulmonaryHypertensionRisks:
        patient.patPHRisks?.length > 0
          ? {
              risk:
                patient.patPHRisks[0].catHpRisk?.name ||
                null,
              timestamp:
                patient.patPHRisks[0].registerTimestamp,
            }
          : null,
      isFavorite: favorites?.length > 0,
    };
  });
};

export const mapPatientsSchedule = (patients) => {
  return patients.map((patient) => ({
    ...patient.toJSON(),
    patientUser: {
      name: patient.patientUser?.name || null,
      lastname: patient.patientUser?.lastname || null,
      avatar: patient.patientUser?.avatar || null,
      patientPulmonaryHypertensionRisks:
        patient.patientUser?.patPHRisks?.length > 0
          ? {
              risk:
                patient.patientUser.patPHRisks[0]
                  .catHpRisk?.name || null,
              timestamp:
                patient.patientUser.patPHRisks[0]
                  .registerTimestamp,
            }
          : null,
    },
  }));
};
