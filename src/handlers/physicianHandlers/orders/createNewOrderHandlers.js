import models from "../../../databaseConfig.js";
import SegimedAPIError from "../../../error/SegimedAPIError.js";
import moment from "moment";
import contextService from "request-context";
import { validationBodyOrderPhysician } from "../../../validations/validationOrderPhysician.js";
import { loadFile } from "../../../utils/cloudinary/cloudinary.js";
const TZ = process.env.TZ;

const createNewOrderHandler = async (body, transaccion) => {
  // Obtenemos el id del usuario que esta realizando la solicitud
  const { userId } = contextService.get("request:user");
  const {
    patientId,
    orderTypes,
    requestPatientId,
    diagnostic,
    additionalText,
    orderPdf,
  } = body;

  // validamos el body de la solicitud
  validationBodyOrderPhysician(body);
  let file;

  // Validamos si existe un orderPdf antes de intentar cargar el archivo
  if (orderPdf) {
    file = await loadFile(orderPdf);
  }
  if (requestPatientId) {
    await models.PatientMedicalReq.update(
      {
        status: true,
      },
      {
        where: { id: requestPatientId },
      },
      {
        transaction: transaccion,
      }
    );
  }
  try {
    const newEntry = await models.PhysicianOrders.create(
      {
        patientId,
        physicianId: userId,
        orderTypes,
        requestPatientId,
        diagnostic,
        additionalText,
        // fecha y hora
        date: moment().utc(TZ).toISOString(),
        updateAt: null,
        // archivo
        orderPdf: file?.secure_url || null,
      },
      {
        transaction: transaccion,
      }
    );
    return newEntry;
  } catch (error) {
    console.error(error);
    throw new SegimedAPIError(
      "Error en la operación de registro: ",
      error.message
    );
  }
};

export default createNewOrderHandler;
