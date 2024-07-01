import {
    CatAnthropometricMeasureType,
    CatAppointmentModality,
    CatCardiovascularRisk,
    CatChatStatus,
    CatCity,
    CatCivilStatus,
    CatCountry,
    CatDiagnosticTestType,
    CatDisease,
    CatDrug,
    CatDrugPresentation,
    CatEducationalLevel,
    CatGenre,
    CatHealthCarePlan,
    CatHeartFailureClassification,
    CatIdType,
    CatMeasureUnit,
    CatMedicalBackgroundType,
    CatMedicalProcedure,
    CatMedicalProcedureType,
    CatMedicalRegistrationType,
    CatMedicalSpecialty,
    CatPhysicalSubsystem,
    CatPhysicianExpertiseLevel,
    CatProvince,
    CatPulmonaryArterialHypertensionRisk,
    CatRole,
    CatSchedulingStatus,
    CatTherapy,
    CatVitalSignMeasureType,
    CatWeekDay,
    CatPainAreas,
    CatPainDuration,
    CatPainFrequency,
    CatPainScale,
    CatPainType,
    CatSurgicalRisk,
    CatPulmonaryHypertensionGroup,

} from "../../databaseConfig.js";

import SegimedAPIError from "../../error/SegimedAPIError.js";

const getCatalogHandler = async (catalogName) => {

    try {
        switch (catalogName.toUpperCase()) {
            case 'ROLES':
                return await CatRole.findAll()
            case 'ID_TYPES':
                return await CatIdType.findAll()
            case 'WEEK_DAYS':
                return await CatWeekDay.findAll()
            case 'MEDICAL_SPECIALTIES':
                return await CatMedicalSpecialty.findAll()
            case 'MEDICAL_REGISTRATION_TYPES':
                return await CatMedicalRegistrationType.findAll()
            case 'COUNTRIES':
                return await CatCountry.findAll()
            case 'CITIES':
                return await CatCity.findAll()
            case 'SCHEDULING_STATUSES':
                return await CatSchedulingStatus.findAll()
            case 'APPOINTMENT_MODALITIES':
                return await CatAppointmentModality.findAll()
            case 'DRUG_PRESENTATIONS':
                return await CatDrugPresentation.findAll()
            case 'MEASURE_UNITS':
                return await CatMeasureUnit.findAll()
            case 'DRUGS':
                return await CatDrug.findAll()
            case 'VITAL_SIGNS_MEASURE_TYPES':
                return await CatVitalSignMeasureType.findAll()
            case 'DIAGNOSTICS_TEST_TYPES':
                return await CatDiagnosticTestType.findAll()
            case 'CHAT_STATUSES':
                return await CatChatStatus.findAll()
            case 'ANTHROPOMETRIC_MEASURE_TYPES':
                return await CatAnthropometricMeasureType.findAll()
            case 'DISEASES':
                return await CatDisease.findAll()
            case 'MEDICAL_BACKGROUND_TYPES':
                return await CatMedicalBackgroundType.findAll()
            case 'MEDICAL_PROCEDURES':
                return await CatMedicalProcedure.findAll()
            case 'MEDICAL_PROCEDURE_TYPES':
                return await CatMedicalProcedureType.findAll()
            case 'PROVINCES':
                return await CatProvince.findAll()
            case 'THERAPIES':
                return await CatTherapy.findAll()
            case 'GENRES':
                return await CatGenre.findAll()
            case 'EDUCATIONAL_LEVELS':
                return await CatEducationalLevel.findAll()
            case 'CIVIL_STATUSES':
                return await CatCivilStatus.findAll()
            case 'HEALTH_CARE_PLANS':
                return await CatHealthCarePlan.findAll()
            case 'PHYSICAL_SUBSYSTEMS':
                return await CatPhysicalSubsystem.findAll()
            case 'PHYSICIAN_EXPERTISE_LEVELS':
                return await CatPhysicianExpertiseLevel.findAll()
            case 'CARDIOVASCULAR_RISKS':
                return await CatCardiovascularRisk.findAll()
            case 'HEART_FAILURE_CLASSIFICATIONS':
                return await CatHeartFailureClassification.findAll()
            case 'PULMONARY_ARTERIAL_HYPERTENSION_RISKS':
                return await CatPulmonaryArterialHypertensionRisk.findAll()
            case 'PAIN_AREAS':
                return await CatPainAreas.findAll()
            case 'PAIN_DURATIONS':
                return await CatPainDuration.findAll()
            case 'PAIN_FREQUENCIES':
                return await CatPainFrequency.findAll()
            case 'PAIN_SCALES':
                return await CatPainScale.findAll()
            case 'PAIN_TYPES':
                return await CatPainType.findAll()
            case 'SURGICAL_RISKS':
                return await CatSurgicalRisk.findAll()
            case 'HP_GROUPS':
                return await CatPulmonaryHypertensionGroup.findAll()


            default:
                throw new SegimedAPIError("El catálogo solicitado no fue encontrado", 404)
        }
    } catch (error) {
        if (error instanceof SegimedAPIError && error.errorCode === 404) {
            throw error
        } else {
            throw new SegimedAPIError("Hubo un error al consultar el catálogo", 500)
        }
    }

};

export default getCatalogHandler;

