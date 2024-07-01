import {PhysicianDetails} from "../../databaseConfig.js";
import SegimedAPIError from "../../error/SegimedAPIError.js";

const createPhysicianExpertiseLevelHandler = async (body) => {
    const {
        physicianId,
        expertiseLevelId,
    } = body;
    try {
        const newPhysicianExpertise = await PhysicianDetails.create(
            {
                physician: physicianId,
                expertiseLevel: expertiseLevelId
            }
        )
        return newPhysicianExpertise
    } catch (error) {
        throw new SegimedAPIError('Hubo un error durante el proceso de creación.', 500)
    }
};

export default createPhysicianExpertiseLevelHandler;