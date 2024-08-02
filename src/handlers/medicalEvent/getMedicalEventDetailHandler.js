import { Op } from "sequelize";
import {
  AnthropometricDetails,
  AppointmentScheduling,
  Backgrounds,
  CatAnthropometricMeasureType,
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
  DiagnosticTest,
  DiagnosticTestPrescription,
  DrugPrescription,
  MedicalEvent,
  MedicalIndications,
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
  VitalSignDetails,
} from "../../databaseConfig.js";

import { mapMedicalEventDetail } from "../../mapper/medicalEvent/medicalEventDetailMapper.js";
import { consultationVitalSignsMapper } from "../../mapper/patient/consultationVitalSignsMapper.js";

const getMedicalEventDetailHandler = async ({ medicalEventId, scheduleId }) => {
  const query = {
    where: {
      [Op.or]: [],
    },
    include: [
      {
        model: PatientDiagnostic,
        as: "patientDiagnostics",
        separate: true,
        include: {
          model: CatDisease,
          as: "diagnosedDisease",
        },
      },
      {
        model: DrugPrescription,
        as: "drugPrescriptions", // Alias para DrugPrescription
        include: [
          // {
          //   model: User,
          //   as: "patient_user", // Alias para el paciente en DrugPrescription
          //   attributes: ["id", "name", "lastname"], // Campos necesarios
          // },
          // {
          //   model: User,
          //   as: "prescribed_physician_user", // Alias para el médico prescriptor en DrugPrescription
          //   attributes: ["id", "name", "lastname"], // Campos necesarios
          // },
          {
            model: CatDrug,
            as: "catDrug", // Alias para CatDrug
            attributes: ["id", "name"], // Campos necesarios
          },
        ],
      },
      {
        model: AppointmentScheduling,
        as: "appSch",
        include: [
          {
            model: User,
            as: "patientUser",
            include: [
              {
                model: SociodemographicDetails,
                as: "socDemDet",
                include: [
                  {
                    model: CatEducationalLevel,
                    as: "catEducationalLevel",
                    attributes: ["name"],
                  },
                  {
                    model: CatCivilStatus,
                    as: "catCivilStatus",
                    attributes: ["name"],
                  },
                  {
                    model: CatHealthCarePlan,
                    as: "catHealthCarePlan",
                    attributes: ["name"],
                  },
                ],
              },
              {
                model: PatientCardiovascularRisk,
                as: "ptCvRsks",
                include: {
                  model: CatCardiovascularRisk,
                  as: "catCvRisk",
                  attributes: ["name"],
                },
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
                model: PatientMedicalBackground,
                as: "patientMedicalBackgrounds",
                separate: true,
                include: [
                  {
                    model: CatMedicalBackgroundType,
                    as: "medicalBackgroundType",
                    attributes: ["name"],
                  },
                  {
                    model: CatDisease,
                    as: "catDisease",
                    attributes: ["name"],
                  },
                ],
              },
              {
                model: Backgrounds,
                as: "backgrounds",
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
          {
            model: PatientPainMap,
            as: "patientPainMaps",
            include: [
              {
                model: CatPainDuration,
                as: "catPainDuration",
              },
              {
                model: CatPainType,
                as: "catPainType",
              },
              {
                model: CatPainScale,
                as: "catPainScale",
              },
              {
                model: CatPainFrequency,
                as: "catPainFrequency",
              },
              {
                model: User,
                as: "painRecorderUser",
              },
            ],
          },
          {
            model: DiagnosticTest,
            as: "schDiagnosticTests",
            separate: true,
            include: {
              model: CatDiagnosticTestType,
              as: "catDiagnosticTestType",
            },
          },
        ],
      },
      {
        model: PatientPainMap,
        as: "patientPainMaps",
        include: [
          {
            model: CatPainDuration,
            as: "catPainDuration",
          },
          {
            model: CatPainType,
            as: "catPainType",
          },
          {
            model: CatPainScale,
            as: "catPainScale",
          },
          {
            model: CatPainFrequency,
            as: "catPainFrequency",
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
        model: DiagnosticTest,
        as: "diagnosticTests",
        separate: true,
        include: {
          model: CatDiagnosticTestType,
          as: "catDiagnosticTestType",
        },
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
        model: DiagnosticTestPrescription,
        as: "diagnosticTestExaminationPrescriptions",
      },
      {
        model: MedicalIndications,
        as: "medicalIndications",
      },
    ],
  };

  try {
    if (typeof medicalEventId !== "undefined") {
      query.where[Op.or].push({ id: medicalEventId });
    }
    if (typeof scheduleId !== "undefined") {
      query.where[Op.or].push({ scheduling: scheduleId });
    }

    const medicalEventDetail = await MedicalEvent.findOne(query);
    if (!medicalEventDetail) {
      throw new Error(
        "No se encontró ningún evento con los datos proporcionados"
      );
    }
    // const mapMedicalEvent = mapMedicalEventDetail(medicalEventDetail);
    const mapMedicalEvent = medicalEventDetail;
    const vitalSigns = await consultationVitalSignsMapper(
      medicalEventDetail.appSch?.vitalSignDetailsScheduling || []
    );
    mapMedicalEvent.vitalSigns = vitalSigns;

    return mapMedicalEvent;
  } catch (error) {
    throw new Error("Error loading physician: " + error.message);
  }
};

export default getMedicalEventDetailHandler;
