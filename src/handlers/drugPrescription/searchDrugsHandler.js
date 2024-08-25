import { Op } from "sequelize";
import models from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";

const searchDrugsHandler = async (search) => {
  try {
    const result = await models.CatDrug.findAll({
      where: {
        name: {
          [Op.iLike]: `%${search}%`,
        },
      },
      attributes: ["id", "name"],
    });
    return result;
  } catch (error) {
    throw new SegimedAPIError(
      "Ocurrio un error al encontrar el médicamento",
      500
    );
  }
};

export default searchDrugsHandler;
