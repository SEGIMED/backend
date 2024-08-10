import {
  MedicalInterconsultations,
  MedicalInterconsultationFile,
  User, // Asegúrate de importar el modelo User desde tu configuración de base de datos
} from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import { Op } from "sequelize"; // Asegúrate de importar Op para las consultas con Sequelize
import contextService from "request-context";

const createOrUpdateMedicalInterconsultationHandler = async (data) => {
  const physicianRequester = contextService.get("request:user").userId;
  console.log(physicianRequester);
  try {
    // Validaciones
    if (physicianRequester === data.physicianQueried) {
      throw new SegimedAPIError(
        "Physicians cannot make interconsultation requests to themselves",
        400
      );
    }
    if (!data.patient || !physicianRequester || !data.physicianQueried) {
      throw new SegimedAPIError(
        "patient, physicianRequester, and physicianQueried fields are required.",
        400
      );
    }

    // Validar roles
    const users = await User.findAll({
      where: {
        id: {
          [Op.in]: [data.patient, physicianRequester, data.physicianQueried],
        },
      },
    });

    const userRoles = {};
    users.forEach((user) => {
      userRoles[user.id] = user.role;
    });

    if (userRoles[physicianRequester] !== 2) {
      throw new SegimedAPIError("Physician Requester must have role=3.", 400);
    }

    if (userRoles[data.physicianQueried] !== 2) {
      throw new SegimedAPIError("Physician Queried must have role=3.", 400);
    }

    if (userRoles[data.patient] !== 3) {
      throw new SegimedAPIError("Patient must have role=2.", 400);
    }

    // Validar que los campos no sean null
    const requiredFields = [
      "patient",
      "physicianQueried",
      "medicalSpecialty",
      "interconsultationStatus",
      "reasonForConsultation",
    ];

    for (const field of requiredFields) {
      if (data[field] === null || data[field] === undefined) {
        throw new SegimedAPIError(`${field} cannot be null.`, 400);
      }
    }

    let interconsultation;

    if (data.id) {
      // Actualización de la interconsulta médica existente
      const [rowsUpdated, [updatedInterconsultation]] =
        await MedicalInterconsultations.update(data, {
          where: { id: data.id },
          returning: true,
        });
      interconsultation = updatedInterconsultation;
    } else {
      // Creación de una nueva interconsulta médica
      interconsultation = await MedicalInterconsultations.create({
        ...data,
        physicianRequester,
      });
    }

    // Manejo de los archivos relacionados
    if (data.files && Array.isArray(data.files)) {
      // Elimina los archivos existentes si estás actualizando
      if (data.id) {
        await MedicalInterconsultationFile.destroy({
          where: { medicalInterconsultationId: interconsultation.id },
        });
      }

      // Crea o actualiza los nuevos archivos
      for (const fileURL of data.files) {
        console.log("add", fileURL);
        await MedicalInterconsultationFile.create({
          medicalInterconsultationId: interconsultation.id,
          fileURL: fileURL,
        });
      }
    }

    return interconsultation;
  } catch (error) {
    // Lanza un error con el mensaje y código de estado definidos
    if (error instanceof SegimedAPIError) {
      throw error; // Lanza el error personalizado
    } else {
      throw new SegimedAPIError(
        "Error handling interconsultation: " + error.message,
        500
      );
    }
  }
};

export default createOrUpdateMedicalInterconsultationHandler;
