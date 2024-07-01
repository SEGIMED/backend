import createTherapyPrescriptionHandler from "../../handlers/therapy/createTherapyPrescriptionHandler.js";


const createTherapyPrescriptionController = async (req, res) => {
    try {
        const newTherapy = req.body;
        const therapy = await createTherapyPrescriptionHandler(newTherapy);
        return res.status(200).json(therapy);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default createTherapyPrescriptionController;