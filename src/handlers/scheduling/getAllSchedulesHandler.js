import {
  AppointmentScheduling,
  User,
  PatientPulmonaryHypertensionRisk,
  CatPulmonaryArterialHypertensionRisk,
} from "../../databaseConfig.js";

import { mapPatientsSchedule } from "../../mapper/patient/patientMapper.js";

const getAllSchedulesHandler = async (patientId, physicianId, id) => {
  try {
    const filters = {};
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
      ],
    });
    return mapPatientsSchedule(schedules);
  } catch (error) {
    throw new Error("Error loading schedules: " + error.message);
  }
};

export default getAllSchedulesHandler;
