import SegimedAPIError from "../../../error/SegimedAPIError.js";
import models from "../../../databaseConfig.js";

const getOrdersByIdHandlersPhysician = async (userId) => {
  try {
    const orders = await models.PhysicianOrders.findAll({
      where: {
        physicianId: userId,
      },
    });
    return orders;
  } catch (error) {
    throw new SegimedAPIError(500, error.message);
  }
};

export default getOrdersByIdHandlersPhysician;
