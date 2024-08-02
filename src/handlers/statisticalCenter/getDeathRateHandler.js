import { SociodemographicDetails, User } from "../../databaseConfig.js";
import { Op } from "sequelize";
import SegimedAPIError from "../../error/SegimedAPIError.js";

const getDeathRateHandler = async (from, to, physicianId) => {
    try {
        const deathCounterWhere = {
            dateOfDeathReport: {
                [Op.between]: [from, to],
            },
        };

        const registredInDateCountWhere = {
            registrationDate: {
                [Op.lte]: to,
            },
        };

        const historyDeathCountWhere = {
            dateOfDeathReport: {
                [Op.lte]: from,
            },
        };

        if (physicianId) {
            deathCounterWhere['$patient_user.treating_physician$'] = physicianId;
            registredInDateCountWhere['$patient_user.treating_physician$'] = physicianId;
            historyDeathCountWhere['$patient_user.treating_physician$'] = physicianId;
        }

        const deathCounter = await SociodemographicDetails.count({
            where: deathCounterWhere,
            include: [
                {
                    model: User,
                    as: 'patient_user',
                    attributes: [],
                },
            ],
        });

        const registredInDateCount = await SociodemographicDetails.count({
            where: registredInDateCountWhere,
            include: [
                {
                    model: User,
                    as: 'patient_user',
                    attributes: [],
                },
            ],
        });

        const historyDeathCount = await SociodemographicDetails.count({
            where: historyDeathCountWhere,
            include: [
                {
                    model: User,
                    as: 'patient_user',
                    attributes: [],
                },
            ],
        });

        return { 
            from, 
            to, 
            dead: deathCounter, 
            alive: (registredInDateCount - historyDeathCount - deathCounter), 
            total: (registredInDateCount - historyDeathCount) 
        };
    } catch (error) {
        throw new SegimedAPIError("Error al cargar las estadísticas de mortalidad: " + error.message, 500);
    }
};

export default getDeathRateHandler;
