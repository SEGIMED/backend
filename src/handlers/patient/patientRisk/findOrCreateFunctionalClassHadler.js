import contextService from "request-context";
import moment from "moment";
import models from "../../../databaseConfig.js";

const findOrCreateFunctionalClassHandler = async ({
  functionalClass,
  appointmentSchedule,
  transaction,
}) => {
  try {
    const timestamp = moment().format("YYYY-MM-DD HH:mm:ss");

    const [functionalClassRecord, created] =
      await models.PatientFunctionalClass.findOrCreate({
        where: { patient: appointmentSchedule.patient },
        defaults: {
          class: functionalClass,
          physician: contextService.get("request:user").userId,
          timestamp,
        },
        transaction,
      });

    if (!created) {
      await functionalClassRecord.update(
        {
          class: functionalClass,
          physician: contextService.get("request:user").userId,
          timestamp,
        },
        { transaction }
      );
    }

    return created
      ? "Clase funcional creada correctamente."
      : "Clase funcional actualizada correctamente.";
  } catch (error) {
    throw new Error("Hubo un error al procesar los datos: " + error.message);
  }
};

export default findOrCreateFunctionalClassHandler;
