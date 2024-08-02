import {
  PatientDiagnostic,
  DrugPrescription,
  User,
  MedicalEvent,
  CatDrug,
} from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";

const getPatientDiagnosticByIdHandler = async (diagnosticId) => {
  try {
    // Buscar el diagnóstico por ID e incluir información relacionada
    const diagnostic = await PatientDiagnostic.findOne({
      where: { id: diagnosticId },
      include: [
        {
          model: MedicalEvent,
          as: "medicalEventMedicalEvent", // Alias para MedicalEvent
          include: [
            {
              model: DrugPrescription,
              as: "drugPrescriptions", // Alias para DrugPrescription
              include: [
                {
                  model: User,
                  as: "patient_user", // Alias para el paciente en DrugPrescription
                  attributes: ["id", "name", "lastname"], // Campos necesarios
                },
                {
                  model: User,
                  as: "prescribed_physician_user", // Alias para el médico prescriptor en DrugPrescription
                  attributes: ["id", "name", "lastname"], // Campos necesarios
                },
                {
                  model: CatDrug,
                  as: "catDrug", // Alias para CatDrug
                  attributes: ["id", "name"], // Campos necesarios
                },
              ],
            },
          ],
        },
        {
          model: User,
          as: "diagnosedByUser", // Alias correcto para el médico que hizo el diagnóstico
          attributes: ["id", "name", "lastname"], // Campos necesarios
        },
        {
          model: User,
          as: "patientUser", // Alias correcto para el paciente
          attributes: ["id", "name", "lastname"], // Campos necesarios
        },
      ],
    });

    // Verificar si se encontró el diagnóstico
    if (!diagnostic) {
      throw new SegimedAPIError("Diagnóstico no encontrado.", 404);
    }

    return diagnostic;
  } catch (error) {
    throw new SegimedAPIError(
      "Error al obtener el diagnóstico: " + error.message,
      500
    );
  }
};

export default getPatientDiagnosticByIdHandler;
