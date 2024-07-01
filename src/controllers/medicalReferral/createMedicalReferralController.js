import createMedicalReferralHandler from "../../handlers/medicalReferral/createMedicalReferralHandler.js";


const createMedicalReferralController = async (req, res) => {
    try {
        const newReferral = req.body;
        const referral = await createMedicalReferralHandler(newReferral);
        return res.status(200).json(referral);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default createMedicalReferralController;