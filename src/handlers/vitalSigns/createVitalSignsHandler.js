import { VitalSignDetails } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import moment from "moment-timezone";
import contextService from "request-context";

const newVitalSignHandler = async (body) => {
  const { vitalSignsToCreate, patient, appointmentSchedule } = body;

  //Validation: Filter duplicates

  const seenMeasureTypes = new Set();
  const uniqueVitalSignsToCreate = vitalSignsToCreate.filter(vitalSign => {
    if (seenMeasureTypes.has(vitalSign.measureType)) {
      return false;
    } else {
      seenMeasureTypes.add(vitalSign.measureType);
      return true;
    }
  });

  //Creation of filtered VS
  const mappedVitalSignsToCreate = uniqueVitalSignsToCreate.map((vitalSign) => {
    return {
      patient: patient,
      measure: vitalSign.measure,
      measureSource: contextService.get("request:user").userId,
      measureType: vitalSign.measureType,
      measureTimestamp: moment().format("YYYY-MM-DD HH:mm:ss z"),
      scheduling: appointmentSchedule,
      medicalEvent: vitalSign.medicalEventId,
    };
  });
  console.log(mappedVitalSignsToCreate);

  try {
    const createdVitalSigns = await VitalSignDetails.bulkCreate(
      mappedVitalSignsToCreate
    );

    return createdVitalSigns;
  } catch (error) {
    throw new SegimedAPIError(
      "Hubo un error durante el proceso de registro.",
      500
    );
  }
};

export default newVitalSignHandler;
