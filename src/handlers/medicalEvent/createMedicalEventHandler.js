import {
  AppointmentScheduling,
  CatSchedulingStatus,
  MedicalEvent,
  sequelize,
} from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";

const createMedicalEventHandler = async (body) => {
  const {
    physicianComments,
    schedulingId,
    chiefComplaint,
    historyOfPresentIllness,
    reviewOfSystems,
    treatmentPlan,
    pendingDiagnosticTest,
    alarmPattern,
  } = body;
  try {
    return await sequelize.transaction(async (t) => {
      const newMedicalEvent = await MedicalEvent.create({
        physicianComments,
        scheduling: schedulingId,
        chiefComplaint,
        historyOfPresentIllness,
        reviewOfSystems,
        treatmentPlan,
        pendingDiagnosticTest,
        alarmPattern,
      });
      const medicalEventScheduling = await AppointmentScheduling.findOne({
        where: {
          id: schedulingId,
        },
      });
      const attendedStatus = await CatSchedulingStatus.findOne({
        where: {
          name: "Atendida",
        },
      });
      medicalEventScheduling.schedulingStatus = attendedStatus.id;
      await medicalEventScheduling.save();
      return newMedicalEvent;
    });
  } catch (error) {
    throw new SegimedAPIError("Error al crear la consulta", 500);
  }
};

export default createMedicalEventHandler;
