import models from "../../databaseConfig.js";

const getPatientsHandler = async ({ limit, page, filter }) => {
  try {
    //Type of role selection
    const queryOptions = {
      where: {
        role: 3,
      },
      attributes: {
        exclude: ["password", "cellphone", "email"],
      },
    };

    if (!limit || !page) {
      // Without pagination
      const getPatients = await models.User.findAll(queryOptions);
      return getPatients;
    } else {
      // Pagination Logic
      const offset = (page - 1) * limit;
      queryOptions.limit = limit;
      queryOptions.offset = offset;

      const { count, rows: patients } = await models.User.findAndCountAll(queryOptions);
      const totalPages = Math.ceil(count / limit);

      return {
        totalItems: count,
        totalPages: totalPages,
        currentPage: page,
        patients: patients,
      };
    }
  } catch (error) {
    throw new Error("Error loading patients: " + error.message);
  }
};

export default getPatientsHandler;
