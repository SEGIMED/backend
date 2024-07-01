import getPhysiciansBySpecialtyIdHandler from "../../handlers/physicianHandlers/getPhysiciansBySpecialtyIdHandler.js";


const getPhysiciansBySpecialtyIdController = async (req, res) => {
    try {
        const specialty = req.query.specialtyId;
        const physiciansBySpecialty = await getPhysiciansBySpecialtyIdHandler(specialty);
        return res.status(200).json(physiciansBySpecialty);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default getPhysiciansBySpecialtyIdController;