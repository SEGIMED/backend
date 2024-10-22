import { Op } from "sequelize";
import { Backgrounds, sequelize } from "../../databaseConfig.js";
import moment from "moment-timezone";
import createComorbiditiesHandler from "../Comorbidities/createComorbiditiesHandler.js";

const createBackgroundsHandler = async ({
  id,
  appointmentSchedule,
  patientId,
  background,
  transaction,
}) => {
  const now = moment();
  const {
    surgicalBackground,
    pathologicBackground,
    nonPathologicBackground,
    familyBackground,
    pediatricBackground,
    pharmacologicalBackground,
    allergicBackground,
    vaccinationBackground,
    comorbidities,
    comorbiditiesList,
  } = background;
  const queryOptions = {
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
      medicalEvent: id,
      appointmentScheduling: appointmentSchedule,
      comorbidities,
    },
    transaction,
  };
  try {
    if (typeof id !== "undefined") {
      queryOptions.where[Op.or].push({ medicalEvent: id });
    }
    if (typeof appointmentSchedule !== "undefined") {
      queryOptions.where[Op.or].push({ appointmentScheduling: appointmentSchedule });
    }

    const [newBackground, createdBackground] = await Backgrounds.findOrCreate(
      queryOptions
    );
    if (createdBackground) {
      return true;
    } else {
      await newBackground.update(
        {
          surgicalBackground,
          pathologicBackground,
          nonPathologicBackground,
          familyBackground,
          pediatricBackground,
          pharmacologicalBackground,
          allergicBackground,
          vaccinationBackground,
          timestamp: now.format("YYYY-MM-DD HH:mm:ss z"),
          comorbidities,
        },
        { transaction }
      );
      if (comorbidities) {
        await createComorbiditiesHandler({
          patientId,
          comorbiditiesList,
          transaction,
        });
      }
      return true;
    }
  } catch (error) {
    console.log(error)
    throw new Error(
      "Hubo un error durante el proceso de registro: " + error.message
    );
  }
};

export default createBackgroundsHandler;
