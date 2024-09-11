import SegimedAPIError from "../../../error/SegimedAPIError.js";
import models from "../../../databaseConfig.js";
import { formatterHandler } from "./formatterHandler.js";

const getOrdersByIdHandlersPhysician = async (orderId) => {
  try {
    const orders = await models.PhysicianOrders.findAll({
      where: {
        id: orderId,
      },
      attributes:{
        exclude:["diagnostic"]
      },
      include: [
        {
          model: models.User,
          as: "patient",
          attributes: ["name", "lastname"],
        },
        {
          model: models.SubCategoriesCieDiez,
          as: "orderDiagnostic",
          attributes:["code", "description"]
        },
        {
          model: models.User,
          as: "physician",
          attributes: ["name", "lastname"],
        },
        {
          model: models.PatientMedicalReq,
          as: "medicalReq",
          attributes: ["id", "reqTypes"],
        },
        {
          model: models.MedicationPrescription,
          as: "medicationPrescription",
          attributes: ["id", "startTimestamp"],
          include: [
            {
              model: models.PrescriptionModificationsHistory,
              as: "medicationPrescription",
              attributes: [
                "id",
                "modificationTimestamp",
                "observations",
                "indications",
              ],
              order: [["id", "DESC"]],
              limit: 1,

            },
          ],
        },
      ],
    });
    return orders;
    const responseMapping = formatterHandler(orders);
    return responseMapping[0];
  } catch (error) {
    throw new SegimedAPIError(error);
  }
};

export default getOrdersByIdHandlersPhysician;
