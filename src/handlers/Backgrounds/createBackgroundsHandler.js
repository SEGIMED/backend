import { Op } from "sequelize";
import { Backgrounds } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import moment from "moment-timezone";

const createBackgroundsHandler = async (body) => {
  const now = moment();
  const {
    patientId,
    surgicalBackground,
    pathologicBackground,
    nonPathologicBackground,
    familyBackground,
    pediatricBackground,
    pharmacologicalBackground,
    allergicBackground,
    vaccinationBackground,
    medicalEventId,
    schedulingId,
  } = body;
  const query = {
    where: {
      [Op.or]: [],
    },
    defaults: {
      patient: patientId,
      surgicalBackground,
      pathologicBackground,
      nonPathologicBackground,
      familyBackground,
      pediatricBackground,
      pharmacologicalBackground,
      allergicBackground,
      vaccinationBackground,
      timestamp: now.format("YYYY-MM-DD HH:mm:ss z"),
      medicalEvent: medicalEventId,
      appointmentScheduling: schedulingId,
    },
  };
  try {
    if (typeof medicalEventId !== "undefined") {
      query.where[Op.or].push({ medicalEvent: medicalEventId });
    }
    if (typeof schedulingId !== "undefined") {
      query.where[Op.or].push({ appointmentScheduling: schedulingId });
    }

    const [newBackground, createdBackground] = await Backgrounds.findOrCreate(
      query
    );
    if (createdBackground) {
      return newBackground;
    } else {
      await newBackground.update({
        surgicalBackground,
        pathologicBackground,
        nonPathologicBackground,
        familyBackground,
        pediatricBackground,
        pharmacologicalBackground,
        allergicBackground,
        vaccinationBackground,
        timestamp: now.format("YYYY-MM-DD HH:mm:ss z"),
      });
      return "Se han actualizado los antecedentes del paciente"
    }
  } catch (error) {
    throw new SegimedAPIError(
      "Hubo un error durante el proceso de registro.",
      500
    );
  }
};

export default createBackgroundsHandler;
