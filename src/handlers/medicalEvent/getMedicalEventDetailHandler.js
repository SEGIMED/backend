import { Op } from "sequelize";
import {
  AppointmentScheduling,
  Backgrounds,
  CatCardiovascularRisk,
  CatCivilStatus,
  CatDrug,
  CatEducationalLevel,
  CatGenre,
  CatHealthCarePlan,
  CatMeasureUnit,
  CatMedicalProcedure,
  CatMedicalProcedureType,
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
  PatientCardiovascularRisk,
  PatientDiagnostics,
  PatientPainMap,
  PatientPhysicalExamination,
  PatientPulmonaryHypertensionGroup,
  PatientStudies,
  PatientSurgicalRisk,
  ProvisionalPreConsultation,
  SociodemographicDetails,
  SubCategoriesCieDiez,
  TherapyPrescription,
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
        model: PatientDiagnostics,
        as: "medicalEventDiagnostics",
        attributes:["id"],
        include: {
          model: SubCategoriesCieDiez,
          as:"cie10subCategory",
          attributes: ["description"]
        }
      },
      {
        model: DrugPrescription,
        as: "drugPrescriptions",
        include: [
          {
            model: CatDrug,
            as: "catDrug",
            attributes: ["id", "name"],
          },
        ],
      },
      {
        model: AppointmentScheduling,
        as: "appSch",
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
                model: SociodemographicDetails,
                as: "socDemDet",
                include: [
                  {
                    model: CatGenre,
                    as: "catGenre",
                    attributes: ["name"],
                  },
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
                model: Backgrounds,
                as: "backgrounds",
              },
              // {
              //   model: AnthropometricDetails,
              //   as: "patientAnthDet",
              //   include: {
              //     model: CatAnthropometricMeasureType,
              //     as: "anthMeasType",
              //     include: {
              //       model: CatMeasureUnit,
              //       as: "measUnit",
              //     },
              //   },
              // },
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
        model: TherapyPrescription,
        as: "therapyPrescriptions",
        separate: true,
        // include: {
        //   model: CatMedicalProcedure,
        //   as: "catMedicalProcedure",
        //   include: {
        //     model: CatMedicalProcedureType,
        //     as: "catMedicalProcedureType",
        //   },
        // },
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
    const mapMedicalEvent = mapMedicalEventDetail(medicalEventDetail);
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
