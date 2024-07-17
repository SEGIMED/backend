import { SociodemographicDetails } from "../../databaseConfig.js";
import { Op } from "sequelize";
import SegimedAPIError from "../../error/SegimedAPIError.js";

const getDeathRateHandler = async (from, to) => {
    
    try {
        const deathCounter = await SociodemographicDetails.count({
            where: {
                dateOfDeathReport: {
                    [Op.between]: [from, to],
                },
            },
        });// con esto obtengo los muertos entre esas fechas
        
        // cantidad de pacientes activon entre (from,to) = registrados hasta to - muertos hasta from
        const registredInDateCount = await SociodemographicDetails.count({
            where: {
                registrationDate: {
                    [Op.lte]: to,
                },
            },
        });// cuento los registrados hasta la fecha TO

        const historyDeathCount = await SociodemographicDetails.count({
            where: {
                dateOfDeathReport: {
                    [Op.lte]: from,
                },
            },
        });// cuento los muertos historicos hasta la fecha FROM
        return { from, to, dead: deathCounter, alive: (registredInDateCount - historyDeathCount - deathCounter) ,total: (registredInDateCount - historyDeathCount) };
    } catch (error) {
        throw new SegimedAPIError("Error al cargar las estadísticas de mortalidad: ", 500);
    }
};

export default getDeathRateHandler;
