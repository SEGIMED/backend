import createDrugPrescriptionHandler from "../../handlers/drugPrescription/createDrugPrescriptionHandler.js";


const createDrugPrescriptionController = async (req, res) => {
    try {
        const newPrescription = req.body;
        const drug = await createDrugPrescriptionHandler(newPrescription);
        return res.status(200).json(drug);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default createDrugPrescriptionController;