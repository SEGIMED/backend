import models from "../../databaseConfig.js";
import { painAreaNameMap } from "../../mapper/painMap/painMapMapper.js";
import universalPaginationHandler from "../Pagination/universalPaginationHandler.js";

const getPainMapHandler = async (patientId, page, limit) => {
  try {
    const consultations = await models.MedicalEvent.findAll({
      attributes: ["id"],
      include: [
        {
          model: models.AppointmentScheduling,
          as: "appSch",
          where: {
            schedulingStatus: 2,
            patient: patientId,
          },
          attributes: ["scheduledStartTimestamp", "reasonForConsultation"],
          include: [
            {
              model: models.User,
              as: "patientUser",
              attributes: ["id"],
              include: [
                {
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
              ],
            },
            {
              model: models.PhysicianAttendancePlace,
              as: "attendancePlace",
            },
          ],
        },

        {
          model: models.PatientPainMap,
          as: "patientPainMap",
          attributes: {
            exclude: [
              "id",
              "painScale",
              "painDuration",
              "painType",
              "painFrequency",
              "medicalEvent",
              "scheduling",
            ],
          },
          include: [
            {
              model: models.CatPainDuration,
              as: "painDurationDetail",
              attributes: ["name"],
            },
            {
              model: models.CatPainType,
              as: "painTypeDetail",
              attributes: ["name"],
            },
            {
              model: models.CatPainScale,
              as: "painScaleDetail",
              attributes: ["name"],
            },
            {
              model: models.CatPainFrequency,
              as: "painFrequencyDetail",
              attributes: ["name"],
            },
          ],
        },
      ],
    });
    const selfEvaluations = await models.SelfEvaluationEvent.findAll({
      where: {
        patient: patientId,
      },
      attributes: ["created_at"],
      include: [
        {
          model: models.PatientPainMap,
          as: "patientPainMap",
          attributes: {
            exclude: [
              "id",
              "painScale",
              "painDuration",
              "painType",
              "painFrequency",
              "medicalEvent",
              "scheduling",
            ],
          },
          include: [
            {
              model: models.CatPainDuration,
              as: "painDurationDetail",
              attributes: ["name"],
            },
            {
              model: models.CatPainType,
              as: "painTypeDetail",
              attributes: ["name"],
            },
            {
              model: models.CatPainScale,
              as: "painScaleDetail",
              attributes: ["name"],
            },
            {
              model: models.CatPainFrequency,
              as: "painFrequencyDetail",
              attributes: ["name"],
            },
          ],
        },
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
      ],
    });

    const formattedConsultations = consultations.map((consultation) => ({
      ...consultation.toJSON(),
      date: consultation.appSch.scheduledStartTimestamp,
      patientPainMap: {
        ...consultation.patientPainMap.toJSON(),
        painAreas: consultation.patientPainMap.painAreas.map((area) => ({
          painArea: painAreaNameMap(parseInt(area.painArea)),
          painNotes: area.painNotes,
        })),
      },
    }));
    const filteredSelfEvaluations = selfEvaluations.filter(
      (evaluation) =>
        evaluation.patientPainMap &&
        Object.keys(evaluation.patientPainMap).length > 0
    );

    const formattedSelfEvaluations = filteredSelfEvaluations.map(
      (evaluation) => ({
        ...evaluation.toJSON(),
        reasonForConsultation: "Autoevaluación",
        attendancePlace: "En casa",
        date: evaluation.created_at,
        patientPainMap: {
          ...evaluation.patientPainMap.toJSON(),
          painAreas: evaluation.patientPainMap.painAreas.map((area) => ({
            painArea: painAreaNameMap(parseInt(area.painArea)),
            painNotes: area.painNotes,
          })),
        },
      })
    );

    const combinedResults = [
      ...formattedConsultations,
      ...formattedSelfEvaluations,
    ];

    combinedResults.sort((a, b) => new Date(a.date) - new Date(b.date));

    if (page && limit) {
      return universalPaginationHandler(combinedResults, page, limit);
    }

    return combinedResults;
  } catch (error) {
    throw new Error(error);
  }
};

export default getPainMapHandler;
