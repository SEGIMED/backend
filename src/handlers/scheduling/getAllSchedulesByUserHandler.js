import models, {
  CatRisk,
  PatientPulmonaryHypertensionRisk,
} from "../../databaseConfig.js";
import { mapPatientsSchedule } from "../../mapper/patient/patientMapper.js";

const getAllSchedulesByUserHandler = async (userId, userRole) => {
  try {
    let role;
    if (userRole === "Paciente") {
      role = "patient";
    } else {
      role = "physician";
    }

    const schedules = await models.AppointmentScheduling.findAll({
      where: {
        [`${role}`]: userId,
      },
      include: [
        {
          model: models.User,
          as: "physicianThatAttend",
          attributes: {
            exclude: ["password", "email", "createdAt", "updatedAt"],
          },
        },
        {
          model: models.User,
          as: "patientUser",
          attributes: ["name", "lastname", "avatar"],
          include: [
            {
              model: PatientPulmonaryHypertensionRisk,
              as: "patPHRisks",
              include: {
                model: CatRisk,
                as: "catHpRisk",
                attributes: ["name"],
              },
            },
          ],
        },
        {
          model: models.MedicalEvent,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          as: "medicalEvent",
          attributes: ["id"],
        },
      ],
    });
    return mapPatientsSchedule(schedules);
  } catch (error) {
    throw new Error("Error loading schedules: " + error.message);
  }
};

export default getAllSchedulesByUserHandler;
