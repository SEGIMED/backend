import getStudiesConsultationTabHandler from "../../../../handlers/medicalEvent/consultationTabs/get/getStudiesConsultationTabHandler.js";


const getStudiesConsultationTabController = async (req, res) => {
  try {
    const { id } = req.query;
    const response = await getStudiesConsultationTabHandler({ id });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
export default getStudiesConsultationTabController;
