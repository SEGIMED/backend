import SegimedAPIError from "../../../error/SegimedAPIError.js";
import models from "../../../databaseConfig.js";

const getOrdersByIdHandlersPhysician = async (userId) => {
  try {
    const orders = await models.PhysicianOrders.findAll({
      where: {
        physicianId: userId,
      },
    });
    const response = orders.map(
      ({
        id,
        patientId,
        physicianId,
        reqTypes,
        medicalPrescriptionId,
        prescription_modifications_hist_id,
        indications,
        diagnostic,
        additionalText,
        date,
        updateAt,
      }) => {
        return {
          id,
          patientId,
          physicianId,
          reqTypes,
          medicalPrescriptionId,
          prescription_modifications_hist_id,
          indications,
          diagnostic,
          additionalText,
          date,
          updateAt:
            updateAt === null ? "Todavia no sufrio actualizacion" : updateAt,
        };
      }
    );
    return response;
  } catch (error) {
    throw new SegimedAPIError(500, error.message);
  }
};

export default getOrdersByIdHandlersPhysician;
