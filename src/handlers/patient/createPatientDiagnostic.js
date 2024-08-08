import { PatientDiagnostic, User } from "../../databaseConfig.js";
import contextService from "request-context";
import moment from "moment-timezone";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import createDrugPrescriptionHandler from "../drugPrescription/createDrugPrescriptionHandler.js";
import createMedicalProcedurePrescriptionHandler from "../../handlers/medicalProcedurePrescription/createMedicalProcedurePrescriptionHandler.js";
import createTherapyPrescriptionHandler from "../therapy/createTherapyPrescriptionHandler.js";
import createOrUpdateMedicalIndicationsHandler from "../medicalIndications/createOrUpdateMedicalIndicationsHandler.js";

const createPatientDiagnosticHandler = async (body) => {
  const {
    patientId,
    diseaseId,
    diagnosticNotes,
    medicalEventId,
    drugId,
    drugName,
    therapyPrescription: therapyDescription,
    quantityDrug,
  } = body;
  const role = contextService.get("request:user.role");

  try {
    // verificar que sea un medico el que este registrado.
    if (role !== "Médico") {
      throw new SegimedAPIError(
        "El usuario no esta autorizado para crear un diagnóstico.",
        403
      );
    }
    // Obtener el rol del paciente
    const userPatient = await User.findByPk(patientId);

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

    // Verificar si ya existe un diagnóstico con el mismo medicalEvent
    const existingDiagnostic = await PatientDiagnostic.findOne({
      where: { medicalEvent: medicalEventId },
    });

    if (existingDiagnostic) {
      throw new SegimedAPIError(
        "Ya existe un diagnóstico para el mismo evento médico.",
        400
      );
    }

    const newDiagnostic = await PatientDiagnostic.create({
      patient: patientId,
      diagnosedBy: contextService.get("request:user").userId,
      timestamp: moment().format("YYYY-MM-DD HH:mm:ss z"),
      disease: diseaseId,
      diagnosticNotes,
      medicalEvent: medicalEventId,
    });
    //guardo las drugsPrescriptions
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
    //guardo procedure prescription
    createMedicalProcedurePrescriptionHandler({
      medicalEventId,
      medicalProcedureName: body.medicalProcedureName,
    });
    //guardo therapy prescription
    createTherapyPrescriptionHandler({
      medicalEventId,
      therapyDescription: body.descriptionTherapy,
    });
    //actualizar o crear el Indicaciones Medicas NO FARMACOLOGICAS
    createOrUpdateMedicalIndicationsHandler({
      medicalEventId,
      description: body.descriptionIndication,
    });

    return newDiagnostic;
  } catch (error) {
    throw new SegimedAPIError(
      "Hubo un error durante el proceso: " + error.message,
      500
    );
  }
};

export default createPatientDiagnosticHandler;
