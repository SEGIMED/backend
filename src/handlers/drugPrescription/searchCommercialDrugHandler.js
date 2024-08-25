import { Op } from "sequelize";
import models from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
import searchDrugDetailPresentationHandler from "./searchDrugDetailPresentationHandler.js";

const searchCommercialDrugsHandler = async (searchCommercialId) => {
  try {
    const result = await models.CatCommercialNameDrug.findAll({
      where: {
        drugId: searchCommercialId,
      },
      attributes: ["id", "name"],
    });
    const presentation = await searchDrugDetailPresentationHandler(
      searchCommercialId
    );
    return { result, presentation };
  } catch (error) {
    throw new SegimedAPIError(
      "Ocurrio un error al encontrar el médicamento",
      500
    );
  }
};

export default searchCommercialDrugsHandler;
