import {
  MedicalInterconsultations,
  MedicalInterconsultationFile,
  User,
} from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import { Op } from "sequelize";
import contextService from "request-context";
import moment from "moment-timezone";

const createOrUpdateMedicalInterconsultationHandler = async (data) => {
  const physicianRequester = contextService.get("request:user").userId;

  try {
    // Validations
    if (!data.medicalOpinion) {
      if (physicianRequester === data.physicianQueried) {
        throw new SegimedAPIError(
          "Physicians cannot make interconsultation requests to themselves",
          400
        );
      }
      if (!data.patient || !data.physicianQueried) {
        throw new SegimedAPIError(
          "Patient, physicianRequester, and physicianQueried fields are required.",
          400
        );
      }

      // Validate roles
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
        throw new SegimedAPIError("Physician Requester must have role=2.", 400);
      }

      if (userRoles[data.physicianQueried] !== 2) {
        throw new SegimedAPIError("Physician Queried must have role=2.", 400);
      }

      if (userRoles[data.patient] !== 3) {
        throw new SegimedAPIError("Patient must have role=3.", 400);
      }

      // Validate that required fields are not null
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
    }

    let interconsultation;

    if (data.id) {
      // Find existing interconsultation
      interconsultation = await MedicalInterconsultations.findByPk(data.id);
      console.log(interconsultation.dataValues);
      if (!interconsultation) {
        throw new SegimedAPIError("Interconsultation not found", 404);
      }

      // Check if medicalOpinion is being updated
      if (data.medicalOpinion !== undefined) {
        if (
          interconsultation.physicianQueried !==
          contextService.get("request:user").userId
        ) {
          throw new SegimedAPIError(
            "Only the queried physician can respond to the interconsultation",
            400
          );
        }
        // If verification passes, update end timestamp and status
        data.interconsultationEndTimestamp = moment().format(
          "YYYY-MM-DD HH:mm:ss z"
        );
        data.interconsultationStatus = 7; // corresponds to Resolved status
      }

      // Update the interconsultation
      [, [interconsultation]] = await MedicalInterconsultations.update(data, {
        where: { id: data.id },
        returning: true,
      });
    } else {
      // Create a new medical interconsultation
      interconsultation = await MedicalInterconsultations.create({
        ...data,
        physicianRequester,
        interconsultationStartTimestamp: moment().format(
          "YYYY-MM-DD HH:mm:ss z"
        ),
        interconsultationStatus: 6, // corresponds to Requested status
      });
    }

    // Handle related files
    if (data.files && Array.isArray(data.files)) {
      // Delete existing files if updating
      if (data.id) {
        await MedicalInterconsultationFile.destroy({
          where: { medicalInterconsultationId: interconsultation.id },
        });
      }

      // Create or update new files
      for (const fileURL of data.files) {
        await MedicalInterconsultationFile.create({
          medicalInterconsultationId: interconsultation.id,
          fileURL: fileURL,
        });
      }
    }

    return interconsultation;
  } catch (error) {
    // Throw error with defined message and status code
    if (error instanceof SegimedAPIError) {
      throw error; // Throw custom error
    } else {
      throw new SegimedAPIError(
        "Error handling interconsultation: " + error.message,
        500
      );
    }
  }
};

export default createOrUpdateMedicalInterconsultationHandler;
