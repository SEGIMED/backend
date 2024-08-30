import { Op } from "sequelize";
import models from "../../databaseConfig.js";

const searchCIEHandler = async(search)=>{
    try {
        if (search.length < 4) {
            throw new Error("El término de búsqueda debe tener al menos 4 letras.");
        }
        const result = await models.SubCategoriesCieDiez.findAll({
            where: {
                description: {
                    [Op.iLike]: `%${search}%`
                }
            },
            order: [['code', 'ASC']],
        });
        return result
    } catch (error) {
        throw new Error(error.message);
    }
}
export default searchCIEHandler;