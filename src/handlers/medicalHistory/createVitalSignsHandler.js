import { VitalSignDetails, SelfEvaluationEvent } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import moment from "moment-timezone";
import contextService from "request-context";

const newVitalSignHandler = async (body) => {
  const {
    vitalSignsToCreate,
    patient,
    appointmentSchedule,
    selfEvaluationEvent,
    medicalEvent,
  } = body;

  if (
    (!selfEvaluationEvent && !medicalEvent) ||
    (selfEvaluationEvent && medicalEvent)
  ) {
    throw new SegimedAPIError(
      "Debe indicar el Medical Event o el Self Evaluation Event asociado, solo uno de los dos.",
      400
    );
  }

  let createdSelfEvaluation;
  // if (selfEvaluationEvent) {
  //   try {
  //     if (
  //       typeof selfEvaluationEvent === "object" &&
  //       selfEvaluationEvent !== null
  //     ) {
  //       // Si se proporciona un objeto selfEvaluationEvent, lo usamos
  //       createdSelfEvaluation = await SelfEvaluationEvent.create({
  //         ...selfEvaluationEvent,
  //         patient: patient,
  //       });
  //     } else {
  //       // Si no se proporciona un objeto, creamos uno nuevo solo con el paciente
  //       createdSelfEvaluation = await SelfEvaluationEvent.create({
  //         patient: patient,
  //       });
  //     }
  //     // console.log(
  //     //   "selfEvaluation",
  //     //   selfEvaluationEvent,
  //     //   createdSelfEvaluation.dataValues.id
  //     // );
  //     // selfEvaluationEvent = createdSelfEvaluation.dataValues.id;
  //   } catch (error) {
  //     throw new SegimedAPIError("Error al crear el Self Evaluation Event", 500);
  //   }
  // }

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
      });

      //Crear un set de measureTypes existentes
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
            selfEvaluationEvent: selfEvaluationEvent || null,
          };
        }
      );
      // Crear signos vitales
      const createdVitalSignsME = await VitalSignDetails.bulkCreate(
        mappedVitalSignsToCreate
      );
      return createdVitalSignsME;
    }

    // Mapear los signos vitales para la creación
    const mappedVitalSignsToCreate = vitalSignsToCreate.map((vitalSign) => {
      return {
        patient: patient,
        measure: vitalSign.measure,
        measureSource: contextService.get("request:user").userId,
        measureType: vitalSign.measureType,
        measureTimestamp: moment().format("YYYY-MM-DD HH:mm:ss z"),
        scheduling: appointmentSchedule || null,
        medicalEvent: medicalEvent || null,
        selfEvaluationEvent: selfEvaluationEvent || null,
      };
    });

    console.log(mappedVitalSignsToCreate);

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
