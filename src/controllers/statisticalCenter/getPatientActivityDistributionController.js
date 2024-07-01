import getPatientActivityDistributionHandler from "../../handlers/statisticalCenter/getPatientActivityDistributionHandler.js"

const getPatientActivityDistributionController = async (req, res)=>{
    try {
        const patientActivityDistribution = await getPatientActivityDistributionHandler()
        return res.status(200).json(patientActivityDistribution);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default getPatientActivityDistributionController;