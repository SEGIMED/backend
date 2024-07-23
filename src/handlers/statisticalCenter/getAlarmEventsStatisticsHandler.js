import { Op } from "sequelize";
import { AlarmEvent } from "../../databaseConfig.js";

const getAlarmEventsStatisticsHandler = async (from, to) => {
    try {
        const totalAlarms = await AlarmEvent.count({
            where: {
                createdAt: {
                    [Op.between]: [from, to], //alarmas creada entre fechas
                },

            },
        });
        const solvedAlarms = await AlarmEvent.count({
            where: {
                createdAt: {
                            [Op.between]: [from, to], //alarmas solucionadas entre fechas
                },
                solved: true,
            },         
           
        });

        return {from, 
                to, 
                totalAlarms: totalAlarms, 
                solvedAlarms: solvedAlarms, 
                activeAlarms: (totalAlarms - solvedAlarms) 
            };
    } catch (error) {
        throw new Error("Error al cargar las estadísticas de alarmas: " + error.message);
    }
};

export default getAlarmEventsStatisticsHandler;
