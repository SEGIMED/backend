import { PatientDiagnostic } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import deleteDrugPrescriptionsHandler from "../drugPrescription/deleteDrugPrescriptionsHandler.js";
import createDrugPrescriptionHandler from "../drugPrescription/createDrugPrescriptionHandler.js";

const updatePatientDiagnosticHandler = async (body) => {
  const { id, drugName, patientId, medicalEventId, drugId, quantityDrug } =
    body;
  //   console.log(drugName, "updatePatientDiag ", body);
  try {
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

    return updatedDiagnostic[1];
  } catch (error) {
    console.error(error.message);
    throw new SegimedAPIError("Hubo un error durante el proceso.", 500);
  }
};

export default updatePatientDiagnosticHandler;
