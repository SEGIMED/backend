import models from "../../databaseConfig.js";

const getNewPatientDetailsHandler = async (id) => {
  try {
    const user = await models.User.findOne({
      where: {
        role: 3,
        id,
      },
      attributes: ["name", "lastname"],
      include: [
        {
          model: models.SociodemographicDetails,
          as: "socDemDet",
          attributes: ["birthDate", "dateOfDeathReport"],
        },
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
          model: models.AppointmentScheduling,
          where: {
            scheduling_status: 2,
          },
          as: "patientAppScheds",
          separate: true,
          attributes: ["scheduledStartTimestamp"],
          order: [["scheduledStartTimestamp", "DESC"]],
          limit: 1,
        },
        {
          model: models.Backgrounds,
          as: "backgrounds",
          attributes: {
            exclude: [
              "timestamp",
              "medicalEvent",
              "appointmentScheduling",
              "patient",
              "appointment_scheduling",
            ],
          },
          order: [["timestamp", "DESC"]],
          limit: 1,
        },
      ],
    });

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const result = {
      ...user.toJSON(),
      backgrounds: user.backgrounds?.[0] || null,
      patientAppScheds: user.patientAppScheds?.[0] || null,
    };
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export default getNewPatientDetailsHandler;
