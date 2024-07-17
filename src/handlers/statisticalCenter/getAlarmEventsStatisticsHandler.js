import { Op } from "sequelize";
import { AlarmEvent } from "../../databaseConfig.js";

const getAlarmEventsStatisticsHandler = async (from, to) => {
    try {
        const totalAlarms = await AlarmEvent.count({
            where: {
                createdAt: {
                    [Op.lte]: to, // Las alarmas deben haberse creado antes o en la fecha 'to'
                },
                [Op.or]: [
                    {
                        solvedDate: {
                            [Op.gte]: from, // Las alarmas deben haberse resuelto despues o en la fecha 'from'
                        },
                    },
                    {
                        solvedDate: null, // O las alarmas aún no se han resuelto
                    },
                ],
            },
        });
        const solvedAlarms = await AlarmEvent.count({
            where: {
                solvedDate: {
                            [Op.gte]: from, // Las alarmas deben haberse solucionado durante las fechas 'to' 'from'
                },
            },         
           
        });

        return { from, to, totalAlarms: totalAlarms, solvedAlarms: solvedAlarms, activeAlarms: (totalAlarms - solvedAlarms) };
    } catch (error) {
        throw new Error("Error al cargar las estadísticas de alarmas: " + error.message);
    }
};

export default getAlarmEventsStatisticsHandler;
