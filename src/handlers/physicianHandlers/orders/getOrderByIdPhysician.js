import models from "../../../databaseConfig.js";
import SegimedAPIError from "../../../error/SegimedAPIError.js";

const getOrderByIdPhysician = async (userId) => {
  try {
    const data = await models.PhysicianOrders.findAll({
      where: {
        physicianId: userId,
      },
      attributes: ["id", "orderTypes", "date"],
      include: [
        {
          model: models.User,
          as: "patient",
          attributes: ["name", "lastname"],
        },
      ],
    });
    return data;
  } catch (error) {
    throw new SegimedAPIError(
      "Error al procesar la informacion",
      error.message
    );
  }
};

export default getOrderByIdPhysician;
