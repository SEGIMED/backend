import { VitalSignDetails } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import moment from "moment-timezone";
import contextService from "request-context";

const updateOrCreateVitalSignsHandler = async (body) => {
  const { updateVitalSigns, patient, appointmentSchedule } = body;

  try {
    if (updateVitalSigns && !Array.isArray(updateVitalSigns)) {
      throw new SegimedAPIError(
        "No se proporcionaron signos vitales para actualizar o crear.",
        400
      );
    }
    //Validación. Si no vienen signos vitales para actualizar, se retorna []
    if (updateVitalSigns?.length !== 0 && updateVitalSigns) {
      const updatedOrCreatedVitalSigns = await Promise.all(
        updateVitalSigns.map(async (vitalSign) => {
          // Verificar si el signo vital ya existe
          const existingVitalSign = await VitalSignDetails.findOne({
            where: {
              measureType: vitalSign.measureType,
              scheduling: appointmentSchedule,
            },
          });

          if (existingVitalSign) {
            // Si existe, actualizarlo
            const [affectedCount, [updatedVitalSign]] =
              await VitalSignDetails.update(
                {
                  measure: vitalSign.measure,
                  measureSource: contextService.get("request:user").userId,
                  measureTimestamp: moment().format("YYYY-MM-DD HH:mm:ss z"),
                },
                {
                  where: {
                    id: existingVitalSign.id,
                  },
                  returning: true,
                }
              );
            return updatedVitalSign;
          } else {
            // Si no existe, crearlo
            const newVitalSign = await VitalSignDetails.create({
              patient: patient,
              measure: vitalSign.measure,
              measureSource: contextService.get("request:user").userId,
              measureType: vitalSign.measureType,
              measureTimestamp: moment().format("YYYY-MM-DD HH:mm:ss z"),
              scheduling: appointmentSchedule,
              medicalEvent: vitalSign.medicalEventId,
            });
            return newVitalSign;
          }
        })
      );

      return updatedOrCreatedVitalSigns;
    } else {
      return [];
    }
  } catch (error) {
    throw new Error(
      "Hubo un error durante el proceso de actualización o creación de signos vitales." +
        error.message,
      500
    );
  }
};

export default updateOrCreateVitalSignsHandler;
