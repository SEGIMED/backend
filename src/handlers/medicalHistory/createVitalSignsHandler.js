import { VitalSignDetails } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import moment from "moment-timezone";
import contextService from "request-context";

const newVitalSignHandler = async (body) => {
  const { vitalSignsToCreate, patient, appointmentSchedule } = body;

  try {
    // Verificar si ya existen signos vitales para los measureType y appointmentSchedule proporcionados
    const existingVitalSigns = await VitalSignDetails.findAll({
      where: {
        measureType: vitalSignsToCreate.map(
          (vitalSign) => vitalSign.measureType
        ),
        scheduling: appointmentSchedule,
      },
    });

    // Crear un set de measureTypes existentes
    const existingMeasureTypes = new Set(
      existingVitalSigns.map((vitalSign) => vitalSign.measureType)
    );

    // Filtrar signos vitales duplicados
    const uniqueVitalSignsToCreate = vitalSignsToCreate.filter(
      (vitalSign) => !existingMeasureTypes.has(vitalSign.measureType)
    );

    // Si hay signos vitales duplicados, lanzar un error
    if (uniqueVitalSignsToCreate.length < vitalSignsToCreate.length) {
      throw new SegimedAPIError(
        "Ya existe un signo vital para uno o más measureType. Use PATCH para actualizar.",
        400
      );
    }

    // Mapear los signos vitales para la creación
    const mappedVitalSignsToCreate = uniqueVitalSignsToCreate.map(
      (vitalSign) => {
        return {
          patient: patient,
          measure: vitalSign.measure,
          measureSource: contextService.get("request:user").userId,
          measureType: vitalSign.measureType,
          measureTimestamp: moment().format("YYYY-MM-DD HH:mm:ss z"),
          scheduling: appointmentSchedule,
          medicalEvent: vitalSign.medicalEventId,
        };
      }
    );

    // Crear signos vitales
    const createdVitalSigns = await VitalSignDetails.bulkCreate(
      mappedVitalSignsToCreate
    );
    return createdVitalSigns;
  } catch (error) {
    throw new SegimedAPIError(
      "Hubo un error durante el proceso de registro: " + error.message,
      500
    );
  }
};

export default newVitalSignHandler;
