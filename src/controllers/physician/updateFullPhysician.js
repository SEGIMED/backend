import SegimedAPIError from "../../error/SegimedAPIError.js";
import updateFullPhysicianHandler from "../../handlers/physicianHandlers/updateFullPhysicianHandler.js";

const updatePhysicianController = async (req, res) => {
    try {
        const updatedFullPhysician = await updateFullPhysicianHandler(req.body)
        return res.status(200).json(updatedFullPhysician);
    } catch (error) {
        throw new SegimedAPIError(error.message, 500)
    }
};

export default updatePhysicianController;