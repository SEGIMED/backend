import updatePhysicianMedicalRegistryHandler from "../../handlers/physicianHandlers/updatePhysicianMedicalRegistryHandler.js";


const updatePhysicianMedicalRegistryController = async (req, res) => {
    try {
        const physicianMedicalRegistryToUpdate = req.body;
        const updatedPhysician = await updatePhysicianMedicalRegistryHandler(physicianMedicalRegistryToUpdate);
        return res.status(200).json(updatedPhysician);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default updatePhysicianMedicalRegistryController;