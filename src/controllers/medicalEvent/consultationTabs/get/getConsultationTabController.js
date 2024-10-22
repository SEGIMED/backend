import getConsultationTabHandler from "../../../../handlers/medicalEvent/consultationTabs/get/getConsultationTabHandler.js";

const getConsultationTabController = async (req, res) => {
  try {
    const { id } = req.query;

    const response = await getConsultationTabHandler({ id });

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
export default getConsultationTabController;
