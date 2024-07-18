import models, {
  CatMedicalSpecialty,
  CatRole,
  PhysicianAttendancePlace,
  PhysicianDetails,
  PhysicianSpecialty,
  User,
} from "../../databaseConfig.js";
import {
  transformPhysicianData,
  transformPhysicianDataPagination,
} from "../Pagination/helperFunctions.js";
import paginationUsersHandler from "../Pagination/paginationUsersHandler.js";
import { Op } from "sequelize";

const getAllPhysiciansHandler = async ({ page, limit, name }) => {
  try {
    // Especificaciones para el rol seleccionado
    const queryOptions = {
      attributes: ["id", "name", "lastname", "email", "cellphone", "avatar"],
      include: [
        {
          model: PhysicianSpecialty,
          as: "physicianSpecialties",
          attributes: ["id"],
          include: {
            model: CatMedicalSpecialty,
            as: "specialty",
            attributes: ["name"],
          },
        },
        {
          model: PhysicianDetails,
          as: "physicianDetails",
        },
        {
          model: CatRole,
          as: "userRole",
          where: {
            roleName: "Médico",
          },
        },
        {
          model: PhysicianAttendancePlace,
          as: "physicianAttendancePlaces",
        },
      ],
      where: {},
    };

    if (name) {
      const searchTerms = name.split(" ").filter((term) => term.trim() !== "");
      queryOptions.where[Op.or] = searchTerms.map((term) => ({
        [Op.or]: [
          { name: { [Op.iLike]: `%${term}%` } },
          { lastname: { [Op.iLike]: `%${term}%` } },
        ],
      }));
    }

    if (!limit && !page) {
      // Sin paginación
      const allPhysicians = await User.findAll(queryOptions);
      return allPhysicians.map(transformPhysicianData);
    } else {
      // Con paginación
      const paginatedResult = await paginationUsersHandler({
        page,
        limit,
        queryOptions,
      });
      paginatedResult.user = paginatedResult.user.map(
        transformPhysicianDataPagination
      );

      return paginatedResult;
    }
  } catch (error) {
    throw new Error("Error loading physicians: " + error.message);
  }
};

export default getAllPhysiciansHandler;
