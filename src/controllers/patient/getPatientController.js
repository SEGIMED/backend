import getPatientHandler from "../../handlers/patient/getPatientHandler.js";

const getPatientController = async (req, res) => {
    try {
        const {id} = req.params;
        const patient = await getPatientHandler(id);

        return res.status(200).json(patient);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

export default getPatientController;
