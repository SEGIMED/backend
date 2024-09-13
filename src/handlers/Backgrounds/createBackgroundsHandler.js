import { Op } from "sequelize";
import { Backgrounds, sequelize } from "../../databaseConfig.js";
import moment from "moment-timezone";
import createComorbiditiesHandler from "../Comorbidities/createComorbiditiesHandler.js";

const createBackgroundsHandler = async (body) => {
  const now = moment();
  const transaction = await sequelize.transaction();
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
    comorbidities,
    comorbiditiesList,
  } = body;
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
      medicalEvent: medicalEventId,
      appointmentScheduling: schedulingId,
      comorbidities
    },
    transaction
  };
  try {
    if (typeof medicalEventId !== "undefined") {
      queryOptions.where[Op.or].push({ medicalEvent: medicalEventId });
    }
    if (typeof schedulingId !== "undefined") {
      queryOptions.where[Op.or].push({ appointmentScheduling: schedulingId });
    }

    const [newBackground, createdBackground] = await Backgrounds.findOrCreate(queryOptions);
    if (createdBackground) {
      return newBackground;
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
      await transaction.commit();
      return "Se han actualizado los antecedentes del paciente";
    }
  } catch (error) {
    await transaction.rollback();
    throw new Error("Hubo un error durante el proceso de registro: " + error.message);
    
  }
};

export default createBackgroundsHandler;
