import models, { sequelize } from "../../databaseConfig.js";
import createBackgroundsHandler from "../../handlers/Backgrounds/createBackgroundsHandler.js";

const createBackgroundsController = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { id } = req.query;
    const background = req.body;
    const medicalEvent = await models.MedicalEvent.findByPk(id);
    if (!medicalEvent) throw new Error("La consulta no es válida");
    const appointmentSchedule = await models.AppointmentScheduling.findOne({
      where: {
        id: medicalEvent.scheduling,
      },
    });
    const patientId = appointmentSchedule.patient;
    const backgroundResponse = await createBackgroundsHandler({
      id,
      appointmentSchedule: appointmentSchedule.id,
      patientId,
      background,
      transaction,
    });
    await transaction.commit();
    return res.status(200).json(backgroundResponse);
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({ error: error.message });
  }
};

export default createBackgroundsController;
