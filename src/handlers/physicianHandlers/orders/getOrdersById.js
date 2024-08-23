import SegimedAPIError from "../../../error/SegimedAPIError.js";
import models from "../../../databaseConfig.js";
import { formatterHandler } from "./formatterHandler.js";

const getOrdersByIdHandlersPhysician = async (orderId) => {
  try {
    const orders = await models.PhysicianOrders.findAll({
      where: {
        id: orderId,
      },
      include: [
        {
          model: models.User,
          as: "patient",
          attributes: ["name", "lastname"],
        },
        {
          model: models.User,
          as: "physician",
          attributes: ["name", "lastname"],
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
                "modificationTimestamp",
                "observations",
                "indications",
              ],
              order: [["id", "DESC"]],
              limit: 1,
              include: [
                {
                  model: models.DrugDetailPresentation,
                  as: "drugDetailPresentation",
                  attributes: ["dose"],
                  include: [
                    {
                      model: models.CatDrug,
                      as: "drugName",
                      attributes: ["name"],
                    },
                    {
                      model: models.CatMeasureUnit,
                      as: "measureUnit",
                      attributes: ["name"],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
    const responseMapping = formatterHandler(orders);
    return responseMapping;
  } catch (error) {
    throw new SegimedAPIError(500, error.message);
  }
};

export default getOrdersByIdHandlersPhysician;
