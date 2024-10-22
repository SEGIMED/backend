import models from "../../databaseConfig.js";
import universalOrderByHandler from "../Pagination/universalOrderByHandler.js";
import universalPaginationHandler from "../Pagination/universalPaginationHandler.js";

const getVitalSignsHandler = async ({
  patientId,
  medicalSpecialtyId,
  physicianId,
  page,
  limit,
  onlySelfEvaluations = false,
}) => {
  try {
    const filters = {
      schedulingStatus: 2,
    };
    if (patientId) {
      filters.patient = parseInt(patientId);
    }
    if (medicalSpecialtyId) filters.medicalSpecialty = medicalSpecialtyId;
    if (physicianId) filters.physician = physicianId;

    let medicalEvent = [];
    let selfEvaluation = [];

    if (!onlySelfEvaluations) {
      medicalEvent = await models.MedicalEvent.findAll({
        attributes: ["id"],
        include: [
          {
            model: models.AppointmentScheduling,
            as: "appSch",
            where: filters,
            attributes: ["scheduledStartTimestamp", "reasonForConsultation"],
            include: [
              {
                model: models.User,
                as: "patientUser",
                attributes: ["id"],
                include: {
                  model: models.PatientPulmonaryHypertensionGroup,
                  as: "userHpGroups",
                  attributes: ["id"],
                  include: [
                    {
                      model: models.CatRisk,
                      as: "catHpGroup",
                      attributes: ["name"],
                    },
                  ],
                },
              },
              {
                model: models.PhysicianAttendancePlace,
                as: "attendancePlace",
              },
            ],
          },
          {
            model: models.VitalSignDetails,
            as: "vitalSignDetailsMedicalEvent",
            attributes: {
              exclude: [
                "patient",
                "measure_source",
                "measure_type",
                "measureType",
                "selfEvaluationEvent",
              ],
            },
            include: [
              {
                model: models.CatVitalSignMeasureType,
                as: "vitalSignMeasureType",
                attributes: ["name"],
                include: {
                  model: models.CatMeasureUnit,
                  as: "measUnit",
                  attributes: ["name"],
                },
              },
            ],
          },
        ],
      });
    }

    if ((!physicianId && !medicalSpecialtyId) || onlySelfEvaluations) {
      selfEvaluation = await models.SelfEvaluationEvent.findAll({
        where: { patient: patientId },
        attributes: {
          exclude: ["patient", "updated_at"],
        },
        include: [
          {
            model: models.VitalSignDetails,
            as: "vitalSigns",
            attributes: {
              exclude: [
                "patient",
                "measure_source",
                "measure_type",
                "measureType",
                "medicalEvent",
                "scheduling",
              ],
            },
            include: [
              {
                model: models.CatVitalSignMeasureType,
                as: "vitalSignMeasureType",
                attributes: ["name"],
                include: {
                  model: models.CatMeasureUnit,
                  as: "measUnit",
                  attributes: ["name"],
                },
              },
            ],
          },
          {
            model: models.GlycemiaRecords,
            attributes: ["value"],
            as: "glycemia",
          },
        ],
      });
    }

    const formattedMedicalEvent = medicalEvent.map((me) => ({
      ...me.toJSON(),
      date: me.appSch.scheduledStartTimestamp,
    }));
    const formattedSelfEvaluations = selfEvaluation
      .filter((se) => se.vitalSigns && se.vitalSigns.length > 0)
      .map((se) => ({
        ...se.toJSON(),
        date: se.created_at,
      }));

    let combinedResults = [];

    if (onlySelfEvaluations) {
      combinedResults = formattedSelfEvaluations;
    } else {
      combinedResults = formattedMedicalEvent.concat(formattedSelfEvaluations);
    }

    if (page && limit) {
      const pagination = await universalOrderByHandler(
        combinedResults,
        "date",
        false
      );
      return universalPaginationHandler(pagination, page, limit);
    }

    return combinedResults;
  } catch (error) {
    console.log(error);
    throw new Error("Ocurrió un error al recuperar los signos vitales");
  }
};

export default getVitalSignsHandler;
