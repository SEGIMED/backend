import getPreConsultationTabHandler from "../../../handlers/medicalEvent/consultationTabs/getPreConsultationTabHandler.js"

const getPreConsultationTabController = async (req,res) => {
    try {
        const {id} = req.query
        const preconsultation = await getPreConsultationTabHandler({id})
        return res.status(200).json(preconsultation)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}
export default getPreConsultationTabController