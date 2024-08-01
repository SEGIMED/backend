import { VitalSignDetails } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import moment from "moment-timezone";
import contextService from "request-context";

const updateOrCreateVitalSignsHandler = async (body,{transaction}) => {
  const { updateVitalSigns, patient, appointmentSchedule } = body;

  try {
    //Validación. Si se envía el objeto updateVitalSigns pero es diferente a un array, retorna error
    if (updateVitalSigns && !Array.isArray(updateVitalSigns)) {
      throw new SegimedAPIError(
        "Los datos proporcionados no se encuentran en un formato válido o no fueron enviados",
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
            transaction
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
                  transaction
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
            },{
              transaction
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
    throw new SegimedAPIError(
      "Hubo un error durante el proceso de actualización o creación de signos vitales: " + error.message,
      500
    );
  }
};

export default updateOrCreateVitalSignsHandler;
