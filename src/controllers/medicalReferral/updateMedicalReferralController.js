import updateMedicalReferralHandler from "../../handlers/medicalReferral/updateMedicalReferralHandler.js";


const updateMedicalReferralController = async (req, res) => {
    try {
        const updatedReferral = req.body;
        const referral = await updateMedicalReferralHandler(updatedReferral);
        return res.status(200).json(referral);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default updateMedicalReferralController;