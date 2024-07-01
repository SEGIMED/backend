import getPatientDetailsHandler from "../../handlers/patient/getPatientDetailsHandler.js";

const getPatientDetailsController = async (req, res) => {
    try {
        const {id} = req.query;
        const patientDetailsForMedicalEvent = await getPatientDetailsHandler(id);
        return res.status(200).json(patientDetailsForMedicalEvent);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export default getPatientDetailsController;