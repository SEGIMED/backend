import {PhysicianMedicalRegistry} from "../../databaseConfig.js";

const updatePhysicianMedicalRegistryHandler = async (physicianMedicalRegistryToUpdate) => {
    const {id} = physicianMedicalRegistryToUpdate
    try {
        return await PhysicianMedicalRegistry.update(
            physicianMedicalRegistryToUpdate,
            {
                where: {
                    id: id
                },
                returning: true,
            }
        )
    } catch (error) {
        throw new Error("Error updating physician medial registry: " + error.message);
    }
};

export default updatePhysicianMedicalRegistryHandler;