import { Op, fn, col, Sequelize } from "sequelize";
import { CatComorbiditiesDiseases } from "../../databaseConfig.js";

const searchComorbiditiesHandler = async (search) => {
  try {
    if (search && search.length < 1) {
      throw new Error("El término de búsqueda debe tener al menos 1 letras");
    }

    const results = await CatComorbiditiesDiseases.findAll({
      where: Sequelize.where(
        Sequelize.fn('unaccent', Sequelize.col('name')),
        {
          [Op.iLike]: `%${search}%`
        }
      ),
    });

    return results;
  } catch (error) {
    throw new Error("Ocurrio un error: " + error.message);
  }
};
export default searchComorbiditiesHandler;
