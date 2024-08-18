import SegimedAPIError from "../../../error/SegimedAPIError.js";
import models from "../../../databaseConfig.js";

const getOrdersByIdHandlersPhysician = async (userId) => {
  try {
    const orders = await models.PhysicianOrders.findAll({
      where: {
        physicianId: userId,
      },
    });

    if (!orders) {
      throw new SegimedAPIError(404, "Orders not found");
    }

    return orders;
  } catch (error) {
    throw new SegimedAPIError(500, error.message);
  }
};

export default getOrdersByIdHandlersPhysician;
