import models, { VitalSignDetails } from "../../databaseConfig.js";
import moment from "moment-timezone";
import contextService from "request-context";

const updateOrCreateVitalSignsHandler = async ({
  id, 
  vitalSigns,
  transaction,
}) => {
  try {
    const medicalEventData = await models.MedicalEvent.findByPk(id);
    if (!medicalEventData) {
      throw new Error(
        "No se encontró el evento médico con el ID proporcionado."
      );
    }

    const schedulingData = await models.AppointmentScheduling.findOne({
      where: {
        id: medicalEventData.scheduling,
      },
    });
    if (!schedulingData) {
      throw new Error(
        "No se encontró la programación asociada al evento médico."
      );
    }

    const patientId = schedulingData.patient;
    const userId = contextService.get("request:user").userId;

    // Validación simplificada de vitalSigns
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

        // Si el signo vital tiene un ID, verificar que corresponda al evento médico actual
        if (vs.id) {
          const existingVitalSign = await VitalSignDetails.findByPk(vs.id, {
            transaction,
          });

          if (!existingVitalSign) {
            throw new Error(
              `No se encontró un signo vital con el ID ${vs.id}.`
            );
          }

          // Verificar que el signo vital pertenece al evento médico correcto
          if (existingVitalSign.medicalEvent !== id) {
            throw new Error(
              `El signo vital con ID ${vs.id} no está asociado al evento médico proporcionado.`
            );
          }
        }

        const data = {
          measure: vs.measure,
          measureSource: userId,
          measureTimestamp: moment().toISOString(),
          medicalEvent: id,
        };

        // Buscar si el signo vital ya existe (si no tenía ID o si ya verificamos su correspondencia)
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
