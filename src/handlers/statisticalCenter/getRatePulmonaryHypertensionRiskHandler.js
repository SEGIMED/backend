import {
  PatientPulmonaryHypertensionRisk,
  CatPulmonaryArterialHypertensionRisk,
  User,
} from "../../databaseConfig.js";
import { Sequelize } from "sequelize";
import SegimedAPIError from "../../error/SegimedAPIError.js";

const getRatePulmonaryHypertensionRiskHandler = async (physicianId) => {
  try {
    // Configuración del filtro para la consulta
    const whereClause = {};

    // Si physicianId está definido, agregar la condición de filtro
    const includeClause = [
      {
        model: CatPulmonaryArterialHypertensionRisk,
        as: "catHpRisk",
        attributes: ["name", "description"],
      },
    ];

    if (physicianId) {
      whereClause["$patientUser.treating_physician$"] = physicianId;
      includeClause.push({
        model: User,
        as: "patientUser",
        attributes: [],
      });
    }

    const statistics = await PatientPulmonaryHypertensionRisk.findAll({
      attributes: [
        "pulmonaryHypertensionRisk",
        [Sequelize.fn("COUNT", Sequelize.col("patient")), "patientCount"],
      ],
      where: whereClause,
      include: includeClause,
      group: ["pulmonaryHypertensionRisk", "catHpRisk.id"],
    });

    const result = statistics.reduce((acc, stat) => {
      const riskData = {
        patientCount: stat.get("patientCount"),
        riskName: stat.catHpRisk.name,
        riskDescription: stat.catHpRisk.description,
      };

      acc[`risk_${stat.pulmonaryHypertensionRisk}`] = riskData;
      return acc;
    }, {});

    return result;
  } catch (error) {
    throw new SegimedAPIError(
      "Error al cargar las estadísticas de riesgo: " + error.message,
      500
    );
  }
};

export default getRatePulmonaryHypertensionRiskHandler;
