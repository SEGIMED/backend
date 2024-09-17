import getGeneralConsultationHandler from "../../../../handlers/medicalEvent/consultationTabs/get/getGeneralConsultationHandler.js";

const getGeneralConsultationController = async (req, res) => {
  try {
    const { id } = req.query;
    const response = await getGeneralConsultationHandler({id})
    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
export default getGeneralConsultationController;
