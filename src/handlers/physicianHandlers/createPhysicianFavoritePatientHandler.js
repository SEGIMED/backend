import {PhysicianFavoritePatient} from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";
// import PhysicianFavoritePatient from '../../models/PhysicianFavoritePatient.js';

const createPhysicianFavoritePatientHandler = async (body) => {
    const {
        physicianId,
        patientId,
    } = body;
    try {
        const newFav = await PhysicianFavoritePatient.create(
            {
                physicianId: physicianId,
                favoritePatient: patientId
            }
        )
        return newFav
    } catch (error) {
        throw new SegimedAPIError('Hubo un error durante el proceso agregar favorito.', 500)
    }
};

export default createPhysicianFavoritePatientHandler;
