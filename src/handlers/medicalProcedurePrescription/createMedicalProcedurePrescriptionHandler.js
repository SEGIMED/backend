import { MedicalProcedurePrescription } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import moment from "moment-timezone";

const newMedicalProcedurePrescriptionHandler = async (body) => {
  const { medicalProcedureName, medicalProcedureId, medicalEventId } = body;
  try {
    // Verificar que los datos de entrada no estén vacíos
    if (!medicalProcedureName || !medicalEventId) {
      throw new SegimedAPIError("Los datos de entrada no son válidos.", 400);
    }

    // Crear nueva prescripción de procedimiento médico
    const newProcedure = await MedicalProcedurePrescription.create({
      // medicalProcedure: medicalProcedureId,
      medicalProcedureName: medicalProcedureName,
      prescriptionTimestamp: moment().format("YYYY-MM-DD HH:mm:ss z"),
      medicalEvent: medicalEventId,
    });

    return newProcedure;
  } catch (error) {
    throw new SegimedAPIError(
      "Hubo un error durante el proceso de solicitud: " + error.message,
      500
    );
  }
};

export default newMedicalProcedurePrescriptionHandler;
