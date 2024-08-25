import { PatientPulmonaryHypertensionGroup } from "../../databaseConfig.js";
import contextService from "request-context";
import moment from "moment-timezone";
import SegimedAPIError from "../../error/SegimedAPIError.js";

const createPatientHpGroupHandler = async (body) => {
  const { patientId, hpGroupId } = body;

  try {
    const newHpGroup = await PatientPulmonaryHypertensionGroup.create({
      patient: patientId,
      group: hpGroupId,
      physician: contextService.get("request:user").userId,
      timestamp: moment().format("YYYY-MM-DD HH:mm:ss z"),
    });
    return newHpGroup;
  } catch (error) {
    throw new SegimedAPIError(
      "Hubo un error durante el proceso de creación.",
      500
    );
  }
};

export default createPatientHpGroupHandler;
