import SegimedAPIError from "../../error/SegimedAPIError.js"
import models from "../../databaseConfig.js";

const searchDrugDetailPresentationHandler = async (drugId) => {
    try {
        const result = await models.DrugDetailPresentation.findAll({
            where:{
                drugId
            }
        })
        return result
    } catch (error) {
        throw new SegimedAPIError("Hubo un error al recuperar las presentaciones: " + error, 500)
    }
}

export default searchDrugDetailPresentationHandler;