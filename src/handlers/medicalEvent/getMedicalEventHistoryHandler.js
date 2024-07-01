import {
    AnthropometricDetails,
    AppointmentScheduling,
    Backgrounds,
    CatAnthropometricMeasureType,
    CatAppointmentModality,
    CatDiagnosticTestType,
    CatDisease,
    CatDrug,
    CatDrugPresentation,
    CatHeartFailureClassification,
    CatMeasureUnit,
    CatMedicalProcedure,
    CatMedicalProcedureType,
    CatMedicalSpecialty,
    CatPainAreas,
    CatPainDuration,
    CatPainFrequency,
    CatPainScale,
    CatPainType,
    CatPhysicalSubsystem,
    CatPulmonaryHypertensionGroup,
    CatSurgicalRisk,
    CatVitalSignMeasureType,
    DiagnosticTest,
    DiagnosticTestPrescription,
    DrugPrescription,
    MedicalEvent,
    MedicalIndications,
    MedicalProcedurePrescription,
    PatientDiagnostic,
    PatientHeartFailureClassification,
    PatientPainMap,
    PatientPhysicalExamination,
    PatientPulmonaryHypertensionGroup,
    PatientSurgicalRisk,
    PhysicianAttendancePlace,
    User,
    VitalSignDetails
} from "../../databaseConfig.js";
import {mapMedicalEvent} from "../../mapper/medicalEvent/medicalEventMapper.js";

const getMedicalEventHistoryHandler = async (patientId, physicianId) => {
    try {
        const filters = {}
        if (patientId) {
            filters.patient = patientId
        }
        if (physicianId) {
            filters.physician = physicianId
        }

        const medicalEventHistory = await MedicalEvent.findAll(
            {
                include: [
                    {
                        model: AppointmentScheduling,
                        as: 'appSch',
                        where: filters,
                        include: [
                            {
                                model: User,
                                as: 'patientUser',
                                include: [
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
                                        model: PatientSurgicalRisk,
                                        as: 'patSgRisks',
                                        include: {
                                            model: CatSurgicalRisk,
                                            as: 'catSurgicalRisk',
                                            attributes: ['name']
                                        }
                                    },
                                    {
                                        model: PatientHeartFailureClassification,
                                        as: 'patientHeartFailureClassifications',
                                        separate: true,
                                        include: {
                                            model: CatHeartFailureClassification,
                                            as: 'CatHeartFailureClass',
                                            attributes: ['name']
                                        }
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
                                model: User,
                                as: 'physicianThatAttend'
                            },
                            {
                                model: CatMedicalSpecialty,
                                as: 'specialty'
                            },
                            {
                                model: CatAppointmentModality,
                                as: 'appointmentModality'
                            },
                            {
                                model: PhysicianAttendancePlace,
                                as: 'attendancePlace'
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
                        model: DiagnosticTestPrescription,
                        as: 'diagnosticTestExaminationPrescriptions'
                    },
                    {
                        model: MedicalIndications,
                        as: 'medicalIndications'
                    }
                ]
            }
        );

        return medicalEventHistory.map(medicalEvent => mapMedicalEvent(medicalEvent));
    } catch (error) {
        throw new Error("Error loading physician: " + error.message);
    }
};

export default getMedicalEventHistoryHandler;