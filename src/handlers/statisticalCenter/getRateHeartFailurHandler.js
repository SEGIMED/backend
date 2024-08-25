import {
  PatientHeartFailureClassification,
  CatHeartFailureClassification,
  User,
} from "../../databaseConfig.js";
import { Sequelize } from "sequelize";
import SegimedAPIError from "../../error/SegimedAPIError.js";

const getRateHeartFailurHandler = async (physicianId) => {
  try {
    // Configuración del filtro para la consulta
    const whereClause = {};

    const includeClause = [
      {
        model: CatHeartFailureClassification,
        as: "CatHeartFailureClass",
        attributes: ["name", "description"],
      },
    ];

    // Si physicianId está definido, agregar la condición de filtro
    if (physicianId) {
      whereClause["$patientUser.treating_physician$"] = physicianId;
      includeClause.push({
        model: User,
        as: "patientUser",
        attributes: [],
      });
    }

    // Realizar la consulta con Sequelize
    const statistics = await PatientHeartFailureClassification.findAll({
      attributes: [
        "heartFailureClassification",
        [Sequelize.fn("COUNT", Sequelize.col("patient")), "patientCount"],
      ],
      where: whereClause,
      include: includeClause,
      group: ["heartFailureClassification", "CatHeartFailureClass.id"],
    });

    // Procesar los resultados
    const result = statistics.reduce((acc, stat) => {
      const classification = {
        patientCount: stat.get("patientCount"),
        heartFailureName: stat.CatHeartFailureClass.name,
        heartFailureDescription: stat.CatHeartFailureClass.description,
      };

      acc[`heartFailureClassification_${stat.heartFailureClassification}`] =
        classification;
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

export default getRateHeartFailurHandler;
