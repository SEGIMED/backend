import { PhysicianFavoritePatient, User } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";

const getPhysicianFavoritePatientHandler = async (physicianId, page, limit) => {
  try {
    limit = parseInt(limit);
    page = parseInt(page);
    const offset = (page - 1) * limit;
    const { count, rows: favoritePatients } =
      await PhysicianFavoritePatient.findAndCountAll({
        where: {
          physicianId: physicianId,
        },
        include: [
          {
            model: User,
            as: "patient",
            attributes: ["id", "name", "lastname"],
          },
        ],
        limit,
        offset,
      });
    const totalPages = Math.ceil(count / limit);
    return {
      totalUsers: count,
      totalPages: totalPages,
      currentPage: page,
      user: favoritePatients,
    };
  } catch (error) {
    throw new SegimedAPIError("Hubo un error al obtener los favoritos.", 500);
  }
};

export default getPhysicianFavoritePatientHandler;
