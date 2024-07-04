import { mapAnthropometricDetail } from "./anthropometricDetailsMapper.js";
import { mapVitalSign } from "./vitalSignsMapper.js";
import { mapSociodemographicDetails } from "./sociodemographicDetailsMapper.js";
import { mapPatientMedicalBackground } from "./patientMedicalBackgroundMapper.js";


export const mapPatient = (patient) => {

    return {
        userId: patient.id,
        name: patient.name,
        lastname: patient.lastname,
        geolocation: patient.geolocation,
        cellphone: patient.cellphone,
        currentLocationCity: patient.currentLocationUser ? patient.currentLocationUser?.city : null,
        currentLocationCountry: patient.currentLocationUser ? patient.currentLocationUser?.country : null,
        lastLogin: patient.lastLogin,
        anthropometricDetails: patient.patientAnthDet ? getLatestAnthropometricMeasures(patient.patientAnthDet.map(anthDetail => mapAnthropometricDetail(anthDetail))) : null,
        vitalSigns: patient.patientVitalSignDetails ? getLatestVitalSignsMeasures(patient.patientVitalSignDetails.map(vitalSign => mapVitalSign(vitalSign))) : null,
        sociodemographicDetails: patient.socDemDet ? mapSociodemographicDetails(patient.socDemDet) : null,
        //patientMedicalBackgrounds: patient.patientMedicalBackgrounds ? patient.patientMedicalBackgrounds.map(background => mapPatientMedicalBackground(background)) : null,
        backgrounds: patient.backgrounds.length > 0 ?  patient.backgrounds[0] : null,
        patientPulmonaryHypertensionGroups: patient.userHpGroups ? patient.userHpGroups.map(hpGroup => {
            return {
                group: hpGroup.catHpGroup.name,
                timestamp: hpGroup.timestamp
            }
        }) : null,
        patientPulmonaryHypertensionRisks: patient.patientPulmonaryHypertensionRisks ? patient.patientPulmonaryHypertensionRisks.map(hpRisk => {
            return {
                risk: hpRisk.catHpRisk.name,
                timestamp: hpRisk.registerTimestamp
            }
        }) : null,
        patientCardiovascularRisks: patient.ptCvRsks ? patient.ptCvRsks.map(cardiovascularRisk => {
            return {
                risk: cardiovascularRisk.catCvRisk.name,
                timestamp: cardiovascularRisk.registerTimestamp
            }
        }) : null,
        patientSurgicalRisks: patient.patSgRisks ? patient.patSgRisks.map(surgicalRisk => {
            return {
                risk: surgicalRisk.catSurgicalRisk.name,
                timestamp: surgicalRisk.timestamp
            }
        }) : null,
        lastMedicalEventDate: patient.patientAppScheds.length > 0 ? patient.patientAppScheds[0].scheduledStartTimestamp : null,
        currentPhysician: patient.patientAppScheds.length > 0 ? {
            name: patient.patientAppScheds[0].physicianThatAttend.name,
            lastname: patient.patientAppScheds[0].physicianThatAttend.lastname,
            speciality: patient.patientAppScheds[0].specialty.name
        } : null
    }
}

// Función para obtener las últimas medidas antropométricas por tipo de medida
function getLatestAnthropometricMeasures(anthropometricDetailsArray) {
    const measuresMap = new Map();
    anthropometricDetailsArray.forEach(anthDetail => {
        if (anthDetail) {
            if (measuresMap.has(anthDetail.measureType)) {
                if (measuresMap.get(anthDetail.measureType).measureDate < anthDetail.measureDate) {
                    measuresMap.set(anthDetail.measureType, anthDetail);
                }
            } else {
                measuresMap.set(anthDetail.measureType, anthDetail);
            }
        }
    });
    return Array.from(measuresMap.values());
}

// Función para obtener las últimas medidas de signos vitales por tipo de medida
function getLatestVitalSignsMeasures(vitalSignsArray) {
    const measuresMap = new Map();
    vitalSignsArray.forEach(vitalSign => {
        if (vitalSign) {
            if (measuresMap.has(vitalSign.measureType)) {
                if (measuresMap.get(vitalSign.measureType).measureTimestamp < vitalSign.measureTimestamp) {
                    measuresMap.set(vitalSign.measureType, vitalSign);
                }
            } else {
                measuresMap.set(vitalSign.measureType, vitalSign);
            }
        }
    });
    return Array.from(measuresMap.values());
}