import { PatientDiagnostic } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import deleteDrugPrescriptionsHandler from "../drugPrescription/deleteDrugPrescriptionsHandler.js";
import createDrugPrescriptionHandler from "../drugPrescription/createDrugPrescriptionHandler.js";
import updateTherapyPrescriptionHandler from "../therapy/updateTherapyPrescriptionHandler.js";
import updateMedicalProcedurePrescriptionHandler from "../medicalProcedurePrescription/updateMedicalProcedurePrescriptionHandler.js";

const updatePatientDiagnosticHandler = async (body) => {
  const { id, drugName, patientId, medicalEventId, drugId, quantityDrug } =
    body;
  try {
    // Verificar si existe el diagnóstico con el id
    const existingDiagnostic = await PatientDiagnostic.findOne({
      where: { id: id },
    });

    if (!existingDiagnostic) {
      throw new SegimedAPIError(
        "No existe el diagnóstico que intenta actualizar.",
        400
      );
    }

    const updatedDiagnostic = await PatientDiagnostic.update(
      {
        disease: body.diseaseId,
        diagnosticNotes: body.diagnosticNotes,
      },
      {
        where: {
          id: id,
        },
        returning: true,
        plain: true,
      }
    );

    //eliminar las drug prescriptions existentes si existe alguna
    await deleteDrugPrescriptionsHandler(medicalEventId);
    //agregar la nueva prescripcion si existe
    if (drugName) {
      drugName.forEach((drug) => {
        const drugPrescription = {
          patientId,
          drugId,
          drugName: drug,
          quantity: quantityDrug,
          medicalEventId,
        };
        createDrugPrescriptionHandler(drugPrescription);
      });
    }
    //actualizar procedure prescription
    updateMedicalProcedurePrescriptionHandler({
      medicalEventId,
      medicalProcedureName: body.medicalProcedureName,
    });
    //actualizar therapy prescription
    updateTherapyPrescriptionHandler({
      medicalEventId,
      therapyDescription: body.therapyDescription,
    });

    return updatedDiagnostic[1];
  } catch (error) {
    console.error(error.message);
    throw new SegimedAPIError("Hubo un error durante el proceso.", 500);
  }
};

export default updatePatientDiagnosticHandler;
