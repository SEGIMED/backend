import models, { sequelize } from "../../../../databaseConfig.js";
import createBackgroundsHandler from "../../../Backgrounds/createBackgroundsHandler.js";
import createPatientHpGroupHandler from "../../../patient/createPatientHpGroupHandler.js";
import postRisksHandler from "../extras/postRisksHandler.js";

const postBackgroundTabHandler = async ({
  id,
  risks,
  hpGroupIds,
  background,
}) => {
  const transaction = await sequelize.transaction();
  try {
    const medicalEvent = await models.MedicalEvent.findByPk(id);
    if (!medicalEvent) throw new Error("La consulta no es válida");
    const appointmentSchedule = await models.AppointmentScheduling.findOne({
      where: {
        id: medicalEvent.scheduling,
      },
    });
    const patientId = appointmentSchedule.patient;
    const risksResponse = await postRisksHandler({
      risks,
      patientId,
      transaction,
    });
    const htpGroupResponse = await createPatientHpGroupHandler({
      patientId,
      hpGroupIds,
      transaction,
    });
    const backgroundResponse = await createBackgroundsHandler({
      id,
      appointmentSchedule: appointmentSchedule.id,
      patientId,
      background,
      transaction,
    });
    await transaction.commit();
    return { ...risksResponse, htpGroupResponse, backgroundResponse };
  } catch (error) {
    await transaction.rollback();
    throw new Error(
      "Ocurrió un error al guardar los cambios de antecedentes: " +
        error.message
    );
  }
};
export default postBackgroundTabHandler;