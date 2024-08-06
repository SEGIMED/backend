import { MedicalIndications } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import moment from "moment-timezone";
import contextService from "request-context";

const createOrUpdateMedicalIndicationsHandler = async (body) => {
  const { description, medicalEventId } = body;

  try {
    // Busca si ya existe una entrada con el medicalEventId proporcionado
    const existingIndication = await MedicalIndications.findOne({
      where: { medicalEvent: medicalEventId },
    });

    if (existingIndication) {
      // Si existe, actualiza la entrada existente
      //   existingIndication.patient = patientId;
      existingIndication.description = description;
      existingIndication.prescribedPhysician =
        contextService.get("request:user").userId;
      existingIndication.timestamp = moment().format("YYYY-MM-DD HH:mm:ss z");

      await existingIndication.save();
      return existingIndication;
    } else {
      // Si no existe, crea una nueva entrada
      const newMedicalIndication = await MedicalIndications.create({
        // patient: patientId,
        description,
        prescribedPhysician: contextService.get("request:user").userId,
        medicalEvent: medicalEventId,
        timestamp: moment().format("YYYY-MM-DD HH:mm:ss z"),
      });
      return newMedicalIndication;
    }
  } catch (error) {
    throw new SegimedAPIError(
      "Hubo un error durante el proceso de creación o actualización.",
      500
    );
  }
};

export default createOrUpdateMedicalIndicationsHandler;
