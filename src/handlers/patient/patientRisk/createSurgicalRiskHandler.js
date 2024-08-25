import { PatientSurgicalRisk } from "../../../databaseConfig.js";
import contextService from "request-context";
import moment from "moment-timezone";
import SegimedAPIError from "../../../error/SegimedAPIError.js";

const createSurgicalRiskHandler = async (body) => {
  const { patientId, surgicalRiskId } = body;

  try {
    const newSurgicalRisk = await PatientSurgicalRisk.create({
      patient: patientId,
      risk: surgicalRiskId,
      physician: contextService.get("request:user").userId,
      timestamp: moment().format("YYYY-MM-DD HH:mm:ss z"),
    });
    return newSurgicalRisk;
  } catch (error) {
    throw new SegimedAPIError(
      "Hubo un error durante el proceso de creación.",
      500
    );
  }
};

export default createSurgicalRiskHandler;
