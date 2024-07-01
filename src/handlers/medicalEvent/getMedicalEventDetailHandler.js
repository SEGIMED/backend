import {
    AnthropometricDetails,
    AppointmentScheduling, Backgrounds, CatAnthropometricMeasureType,
    CatCardiovascularRisk,
    CatCivilStatus,
    CatDiagnosticTestType,
    CatDisease,
    CatDrug,
    CatDrugPresentation,
    CatEducationalLevel,
    CatGenre,
    CatHealthCarePlan,
    CatMeasureUnit,
    CatMedicalBackgroundType,
    CatMedicalProcedure,
    CatMedicalProcedureType,
    CatPainAreas,
    CatPainDuration,
    CatPainFrequency,
    CatPainScale,
    CatPainType,
    CatPhysicalSubsystem,
    CatPulmonaryHypertensionGroup,
    CatSurgicalRisk,
    CatVitalSignMeasureType,
    DiagnosticTest, DiagnosticTestPrescription,
    DrugPrescription,
    MedicalEvent, MedicalIndications,
    MedicalProcedurePrescription,
    PatientCardiovascularRisk,
    PatientDiagnostic,
    PatientMedicalBackground,
    PatientPainMap,
    PatientPhysicalExamination,
    PatientPulmonaryHypertensionGroup,
    PatientSurgicalRisk,
    SociodemographicDetails,
    User,
    VitalSignDetails
} from "../../databaseConfig.js";
import {mapMedicalEventDetail} from "../../mapper/medicalEvent/medicalEventDetailMapper.js";


const getMedicalEventDetailHandler = async (medicalEventId) => {
    try {
        const medicalEventDetail = await MedicalEvent.findOne({
                where: {
                    id: medicalEventId
                },
                include: [
                    {
                        model: AppointmentScheduling,
                        as: 'appSch',
                        include: [
                            {
                                model: User,
                                as: 'patientUser',
                                include: [
                                    {
                                        model: SociodemographicDetails,
                                        as: 'socDemDet',
                                        include: [
                                            {
                                                model: CatGenre,
                                                as: 'catGenre',
                                                attributes: ['name']
                                            },
                                            {
                                                model: CatEducationalLevel,
                                                as: 'catEducationalLevel',
                                                attributes: ['name']
                                            },
                                            {
                                                model: CatCivilStatus,
                                                as: 'catCivilStatus',
                                                attributes: ['name']
                                            },
                                            {
                                                model: CatHealthCarePlan,
                                                as: 'catHealthCarePlan',
                                                attributes: ['name'],
                                            }
                                        ]
                                    },
                                    {
                                        model: PatientCardiovascularRisk,
                                        as: 'ptCvRsks',
                                        include: {
                                            model: CatCardiovascularRisk,
                                            as: 'catCvRisk',
                                            attributes: ['name']
                                        }
                                    },
                                    {
                                        model: PatientSurgicalRisk,
                                        as: 'patSgRisks',
                                        include: {
                                            model: CatSurgicalRisk,
                                            as: 'catSurgicalRisk',
                                            attributes: ['name']
                                        }
                                    },
                                    {
                                        model: PatientPulmonaryHypertensionGroup,
                                        as: 'userHpGroups',
                                        include: [
                                            {
                                                model: CatPulmonaryHypertensionGroup,
                                                as: 'catHpGroup'
                                            }
                                        ]
                                    },
                                    {
                                        model: PatientMedicalBackground,
                                        as: 'patientMedicalBackgrounds',
                                        separate: true,
                                        include: [
                                            {
                                                model: CatMedicalBackgroundType,
                                                as: 'medicalBackgroundType',
                                                attributes: ['name']
                                            },
                                            {
                                                model: CatDisease,
                                                as: 'catDisease',
                                                attributes: ['name']
                                            }
                                        ]
                                    },
                                    {
                                        model: Backgrounds,
                                        as: 'backgrounds'
                                    },
                                    {
                                        model: AnthropometricDetails,
                                        as: 'patientAnthDet',
                                        include: {
                                            model: CatAnthropometricMeasureType,
                                            as: 'anthMeasType',
                                            include: {
                                                model: CatMeasureUnit,
                                                as: 'measUnit'
                                            }
                                        }
                                    }
                                ]
                            },
                            {
                                model: VitalSignDetails,
                                as: 'vitalSignDetailsScheduling',
                                separate: true,
                                include: [
                                    {
                                        model: CatVitalSignMeasureType,
                                        as: 'vitalSignMeasureType',
                                        include: {
                                            model: CatMeasureUnit,
                                            as: 'measUnit',
                                        }
                                    }
                                ]
                            },
                            {
                                model: PatientPainMap,
                                as: 'patientPainMaps',
                                include: [
                                    {
                                        model: CatPainDuration,
                                        as: 'catPainDuration'
                                    },
                                    {
                                        model: CatPainAreas,
                                        as: 'catPainArea'
                                    },
                                    {
                                        model: CatPainType,
                                        as: 'catPainType'
                                    },
                                    {
                                        model: CatPainScale,
                                        as: 'catPainScale'
                                    },
                                    {
                                        model: CatPainFrequency,
                                        as: 'catPainFrequency'
                                    },
                                    {
                                        model: User,
                                        as: 'painRecorderUser'
                                    }
                                ]
                            },
                            {
                                model: DiagnosticTest,
                                as: 'schDiagnosticTests',
                                separate: true,
                                include: {
                                    model: CatDiagnosticTestType,
                                    as: 'catDiagnosticTestType'
                                }
                            },
                        ]
                    },
                    {
                        model: PatientPainMap,
                        as: 'patientPainMaps',
                        include: [
                            {
                                model: CatPainDuration,
                                as: 'catPainDuration'
                            },
                            {
                                model: CatPainAreas,
                                as: 'catPainArea'
                            },
                            {
                                model: CatPainType,
                                as: 'catPainType'
                            },
                            {
                                model: CatPainScale,
                                as: 'catPainScale'
                            },
                            {
                                model: CatPainFrequency,
                                as: 'catPainFrequency'
                            },
                            {
                                model: User,
                                as: 'painRecorderUser'
                            }
                        ]
                    },
                    {
                        model: PatientPhysicalExamination,
                        as: 'patientPhysicalExaminations',
                        separate: true,
                        include: {
                            model: CatPhysicalSubsystem,
                            as: 'catPhysicalSubsystem'
                        }
                    },
                    {
                        model: DiagnosticTest,
                        as: 'diagnosticTests',
                        separate: true,
                        include: {
                            model: CatDiagnosticTestType,
                            as: 'catDiagnosticTestType'
                        }
                    },
                    {
                        model: PatientDiagnostic,
                        as: 'patientDiagnostics',
                        separate: true,
                        include: {
                            model: CatDisease,
                            as: 'diagnosedDisease'
                        }
                    },
                    {
                        model: DrugPrescription,
                        as: 'drugPrescriptions',
                        separate: true,
                        include: {
                            model: CatDrug,
                            as: 'catDrug',
                            include: {
                                model: CatDrugPresentation,
                                as: 'catDrugPresentation',
                            }
                        }
                    },
                    {
                        model: MedicalProcedurePrescription,
                        as: 'procedurePrescriptions',
                        separate: true,
                        include: {
                            model: CatMedicalProcedure,
                            as: 'catMedicalProcedure',
                            include: {
                                model: CatMedicalProcedureType,
                                as: 'catMedicalProcedureType',
                            }
                        }
                    },
                    {
                        model: VitalSignDetails,
                        as: 'vitalSignDetailsMedicalEvent',
                        separate: true,
                        include: [
                            {
                                model: CatVitalSignMeasureType,
                                as: 'vitalSignMeasureType',
                                include: {
                                    model: CatMeasureUnit,
                                    as: 'measUnit',
                                }
                            }
                        ]
                    },
                    {
                        model: Backgrounds,
                        as: 'background'
                    },
                    {
                        model: DiagnosticTestPrescription,
                        as: 'diagnosticTestExaminationPrescriptions'
                    },
                    {
                        model: MedicalIndications,
                        as: 'medicalIndications'
                    },
                ]
            }
        );
        return mapMedicalEventDetail(medicalEventDetail);
    } catch (error) {
        throw new Error("Error loading physician: " + error.message);
    }
};

export default getMedicalEventDetailHandler