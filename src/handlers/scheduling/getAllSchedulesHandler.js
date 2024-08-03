import { Sequelize } from "sequelize";
import {
  AppointmentScheduling,
  User,
  PatientPulmonaryHypertensionRisk,
  CatPulmonaryArterialHypertensionRisk,
  MedicalEvent,
} from "../../databaseConfig.js";

import { mapPatientsSchedule } from "../../mapper/patient/patientMapper.js";

const getAllSchedulesHandler = async (patientId, physicianId, id) => {
  try {
    const filters = {
      schedulingStatus: {
        [Sequelize.Op.ne]: 5, // Excluye filas donde schedulingStatus es igual a 5
      },
    };
    if (patientId) {
      filters.patient = patientId;
    }
    if (physicianId) {
      filters.physician = physicianId;
    }
    if (id) {
      filters.id = id;
    }
    const schedules = await AppointmentScheduling.findAll({
      where: filters,
      include: [
        {
          model: User,
          as: "patientUser",
          attributes: ["name", "lastname", "avatar"],
          include: [
            {
              model: PatientPulmonaryHypertensionRisk,
              as: "patientPulmonaryHypertensionRisks",
              include: {
                model: CatPulmonaryArterialHypertensionRisk,
                as: "catHpRisk",
                attributes: ["name"],
              },
            },
          ],
        },

        {
          model: User,
          as: "physicianThatAttend",
          attributes: ["name", "lastname", "avatar"],
        },
        {
          model: MedicalEvent,
          as: "medicalEvent",
          attributes:["id"]
        }
      ],
    });
    return mapPatientsSchedule(schedules);
  } catch (error) {
    throw new Error("Error loading schedules: " + error.message);
  }
};

export default getAllSchedulesHandler;
