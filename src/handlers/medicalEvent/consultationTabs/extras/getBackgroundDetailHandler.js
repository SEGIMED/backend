import models from "../../../../databaseConfig.js";
import getLastMedicalEventHandler from "../../getLastMedicalEventHandler.js";

const getBackgroundDetailHandler = async ({ id }) => {
  try {
    const lastMedicalEvent = await getLastMedicalEventHandler({
      id,
      forBackground: true,
    });
    if (!lastMedicalEvent) {
      return null;
    }
    const backgroundData = await models.Backgrounds.findOne({
      where: {
        medicalEvent: lastMedicalEvent,
      },
      attributes: {
        exclude: [
          "appointment_scheduling",
          "medicalEvent",
          "appointmentScheduling",
          "patient",
        ],
      },
      include: {
        model: models.User,
        as: "patientUser",
        attributes: ["id"],
        include: [
          {
            model: models.PatientPulmonaryHypertensionGroup,
            as: "userHpGroups",
            attributes: ["id"],
            include: {
              model: models.CatRisk,
              as: "catHpGroup",
              attributes: ["name"],
            },
          },
          {
            model: models.PatientCardiovascularRisk,
            as: "ptCvRsks",
            attributes: ["risk"],
            include: {
              model: models.CatRisk,
              as: "catCvRisk",
              attributes: ["name"],
            },
          },
          {
            model: models.PatientSurgicalRisk,
            as: "patSgRisks",
            attributes: ["timestamp"],
            include: {
              model: models.CatRisk,
              as: "catSurgicalRisk",
              attributes: ["name"],
            },
          },
          {
            model: models.PatientPulmonaryHypertensionRisk,
            as: "patPHRisks",
            separate: true,
            attributes: {
              exclude: ["patient", "physician"],
            },
            order: [["registerTimestamp", "DESC"]],
            include: {
              model: models.CatRisk,
              as: "catHpRisk",
              attributes: ["name"],
            },
          },
          {
            model: models.UserComorbidities,
            as: "comorbidities",
            attributes: ["diseaseId"],
            include: {
              model: models.CatComorbiditiesDiseases,
              as: "disease",
              attributes: ["name"],
            },
          },
        ],
      },
    });
    if (backgroundData === null) return null;
    const background = backgroundData.get({ plain: true });
    const firstRisk =
      background?.patientUser?.patPHRisks[
        background.patientUser?.patPHRisks?.length - 1
      ] ?? null;
    const lastRisk = background?.patientUser?.patPHRisks[0] ?? null;
    background.patientUser.patPHRisks = { firstRisk, lastRisk };
    return background;
  } catch (error) {
    throw new Error("Error al recuperar los antecedentes: " + error.message);
  }
};
export default getBackgroundDetailHandler;
