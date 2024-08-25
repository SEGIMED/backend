import { SociodemographicDetails, User } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";

const getGenderDistributionHandler = async (physicianId) => {
  try {
    const womenWhere = { genre: 1 };
    const menWhere = { genre: 2 };

    if (physicianId) {
      womenWhere["$patient_user.treating_physician$"] = physicianId;
      menWhere["$patient_user.treating_physician$"] = physicianId;
    }

    const women = await SociodemographicDetails.count({
      where: womenWhere,
      include: [
        {
          model: User,
          as: "patient_user",
          attributes: [],
        },
      ],
    });

    const men = await SociodemographicDetails.count({
      where: menWhere,
      include: [
        {
          model: User,
          as: "patient_user",
          attributes: [],
        },
      ],
    });

    const totalWomenAndMen = women + men;

    return { women, men, totalWomenAndMen };
  } catch (error) {
    throw new SegimedAPIError(
      "Error al cargar las estadísticas de género: " + error.message,
      500
    );
  }
};

export default getGenderDistributionHandler;
