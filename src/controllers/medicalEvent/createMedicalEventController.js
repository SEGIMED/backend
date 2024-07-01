import createMedicalEventHandler from "../../handlers/medicalEvent/createMedicalEventHandler.js";


const createMedicalEventController = async (req, res) => {
    try {
        const medicalEvent = await createMedicalEventHandler(req.body);
        return res.status(200).json({
            msg: 'Se registró la consulta médica correctamente',
            medicalEvent: medicalEvent
        });

    } catch (error) {
        return res.status(error.errorCode).json({error: error.message});
    }
}

export default createMedicalEventController;