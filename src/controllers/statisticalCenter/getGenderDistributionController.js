import getGenderDistributionHandler from "../../handlers/statisticalCenter/getGenderDistributionHandler.js"

const getGenderDistributionController = async (req,res) => {
    try {
        const genderStatistics = await getGenderDistributionHandler()
        return res.status(200).json(genderStatistics);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export default getGenderDistributionController;