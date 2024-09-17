import models, { VitalSignDetails } from "../../databaseConfig.js";
import moment from "moment-timezone";
import contextService from "request-context";

const updateOrCreateVitalSignsHandler = async ({
  id,
  vitalSigns,
  transaction,
}) => {
  try {
    const schedulingData = await models.AppointmentScheduling.findByPk(id);
    const patientId = schedulingData.patient;
    const userId = contextService.get("request:user").userId;

    // Validación simplificada de vitalSign
    if (!Array.isArray(vitalSigns)) {
      throw new Error(
        "Los datos proporcionados no se encuentran en un formato válido o no fueron enviados"
      );
    }

    if (vitalSigns.length === 0) {
      return true;
    }

    // Procesar los signos vitales con Promise.all
    await Promise.all(
      vitalSigns.map(async (vs) => {
        if (vs.measure == null) return; // Ignorar si la medida es null

        const data = {
          measure: vs.measure,
          measureSource: userId,
          measureTimestamp: moment().toISOString(),
          medicalEvent: id,
        };

        // Buscar si el signo vital ya existe
        const existingVitalSign = await VitalSignDetails.findOne({
          where: { measureType: vs.measureType, medicalEvent: id },
          transaction,
        });

        if (existingVitalSign) {
          // Actualizar si existe
          await existingVitalSign.update(data, { transaction });
        } else {
          // Crear si no existe
          await VitalSignDetails.create(
            {
              ...data,
              patient: patientId,
              measureType: vs.measureType,
              scheduling: schedulingData.id,
            },
            { transaction }
          );
        }
      })
    );

    return true;
  } catch (error) {
    throw new Error(
      `Hubo un error durante el proceso de actualización o creación de signos vitales: ${error.message}`
    );
  }
};

export default updateOrCreateVitalSignsHandler;
