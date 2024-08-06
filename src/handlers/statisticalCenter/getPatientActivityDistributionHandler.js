import { Op } from "sequelize";
import { User } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";

const getPatientActivityDistributionHandler = async (physicianId) => {
  try {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0);

    // Construir las condiciones base
    const activeWhere = {
      lastLogin: {
        [Op.between]: [sevenDaysAgo, today],
      },
    };

    const inactiveWhere = {
      [Op.or]: [
        { lastLogin: { [Op.notBetween]: [sevenDaysAgo, today] } },
        { lastLogin: { [Op.is]: null } },
      ],
    };

    // Agregar filtro de physicianId si está definido
    if (physicianId) {
      activeWhere.treatingPhysician = physicianId;
      inactiveWhere.treatingPhysician = physicianId;
    }

    const activePatients = await User.count({
      where: activeWhere,
    });

    const inactivePatients = await User.count({
      where: inactiveWhere,
    });

    return { activePatients, inactivePatients };
  } catch (error) {
    throw new SegimedAPIError(
      "Error al cargar las estadísticas de pacientes activos: " + error.message,
      500
    );
  }
};

export default getPatientActivityDistributionHandler;

