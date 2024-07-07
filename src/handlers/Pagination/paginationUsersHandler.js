import models from "../../databaseConfig";

const paginationUsersHandler = async ({ page, limit, queryOptions }) => {
  
    limit = parseInt(limit);
    page = parseInt(page);

    try {
    const offset = (page - 1) * limit;
    queryOptions.limit = limit;
    queryOptions.offset = offset;

    const { count, row: user } = await models.User.findAndCountAll(
      queryOptions
    );
    const totalPages = Math.ceil(count / limit);

    return {
      totalItems: count,
      totalPages: totalPages,
      currentPage: page,
      user: user,
    };
  } catch (error) {
    throw new Error("Error loading pagination: " + error.message);
  }
};

export default paginationUsersHandler;
