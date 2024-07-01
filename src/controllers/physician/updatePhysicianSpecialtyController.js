import SegimedAPIError from "../../error/SegimedAPIError.js";
import updatePhysicianSpecialtyHandler from "../../handlers/physicianHandlers/updatephysicianSpecialtyHandler.js";

const updatePhysicianSpecialtyController = async (req, res) => {
    try {
        const updatedPhysicianSpecialty = await updatePhysicianSpecialtyHandler(req.body)
        return res.status(200).json(updatedPhysicianSpecialty);
    } catch (error) {
        throw new SegimedAPIError('Hubo un error durante el proceso.', 500)
    }
};

export default updatePhysicianSpecialtyController;