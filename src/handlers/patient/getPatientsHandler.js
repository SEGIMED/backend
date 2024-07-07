import models from "../../databaseConfig.js";
import paginationUsersHandler from "../Pagination/paginationUsersHandler.js";

const getPatientsHandler = async ({ limit, page }) => {
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

    if (!limit && !page) {
      // Without pagination
      const getPatients = await models.User.findAll(queryOptions);
      return getPatients;
    } else {
      // Pagination Logic
      return paginationUsersHandler({ page, limit, queryOptions });
    }
  } catch (error) {
    throw new Error("Error loading patients: " + error.message);
  }
};

export default getPatientsHandler;
