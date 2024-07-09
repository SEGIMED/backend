import { PhysicianFavoritePatient } from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";

const getPhysicianFavoritePatientHandler = async (physicianId) => {
    try {
        const favoritePatients = await PhysicianFavoritePatient.findAll({
            where: {
                physicianId: physicianId,
            },
        });
        return favoritePatients;
    } catch (error) {
        console.error(error);
        throw new SegimedAPIError('Hubo un error al obtener los favoritos.', 500);
    }
};

export default getPhysicianFavoritePatientHandler;