import models, {
  CatMedicalSpecialty,
  CatRole,
  PhysicianDetails,
  PhysicianSpecialty,
  User,
} from "../../databaseConfig.js";
import paginationUsersHandler from "../Pagination/paginationUsersHandler.js";

const getAllPhysiciansHandler = async ({ page, limit }) => {
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
    };
    if (!limit && !page) {
      //Without pagination
      const allPhysicians = await User.findAll(queryOptions);
      return allPhysicians;
    } else {
      //Pagination Logic
      return paginationUsersHandler();
    }
  } catch (error) {
    throw new Error("Error loading physicians: " + error.message);
  }
};

export default getAllPhysiciansHandler;
