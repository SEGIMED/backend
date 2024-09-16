import models from "./../../databaseConfig.js";
const getVitalSignsByMedicalEventHandler = async ({ id }) => {
  try {
    const vitalSigns = await models.VitalSignDetails.findAll({
      where: {
        medicalEvent: id,
      },
      attributes: ["measure"],
      include: [
        {
          model: models.CatVitalSignMeasureType,
          as: "vitalSignMeasureType",
          attributes: ["name"],
          include: {
            model: models.CatMeasureUnit,
            as: "measUnit",
            attributes: ["name"],
          },
        },
      ],
    });
    return vitalSigns;
  } catch (error) {
    throw new Error(
      "Ocurrio un error al recuperar los signos vitales: " + error.message
    );
  }
};
export default getVitalSignsByMedicalEventHandler;
