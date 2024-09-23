import { Op, Sequelize } from "sequelize";
import models from "../../../databaseConfig.js";
import SegimedAPIError from "../../../error/SegimedAPIError.js";

const searchHealthCarePlanHandler = async ({ search }) => {
  try {
    const result = await models.CatHealthCarePlan.findAll({
      where: Sequelize.where(Sequelize.fn("unaccent", Sequelize.col("name")), {
        [Op.iLike]: `%${search}%`,
      }),
    });
    return result;
  } catch (error) {
    throw new SegimedAPIError(
      "Ocurrió un error al encontrar la obra social",
      500
    );
  }
};

export default searchHealthCarePlanHandler;
