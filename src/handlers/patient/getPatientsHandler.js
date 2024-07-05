import models from "../../databaseConfig.js";

const getPatientsHandler = async ({ limit, page, filter }) => {
  try {
    if (!limit || !page) {
      const getPatients = await models.User.findAll({
        where: {
          role: 3,
        },
        attributes: {
          exclude: ["password", "cellphone", "email"],
        },
      });
      return getPatients;
    } else {
      const offset = (page - 1) * limit;
      const { count, rows: patients } = await models.User.findAndCountAll({
        limit,
        offset,
      });
      const totalPages = Math.ceil(count / limit);

      return {
        totalItems: count,
        totalPages,
        currentPage: page,
        patients,
      };
    }
  } catch (error) {
    throw new Error("Error loading patients: " + error.message);
  }
};

export default getPatientsHandler;
