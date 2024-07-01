import updateTherapyPrescriptionHandler from "../../handlers/therapy/updateTherapyPrescriptionHandler.js";


const createTherapyPrescriptionController = async (req, res) => {
    try {
        const updatedTherapy = req.body;
        const therapy = await updateTherapyPrescriptionHandler(updatedTherapy);
        return res.status(200).json(therapy);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default createTherapyPrescriptionController;