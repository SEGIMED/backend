import models from "../../../databaseConfig.js";
import SegimedAPIError from "../../../error/SegimedAPIError.js";
import moment from "moment";
import contextService from "request-context";
import { validationBodyOrderPhysician } from "../../../validations/validationOrderPhysician.js";
const TZ = process.env.TZ;

const createNewOrderHandler = async (body) => {
  const { role } = contextService.get("request:user");
  // Verificamos que el usuario que esta realizando la solicitud sea un médico
  if (role !== "Médico") {
    throw new Error("No tienes permisos para realizar esta acción");
  }
  // Obtenemos el id del usuario que esta realizando la solicitud
  const { userId } = contextService.get("request:user");
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
  // Obtenemos la hora actual
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
