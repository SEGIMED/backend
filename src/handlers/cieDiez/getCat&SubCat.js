import models from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import universalPaginationHandler from "../Pagination/universalPaginationHandler.js";

const getCatAndSubCat = async (page, limit) => {
  try {
    const categories = await models.CategoryCieDiez.findAll({
      attributes: ["code", "description"],
      include: [
        {
          model: models.SubCategoriesCieDiez,
          as: "subCategories",
          attributes: ["code", "description"],
        },
      ],
    });
    if (page && limit) {
      const paginatedCategories = await universalPaginationHandler(
        categories,
        page,
        limit
      );
      return paginatedCategories;
    }
    return categories;
  } catch (error) {
    console.error(error);
    throw new SegimedAPIError(
      "Error al obtener las categorias y subcategorias"
    );
  }
};

export default getCatAndSubCat;
