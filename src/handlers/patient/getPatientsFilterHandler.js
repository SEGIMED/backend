import models from "../../databaseConfig.js";
import { Op } from "sequelize";

const getPatientsFilterHandler = async (filters) => {
  try {
    const validFilterTypes = [
      "id",
      "idNumber",
      "idType",
      "name",
      "lastname",
      "role",
      "email",
    ];

    const invalidFilterTypes = filters.filter(
      (filter) => !validFilterTypes.includes(filter.key)
    );

    if (invalidFilterTypes.length > 0) {
      const invalidKeys = invalidFilterTypes
        .map((filter) => filter.key)
        .join(", ");
      throw new Error(`Tipo de filtro inválido: ${invalidKeys}`);
    }

    if (!filters) {
      throw new Error("Se debe agregar un tipo de filtro");
    }

    const whereClause = {};

    filters.forEach((filter) => {
      const { key, value } = filter;

      if (key === "name" || key === "lastname") {
        whereClause["role"] = 3;
        whereClause[key] = { [Op.iLike]: `%${value}%` };
      } else if (key === "idNumber") {
        whereClause["role"] = 3;
        whereClause[key] = { [Op.iLike]: `${value}` };
      } else if (key === "email") {
        whereClause[key] = { [Op.iLike]: `${value}` };
      } else {
        whereClause[key] = value;
      }
    });

    const filteredPatients = await models.User.findAll({
      where: whereClause,
      attributes: {
        exclude: ["password", "cellphone"],
      },
    });

    if (filteredPatients.length === 0)
      throw new Error("No patients were found in the search");

    return filteredPatients;
  } catch (error) {
    throw new Error(
      "There has been an error in the patient search: " + error.message
    );
  }
};

export default getPatientsFilterHandler;
