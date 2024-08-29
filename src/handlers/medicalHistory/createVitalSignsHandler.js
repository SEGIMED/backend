/* este handler cuando le enviamos un array con distintas medidas las crea siempre que no sean para el mismo usuario,
 * controla que esa medida no haya sido ingresada anteriormentem. Deja la del primer ingreso.
 * debuelve solo los cambio, si no ha cambios debuelve []
 *
 */
import {
  VitalSignDetails,
  SelfEvaluationEvent,
  sequelize,
} from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import moment from "moment-timezone";
import contextService from "request-context";

const newVitalSignHandler = async (body) => {
  const { vitalSignsToCreate, patient, appointmentSchedule, medicalEvent } =
    body;
  let selfEvaluationEvent;

  // Iniciar la transacción
  const transaction = await sequelize.transaction();

  try {
    if (medicalEvent) {
      // Verificar si ya existen signos vitales para los measureType y appointmentSchedule proporcionados
      const existingVitalSigns = await VitalSignDetails.findAll({
        where: {
          measureType: vitalSignsToCreate.map(
            (vitalSign) => vitalSign.measureType
          ),
          scheduling: appointmentSchedule,
        },
        transaction,
      });

      // Crear un set de measureTypes existentes
      const existingMeasureTypes = new Set(
        existingVitalSigns.map((vitalSign) => vitalSign.measureType)
      );

      // Filtrar signos vitales duplicados
      const uniqueVitalSignsToCreate = vitalSignsToCreate.filter(
        (vitalSign) => !existingMeasureTypes.has(vitalSign.measureType)
      );

      // Mapear los signos vitales para la creación
      const mappedVitalSignsToCreate = uniqueVitalSignsToCreate.map(
        (vitalSign) => {
          return {
            patient: patient,
            measure: vitalSign.measure,
            measureSource: contextService.get("request:user").userId,
            measureType: vitalSign.measureType,
            measureTimestamp: moment().format("YYYY-MM-DD HH:mm:ss z"),
            scheduling: appointmentSchedule || null,
            medicalEvent: medicalEvent || null,
            selfEvaluationEvent: null, // Esta columna no la necesitamos cuando está relacionado a un ME
          };
        }
      );

      // Crear signos vitales
      const createdVitalSignsME = await VitalSignDetails.bulkCreate(
        mappedVitalSignsToCreate,
        { transaction }
      );

      await transaction.commit();
      return createdVitalSignsME;
    } else {
      // Crear SelfEvaluationEvent
      let createdSelfEvaluation = await SelfEvaluationEvent.create(
        { patient: patient },
        { transaction }
      );
      selfEvaluationEvent = createdSelfEvaluation.dataValues.id;

      // Mapear los signos vitales para la creación
      const mappedVitalSignsToCreate = vitalSignsToCreate.map((vitalSign) => {
        return {
          patient: patient,
          measure: vitalSign.measure,
          measureSource: contextService.get("request:user").userId,
          measureType: vitalSign.measureType,
          measureTimestamp: moment().format("YYYY-MM-DD HH:mm:ss z"),
          scheduling: appointmentSchedule || null,
          medicalEvent: null, // Esta columna no la necesitamos cuando está relacionado a un SEE
          selfEvaluationEvent: selfEvaluationEvent,
        };
      });

      // Crear signos vitales
      const createdVitalSigns = await VitalSignDetails.bulkCreate(
        mappedVitalSignsToCreate,
        { transaction }
      );

      await transaction.commit();
      return createdVitalSigns;
    }
  } catch (error) {
    await transaction.rollback();
    throw new SegimedAPIError(
      "Hubo un error durante el proceso de registro: " + error.message,
      500
    );
  }
};

export default newVitalSignHandler;
