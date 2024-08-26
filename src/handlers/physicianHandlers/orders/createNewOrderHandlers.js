import models from "../../../databaseConfig.js";
import SegimedAPIError from "../../../error/SegimedAPIError.js";
import moment from "moment";
import contextService from "request-context";
import { validationBodyOrderPhysician } from "../../../validations/validationOrderPhysician.js";
const TZ = process.env.TZ;

const createNewOrderHandler = async (body, transaccion) => {
  // Obtenemos el id del usuario que esta realizando la solicitud
  const { userId } = contextService.get("request:user");
  const {
    patientId,
    orderTypes,
    requestPatientId,
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
    const newEntry = await models.PhysicianOrders.create(
      {
        patientId,
        physicianId: userId,
        orderTypes,
        requestPatientId,
        indications,
        diagnostic,
        additionalText,
        // Formateamos la fecha y hora
        date: moment.tz(date + " " + dateTIme, TZ).format(),
        updateAt: null,
      },
      {
        transaction: transaccion,
      }
    );

    return newEntry;
  } catch (error) {
    throw new SegimedAPIError(
      "Error en la operación de registro: ",
      error.message
    );
  }
};

export default createNewOrderHandler;
