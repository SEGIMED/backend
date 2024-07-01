import { Op } from "sequelize";
import { User } from "../../databaseConfig.js";

const getPatientActivityDistributionHandler = async () => {
  try {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0);

    const activePatients = await User.count({
      where: {
        lastLogin: {
          [Op.between]: [sevenDaysAgo, today],
        },
      },
    });

    const inactivePatients = await User.count({
      where: {
        lastLogin: {
          [Op.or]: [
            { [Op.notBetween]: [sevenDaysAgo, today] },
            { [Op.is]: null },
          ],
        },
      },
    });

    return { activePatients, inactivePatients };
  } catch (error) {
    throw new Error(
      "Error al cargar las estadísticas de pacientes activos: " + error.message
    );
  }
};
export default getPatientActivityDistributionHandler;
