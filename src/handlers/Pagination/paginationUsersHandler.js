import models from "../../databaseConfig.js";
import { mapPatients } from "../../mapper/patient/patientMapper.js";

const paginationUsersHandler = async ({ page, limit, queryOptions } ) => {
  try {
    if ((limit && isNaN(parseInt(limit))) || (page && isNaN(parseInt(page)))) {
      throw new Error("Limit and page must be valid numbers");
    }
    if (!limit || !page) {
      throw new Error("Limit and page are needed");
    }

    limit = parseInt(limit);
    page = parseInt(page);

    const offset = (page - 1) * limit;
    queryOptions.limit = limit;
    queryOptions.offset = offset;
    queryOptions.distinct = true;

    const { count, rows: user } = await models.User.findAndCountAll(
      queryOptions
    );
    console.log(user.length)
    const totalPages = Math.ceil(count / limit);

    return {
      totalUsers: count,
      totalPages: totalPages,
      currentPage: page,
      user: mapPatients(user),
    };
  } catch (error) {
    throw new Error("Error loading pagination: " + error.message);
  }
};

export default paginationUsersHandler;
