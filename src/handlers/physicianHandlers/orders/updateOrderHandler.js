import models from "../../../databaseConfig.js";
import SegimedAPIError from "../../../error/SegimedAPIError.js";
import moment from "moment";
const TZ = process.env.TZ;

const updateOrderHandler = async (body, userId) => {
  const {
    orderId,
    patientId,
    reqTypes,
    medicalPrescriptionId,
    prescriptionModificationsHistId,
    indications,
    diagnostic,
    additionalText,
    date,
  } = body;
  try {
    const updatedEntry = await models.PhysicianOrders.update(
      {
        patientId,
        physicianId: userId,
        reqTypes,
        medicalPrescriptionId,
        prescriptionModificationsHistId,
        indications,
        diagnostic,
        additionalText,
        date,
        updateAt: moment().tz(TZ).format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        where: {
          id: orderId,
        },
      }
    );

    return updatedEntry;
  } catch (error) {
    console.log(error);

    throw new SegimedAPIError(
      "Error en la operación de actualización: " + error
    );
  }
};
