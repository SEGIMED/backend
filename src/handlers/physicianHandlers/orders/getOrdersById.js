import SegimedAPIError from "../../../error/SegimedAPIError.js";
import models from "../../../databaseConfig.js";

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
              attributes: ["id"],
              order: [["id", "DESC"]],
              limit: 1,
              include: [
                {
                  model: models.DrugDetailPresentation,
                  as: "drugDetailPresentation",
                  attributes: ["id", "dose"],
                  include: [
                    {
                      model: models.CatDrug,
                      as: "drugName",
                      attributes: ["id", "name"],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
    return orders;
  } catch (error) {
    throw new SegimedAPIError(500, error.message);
  }
};

export default getOrdersByIdHandlersPhysician;
