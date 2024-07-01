import createMedicalIndicationsHandler from "../../handlers/medicalIndications/createMedicalIndicationsHandler.js";


const createMedicalIndicationsController = async (req, res) => {
    try {
        const newIndication = await createMedicalIndicationsHandler(req.body);
        return res.status(200).json(newIndication);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default createMedicalIndicationsController;