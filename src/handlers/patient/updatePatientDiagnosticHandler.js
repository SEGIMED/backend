import { PatientDiagnostic, User } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import deleteDrugPrescriptionsHandler from "../drugPrescription/deleteDrugPrescriptionsHandler.js";
import createDrugPrescriptionHandler from "../drugPrescription/createDrugPrescriptionHandler.js";
import updateTherapyPrescriptionHandler from "../therapy/updateTherapyPrescriptionHandler.js";
import updateMedicalProcedurePrescriptionHandler from "../medicalProcedurePrescription/updateMedicalProcedurePrescriptionHandler.js";
import createOrUpdateMedicalIndicationsHandler from "../medicalIndications/createOrUpdateMedicalIndicationsHandler.js";
import contextService from "request-context";

const updatePatientDiagnosticHandler = async (body) => {
  const { id, drugName, patientId, medicalEventId, drugId, quantityDrug } =
    body;
  const role = contextService.get("request:user.role");

  try {
    // verificar que sea un medico el que este registrado.
    if (role !== "Médico") {
      throw new SegimedAPIError(
        "El usuario no esta autorizado para crear un diagnóstico.",
        403
      );
    }
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
    // Obtener el rol del paciente. Es ovio que el paciente tuvo el rol indicado durante el POST pero puede que estar inactivo y no queremos que se cambie el diagnostico.
    const userPatient = await User.findByPk(existingDiagnostic.patient);

    if (!userPatient) {
      throw new SegimedAPIError("El paciente no existe.", 404);
    }
    //verificar si el paciente es realmente "Paciente"

    if (userPatient.role !== 3) {
      throw new SegimedAPIError(
        "El usuario no es un paciente no puede para crear un diagnóstico.",
        403
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
    //actualizar o crear el Indicaciones Medicas NO FARMACOLOGICAS
    createOrUpdateMedicalIndicationsHandler({
      medicalEventId,
      description: body.descriptionIndication,
    });

    return updatedDiagnostic[1];
  } catch (error) {
    throw new SegimedAPIError(
      "Hubo un error durante el proceso. " + error.message,
      500
    );
  }
};

export default updatePatientDiagnosticHandler;
