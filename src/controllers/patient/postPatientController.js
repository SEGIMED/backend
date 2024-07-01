import postPatientHandler from "../../handlers/patient/postPatientHandler.js";

const postPatientController = async (req, res) => {
    try {
        const body = req.body;

        const patientCreated = await postPatientHandler(body);

        return res.status(201).json(patientCreated);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

export default postPatientController;
