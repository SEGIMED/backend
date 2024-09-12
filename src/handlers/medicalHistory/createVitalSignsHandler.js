import {
  VitalSignDetails,
} from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import moment from "moment-timezone";
import contextService from "request-context";

const newVitalSignHandler = async ({vitalSigns, selfEvaluationEventId, transaction}) => {
  try {

      const mappedVitalSignsToCreate = vitalSigns.map((vitalSign) => {
        return {
          patient: contextService.get("request:user").userId,
          measure: vitalSign.measure,
          measureSource: contextService.get("request:user").userId,
          measureType: vitalSign.measureType,
          measureTimestamp: moment().format("YYYY-MM-DD HH:mm:ss z"),
          selfEvaluationEvent: selfEvaluationEventId,
        };
      });

      const createdVitalSigns = await VitalSignDetails.bulkCreate(
        mappedVitalSignsToCreate,
        { transaction }
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
