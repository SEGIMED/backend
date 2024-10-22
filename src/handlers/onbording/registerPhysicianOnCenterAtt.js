import models from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";

export const syncRegisterPhysicianOnCenterAtt = async (newCenterAttention) => {
  try {
    const idPhysician = newCenterAttention[0].idPhysician;

    const existingCenters = await models.AttendentPlace.findAll({
      where: { idPhysician },
      attributes: ["idCenterAttention"],
    });

    const existingCenterIds = existingCenters.map(
      (center) => center.idCenterAttention
    );

    const centersToAdd = newCenterAttention.filter(
      (center) => !existingCenterIds.includes(center.idCenterAttention)
    );

    const centersToRemove = existingCenterIds.filter(
      (centerId) =>
        !newCenterAttention.some(
          (center) => center.idCenterAttention === centerId
        )
    );

    if (centersToRemove.length > 0) {
      await models.AttendentPlace.destroy({
        where: {
          idPhysician,
          idCenterAttention: centersToRemove,
        },
      });
    }

    if (centersToAdd.length > 0) {
      const centersData = centersToAdd.map((center) => ({
        idPhysician: center.idPhysician,
        idCenterAttention: center.idCenterAttention,
      }));

      await models.AttendentPlace.bulkCreate(centersData);
    }

    const allCenters = await models.AttendentPlace.findAll({
      where: { idPhysician },
      attributes: ["idCenterAttention"],
      include: {
        model: models.CatCenterAttention,
        as: "center",
      },
    });

    return allCenters;
  } catch (error) {
    throw new SegimedAPIError(
      500,
      error.message || "Error al sincronizar los centros de atención"
    );
  }
};
