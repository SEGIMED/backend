import models, {
  CatMedicalSpecialty,
  CatRole,
  PhysicianDetails,
  PhysicianSpecialty,
  User,
} from "../../databaseConfig.js";

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
      //Pagination logic
      const offset = (page - 1) * limit;
      queryOptions.limit = limit;
      queryOptions.offset = offset;

      const { count, rows: physicians } = await models.User.findAndCountAll(
        queryOptions
      );
      const totalPages = Math.ceil(count / limit);

      return {
        totalItems: count,
        totalPages: totalPages,
        currentPage: page,
        physicians: physicians,
      };
    }
  } catch (error) {
    throw new Error("Error loading physicians: " + error.message);
  }
};

export default getAllPhysiciansHandler;
