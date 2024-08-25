import { Op } from "sequelize";
import { AlarmEvent, User } from "../../databaseConfig.js";

const getAlarmEventsStatisticsHandler = async (from, to, physicianId) => {
  try {
    // Configuración del filtro para la consulta
    const whereClause = {
      createdAt: {
        [Op.between]: [from, to], // alarmas creadas entre fechas
      },
    };

    const includeClause = [];

    // Si physicianId está definido, agregar la condición de filtro
    if (physicianId) {
      whereClause["$patient_user.treating_physician$"] = physicianId;
      includeClause.push({
        model: User,
        as: "patient_user",
        attributes: [],
      });
    }

    const totalAlarms = await AlarmEvent.count({
      where: whereClause,
      include: includeClause,
    });

    const solvedAlarms = await AlarmEvent.count({
      where: {
        ...whereClause,
        solved: true,
      },
      include: includeClause,
    });

    return {
      from,
      to,
      totalAlarms,
      solvedAlarms,
      activeAlarms: totalAlarms - solvedAlarms,
    };
  } catch (error) {
    throw new Error(
      "Error al cargar las estadísticas de alarmas: " + error.message
    );
  }
};

export default getAlarmEventsStatisticsHandler;
