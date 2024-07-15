import models, {
  CatMedicalSpecialty,
  CatRole,
  PhysicianDetails,
  PhysicianSpecialty,
  User,
} from "../../databaseConfig.js";
import paginationUsersHandler from "../Pagination/paginationUsersHandler.js";
import { Op } from "sequelize";

const getAllPhysiciansHandler = async ({ page, limit, name, lastname }) => {
  try {
    //Specifications for the role selected
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
      ],
      where: {},
    };

    if (name) {
      queryOptions.where.name = {
        [Op.iLike]: `%${name}%`, 
      };
    }
    if (lastname) {
      queryOptions.where.lastname = {
        [Op.iLike]: `%${lastname}%`, 
      };
    }

    if (!limit && !page) {
      //Without pagination
      const allPhysicians = await User.findAll(queryOptions);
      return allPhysicians;
    } else {
      //Pagination Logic
      return paginationUsersHandler({ page, limit, queryOptions });
    }
  } catch (error) {
    throw new Error("Error loading physicians: " + error.message);
  }
};

export default getAllPhysiciansHandler;
