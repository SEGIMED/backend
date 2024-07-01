import deletePatientHandler from "../../handlers/patient/deletePatientHandler.js";

const deletePatientController = async (req, res) => {
    const {id} = req.params;
    try {
        const response = await deletePatientHandler(id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

export default deletePatientController;
