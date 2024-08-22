import models from "../../../databaseConfig.js";
import SegimedAPIError from "../../../error/SegimedAPIError.js";
import moment from "moment";
import { validationBodyOrderPhysician } from "../../../validations/validationOrderPhysician.js";
const TZ = process.env.TZ;

const createNewOrderHandler = async (body, userId) => {
  const {
    patientId,
    orderTypes,
    medicalPrescriptionId,
    prescription_modifications_hist_id,
    indications,
    diagnostic,
    additionalText,
    date,
  } = body;
  let dateTIme = moment().tz(TZ).format("HH:mm:ss z");
  // validamos el body de la solicitud
  validationBodyOrderPhysician(body);
  try {
    const newEntry = await models.PhysicianOrders.create({
      patientId,
      physicianId: userId,
      orderTypes,
      medicalPrescriptionId,
      prescription_modifications_hist_id,
      indications,
      diagnostic,
      additionalText,
      date: moment.tz(date + " " + dateTIme, TZ).format(),
      updateAt: null,
    });

    return newEntry;
  } catch (error) {
    console.log(error);

    throw new SegimedAPIError("Error en la operación de registro: " + error);
  }
};

export default createNewOrderHandler;
