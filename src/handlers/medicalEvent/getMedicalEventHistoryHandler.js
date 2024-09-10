import {
  AnthropometricDetails,
  AppointmentScheduling,
  Backgrounds,
  CatAnthropometricMeasureType,
  CatAppointmentModality,
  CatDiagnosticTestType,
  CatHeartFailureClassification,
  CatMeasureUnit,
  CatMedicalProcedure,
  CatMedicalProcedureType,
  CatMedicalSpecialty,
  CatPainDuration,
  CatPainFrequency,
  CatPainScale,
  CatPainType,
  CatPhysicalSubsystem,
  CatPulmonaryHypertensionGroup,
  CatSurgicalRisk,
  CatVitalSignMeasureType,
  DrugPrescription,
  MedicalEvent,
  MedicalIndications,
  MedicalProcedurePrescription,
  PatientHeartFailureClassification,
  PatientPainMap,
  PatientPhysicalExamination,
  PatientPulmonaryHypertensionGroup,
  PatientStudies,
  PatientSurgicalRisk,
  PhysicianAttendancePlace,
  ProvisionalPreConsultation,
  SubCategoriesCieDiez,
  User,
  VitalSignDetails,
} from "../../databaseConfig.js";
import { mapMedicalEvent } from "../../mapper/medicalEvent/medicalEventMapper.js";
import interconsultationsMapper from "../../mapper/interconsultation/interconsultationsMapper.js";
import getInterconsultationsByPatientIdHandler from "./getInterconsultationsByPatientIdHandler.js";
import universalPaginationHandler from "../Pagination/universalPaginationHandler.js";

const getMedicalEventHistoryHandler = async (
  patientId,
  physicianId,
  page,
  limit
) => {
  try {
    const filters = {
      schedulingStatus: 2, // 2 = atendida
    };
    if (patientId) {
      filters.patient = patientId;
    }
    if (physicianId) {
      filters.physician = physicianId;
    }

    const medicalEventHistory = await MedicalEvent.findAll({
      include: [
        {
          model: SubCategoriesCieDiez,
          as: "diagnosedDisease",
        },
        {
          model: AppointmentScheduling,
          as: "appSch",
          where: filters,
          include: [
            {
              model: ProvisionalPreConsultation,
              as: "ProvisionalPreConsultationSchedule",
            },
            {
              model: PatientStudies,
              as: "appointmentStudies",
            },
            {
              model: User,
              as: "patientUser",
              include: [
                {
                  model: PatientPulmonaryHypertensionGroup,
                  as: "userHpGroups",
                  include: [
                    {
                      model: CatPulmonaryHypertensionGroup,
                      as: "catHpGroup",
                    },
                  ],
                },
                {
                  model: PatientSurgicalRisk,
                  as: "patSgRisks",
                  include: {
                    model: CatSurgicalRisk,
                    as: "catSurgicalRisk",
                    attributes: ["name"],
                  },
                },
                {
                  model: PatientHeartFailureClassification,
                  as: "patientHeartFailureClassifications",
                  separate: true,
                  include: {
                    model: CatHeartFailureClassification,
                    as: "CatHeartFailureClass",
                    attributes: ["name"],
                  },
                },
                {
                  model: AnthropometricDetails,
                  as: "patientAnthDet",
                  include: {
                    model: CatAnthropometricMeasureType,
                    as: "anthMeasType",
                    include: {
                      model: CatMeasureUnit,
                      as: "measUnit",
                    },
                  },
                },
              ],
            },
            {
              model: PatientPainMap,
              as: "patientPainMap",
              include: [
                {
                  model: CatPainDuration,
                  as: "painDurationDetail",
                },
                {
                  model: CatPainType,
                  as: "painTypeDetail",
                },
                {
                  model: CatPainScale,
                  as: "painScaleDetail",
                },
                {
                  model: CatPainFrequency,
                  as: "painFrequencyDetail",
                },
                {
                  model: User,
                  as: "painRecorderUser",
                },
              ],
            },
            {
              model: User,
              as: "physicianThatAttend",
            },
            {
              model: CatMedicalSpecialty,
              as: "specialty",
            },
            {
              model: CatAppointmentModality,
              as: "appointmentModality",
            },
            {
              model: PhysicianAttendancePlace,
              as: "attendancePlace",
            },
            {
              model: VitalSignDetails,
              as: "vitalSignDetailsScheduling",
              separate: true,
              include: [
                {
                  model: CatVitalSignMeasureType,
                  as: "vitalSignMeasureType",
                  include: {
                    model: CatMeasureUnit,
                    as: "measUnit",
                  },
                },
              ],
            },
          ],
        },
        {
          model: PatientPainMap,
          as: "patientPainMap",
          include: [
            {
              model: CatPainDuration,
              as: "painDurationDetail",
            },
            {
              model: CatPainType,
              as: "painTypeDetail",
            },
            {
              model: CatPainScale,
              as: "painScaleDetail",
            },
            {
              model: CatPainFrequency,
              as: "painFrequencyDetail",
            },
            {
              model: User,
              as: "painRecorderUser",
            },
          ],
        },
        {
          model: PatientPhysicalExamination,
          as: "patientPhysicalExaminations",
          separate: true,
          include: {
            model: CatPhysicalSubsystem,
            as: "catPhysicalSubsystem",
          },
        },
        {
          model: VitalSignDetails,
          as: "vitalSignDetailsMedicalEvent",
          separate: true,
          include: [
            {
              model: CatVitalSignMeasureType,
              as: "vitalSignMeasureType",
              include: {
                model: CatMeasureUnit,
                as: "measUnit",
              },
            },
          ],
        },
        {
          model: Backgrounds,
          as: "background",
        },
        {
          model: DrugPrescription,
          as: "drugPrescriptions",
          separate: true,
          // include: {
          //   model: CatDrug,
          //   as: "catDrug",
          //   include: {
          //     model: CatDrugPresentation,
          //     as: "catDrugPresentation",
          //   },
          // },
        },
        {
          model: MedicalProcedurePrescription,
          as: "procedurePrescriptions",
          separate: true,
          include: {
            model: CatMedicalProcedure,
            as: "catMedicalProcedure",
            include: {
              model: CatMedicalProcedureType,
              as: "catMedicalProcedureType",
            },
          },
        },
        {
          model: MedicalIndications,
          as: "medicalIndications",
        },
      ],
    });

    const medicalEvent = medicalEventHistory.map((medicalEvent) =>
      mapMedicalEvent(medicalEvent)
    );

    const interconsultations = await getInterconsultationsByPatientIdHandler(
      patientId
    );
    const interconsultasArray = interconsultationsMapper(interconsultations);
    if (page && limit) {
      return universalPaginationHandler(
        medicalEvent.concat(interconsultasArray),
        page,
        limit
      );
    } else {
      return medicalEvent.concat(interconsultasArray);
    }
  } catch (error) {
    throw new Error("Error loading physician: " + error.message);
  }
};

export default getMedicalEventHistoryHandler;
