import SegimedAPIError from "../../../error/SegimedAPIError.js";
import models from "../../../databaseConfig.js";

const getOrdersByIdHandlersPhysician = async (userId) => {
  try {
    const orders = await models.PhysicianOrders.findAll({
      where: {
        physicianId: userId,
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
          attributes: ["id", "startTimestamp", "endTimestamp"],
        },
        {
          model: models.PrescriptionModificationsHistory,
          as: "prescriptionModificationOnOrders",
          attributes: ["id"],
          include: [
            {
              model: models.CatCommercialNameDrug,
              as: "commercialName",
              attributes: ["name"],
            },
            {
              model: models.DrugDetailPresentation,
              as: "drugDetailPresentation",
            },
          ],
        },
      ],
      raw: true,
    });
    return orders;
  } catch (error) {
    throw new SegimedAPIError(500, error.message);
  }
};

export default getOrdersByIdHandlersPhysician;
